import express, { Request, Response } from 'express';
import pgClient from "../db/db";
const router = express.Router();
import jwt from "jsonwebtoken";
import { isValidMiddleware } from "../middleware/authMiddleware";
import uuid4 from "uuid4";
import { z } from "zod" ;
import bcrypt from "bcrypt";

const User = z.object({
    username: z.string().min(3).max(100),
    email: z.string().email().min(5).max(100),
    password: z.string()
      .min(5)
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z]).*$/, "Password must contain at least one uppercase letter, one lowercase letter"),
});

// @ts-ignore
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = User.parse(req.body);

        if (username.length > 100 || email.length > 100 || password.length > 100) {
            return res.status(400).json({
                message: "One or more fields exceed the maximum allowed length of 50 characters."
            });
        }
        
        if (!username || !password || !email) {
            res.status(400).json({
                message: "Please provide all fields!"
            });
            return;
        }

        const checkUserQuery = `SELECT * FROM users WHERE email = $1`;
        const checkUser = await pgClient.query(checkUserQuery, [email]);

        if (checkUser?.rowCount && checkUser.rowCount > 0 ) {
            res.status(409).json({
                message: "User already exists!"
            });
            return;
        }

        const SALT_ROUND = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
        const hasedPassword = await bcrypt.hash(password, SALT_ROUND);

        const createUserQuery = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3)`;
        await pgClient.query(createUserQuery, [username, hasedPassword, email]);

        res.status(201).json({
            message: "User registered successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while registering, please try again."
        });
    }
});

// @ts-ignore
router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all fields!"
            });
        }

        const finderUserQuery = `SELECT * FROM users WHERE email = $1`;
        const findUser = await pgClient.query(finderUserQuery, [email]);

        if (findUser.rowCount === 0) {
            return res.status(404).json({
                message: "User does not exist. Please sign up!"
            });
        }

        const storedHashedPassword = findUser.rows[0].password;

        const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password!"
            });
        }

        const id = findUser.rows[0].id;
        const token = jwt.sign({ id }, process.env.JWT_TOKEN as string, { expiresIn: '24h' });

        res.status(200).json({
            message: "Successful signin!",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while signing in, please try again."
        });
    }
});

// @ts-ignore
router.post('/add-card', isValidMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, username, share } = req.body;

        if (!name || !username) {
            res.status(400).json({
                message: "Please provide all fields!"
            });
            return;
        }

        // @ts-ignore
        const userid = req.userid.id;

        if (share === true) {
            const uniqueid = uuid4();
            const createShareCardQuery = `INSERT INTO socialtable (name, username, share, userid, uniqueid) VALUES ($1, $2, $3, $4, $5)`;
            await pgClient.query(createShareCardQuery, [name, username, share, userid, uniqueid]);
            res.status(201).json({
                message: "Card added successfully!",
                message1: "Share link created successfully!",
                uniqueid: uniqueid
            });
        } else {
            const createShareCardQuery = `INSERT INTO socialtable (name, username, share, userid) VALUES ($1, $2, $3, $4)`;
            await pgClient.query(createShareCardQuery, [name, username, share, userid]);
            res.status(201).json({
                message: "Card added successfully!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error while adding, please try again."
        });
    }
});

// @ts-ignore
router.get('/cards', isValidMiddleware, async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userid = req.userid.id;

        if(!userid) {
            res.status(400).json({
                message: "Please log in!"
            });
            return;
        }

        const getUserInfo = `SELECT * FROM socialtable WHERE userid = $1`
        const usersCard = await pgClient.query(getUserInfo, [userid]);

        // do api call here https://api.github.com/users/Tejas-pr
        res.status(201).json({
            message: "successfully get the data",
            usersCard: usersCard.rows
        });
    }catch(error) {
        res.status(500).json({
            message: "Error while fetching the cards, please try again."
        });
    }
});

// @ts-ignore
router.delete('/cards', isValidMiddleware, async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if(!name) {
            res.status(400).json({
                message: "Please provide all fields!"
            });
            return;
        }
        // @ts-ignore
        const userid = req.userid.id;

        const deleteUserCardQuery = `DELETE FROM socialtable WHERE name = $1 AND userid = $2`;
        await pgClient.query(deleteUserCardQuery, [name, userid]);

        res.status(200).json({
            message: "Successfully deleted the card!"
        });
    } catch(error) {
        res.status(500).json({
            message: "Error while deleting the card, please try again."
        });
    }
});

router.get('/socialcard/share/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const responseQuery = `SELECT * FROM socialtable WHERE uniqueid = $1`;
        const response = await pgClient.query(responseQuery, [id]);

        if (response.rows.length > 0) {
            const row = response.rows[0];
            if (row.share === true) {
                res.status(200).json({
                    response: {
                        name: row.name,
                        username: row.username,
                    },
                });
                return;
            }
        }

        res.status(404).json({ message: "No shared card found or sharing is disabled." });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching data." });
    }
});

router.get('/no-users', async (req: Request, res: Response) => {
    try {
        const noUserQuery = `SELECT COUNT(*) FROM users`;
        const result = await pgClient.query(noUserQuery);

        const userCount = result.rows[0].count;

        res.status(200).json({
            totalUsers: userCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error while fetching the user count."
        });
    }
});


export default router;
