import express from "express";
import pgClient from "../db/db";
const router = express.Router();
import jwt from "jsonwebtoken";
// zod validation
// bcrypt password hashing
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
        console.error("Error during signup:", error);
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
            const token = jwt.sign(id, process.env.JWT_TOKEN as string, {
                expiresIn: '24h'
            });

            res.status(200).json({
                message: "Successfull signin!",
                token: token
            });
        }
    } catch(error) {
        console.error("Error during signin:", error);
        res.status(500).json({
            message: "Error while signin, please try again."
        });
    }

});

export default router;
