import express from "express";
import pgClient from "../db/db";
const router = express.Router();
import jwt from "jsonwebtoken";
import { isValidMiddleware } from "../middleware/authMiddleware";
// zod validation
// bcrypt password hashing
// no of users
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

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

        const createUserQuery = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3)`;
        await pgClient.query(createUserQuery, [username, password, email]);

        res.status(201).json({
            message: "User registered successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while registering, please try again."
        });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400).json({
                message: "Please provide all fields!"
            });
            return;
        }

        const finderUserQuery = `SELECT * FROM users WHERE email = $1 AND password = $2`;
        const findUser = await pgClient.query(finderUserQuery, [email, password]);

        if (findUser.rowCount === 0) {
            res.status(404).json({
                message: "user does not exist please sign up!"
            });
            return;
        }

        if(findUser) {
            const id = findUser.rows[0].id;
            const token = jwt.sign(id, process.env.JWT_TOKEN as string);

            res.status(200).json({
                message: "Successfull signin!",
                token: token
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error while signin, please try again."
        });
    }
});

// @ts-ignore
router.post('/add-card', isValidMiddleware, async (req, res) => {
    try{
        const { name, username } = req.body;

        if(!name || !username) {
            res.status(400).json({
                message: "Please provide all fields!"
            });
            return;
        }

        const userid = req.userid;
        const createCardquery = `INSERT INTO socialtable (name, username, userid) VALUES ($1, $2, $3)`

        await pgClient.query(createCardquery, [name, username, userid]);

        res.status(201).json({
            message: "Card added successfully!"
        })
    }catch(error) {
        res.status(500).json({
            message: "Error while adding, please try again."
        });
    }
});

// @ts-ignore
router.get('/cards', isValidMiddleware, async (req, res) => {
    try {
        const userid = req.userid;

        if(!userid) {
            res.status(400).json({
                message: "Please log in!"
            });
            return;
        }

        const getUserInfo = `SELECT * FROM socialtable WHERE userid = $1`
        const usersCard = await pgClient.query(getUserInfo, [userid]);

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
router.delete('/cards',isValidMiddleware, async (req, res) => {});

// @ts-ignore
router.post('/socialcard/share',isValidMiddleware, async (req, res) => {});

router.get('/socialcard/share:id', async (req, res) => {});

export default router;
