import express, { Request, Response } from 'express';
const router = express.Router();
import jwt from "jsonwebtoken";
import { isValidMiddleware } from "../middleware/authMiddleware";
import uuid4 from "uuid4";
import { z } from "zod" ;
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

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
        
        const checkUser = await prisma.createUser.findUnique({
            where: {
                email: email
            }
        })

        if (checkUser) {
            res.status(409).json({
                message: "User already exists!"
            });
            return;
        }

        const SALT_ROUND = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
        const hasedPassword = await bcrypt.hash(password, SALT_ROUND);

        await prisma.createUser.create({
            data: {
                username: username,
                email: email,
                password: hasedPassword
            }
        })

        res.status(200).json({
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

        const findUser = await prisma.createUser.findUnique({
            where: {
                email: email
            }
        })

        if (!findUser) {
            return res.status(404).json({
                message: "User does not exist. Please sign up!"
            });
        }

        const storedHashedPassword = findUser.password;

        const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password!"
            });
        }

        const id = findUser.id;
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
        const { cardName, github, linkedin, leetcode, twitter, email, phone } = req.body;

        if (!cardName) {
            res.status(400).json({
                message: "Please provide card name"
            });
            return;
        }

        // @ts-ignore
        const userid = req.userid.id;
        const countTotalCards = await prisma.userLink.count({
            where: {
                userid
            }
        })

        if(countTotalCards >= 5) {
            res.status(400).json({
                message: "You have reached the maximum number of cards!"
            });
            return;
        };
        
        const uniqueid = uuid4();

        const createUser: any = {
            github: github || null,
            linkedin: linkedin || null,
            leetcode: leetcode || null,
            twitter: twitter || null,
            email: email || null,
            phone: phone || null,
        };

        const createShareCard = await prisma.userLink.create({
            data: {
                ...createUser,
                userid,
                cardName,
                UUID: uniqueid
            }
        });

        if (createShareCard) {
            res.status(201).json({
                message: "Card added successfully!",
                uniqueid: uniqueid
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error while adding, please try again."
        });
    }
});

// @ts-ignore
router.post('/update-card', isValidMiddleware, async (req: Request, res: Response) => {
    try {
        const { id, cardName, github, linkedin, leetcode, twitter, email, phone } = req.body;

        if (!id) {
            res.status(400).json({
                message: "Please provide card ID"
            });
            return;
        }

        // @ts-ignore
        const userid = req.userid.id;

        const updateData: any = {};

        if (cardName) updateData.cardName = cardName;
        if (github) updateData.github = github;
        if (linkedin) updateData.linkedin = linkedin;
        if (leetcode) updateData.leetcode = leetcode;
        if (twitter) updateData.twitter = twitter;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone ? phone.toString() : null;

        const updatedCard = await prisma.userLink.update({
            data: updateData,
            where: {
                id,
                userid
            }
        });

        if (updatedCard) {
            res.status(200).json({
                message: "Card updated successfully!",
            });
        } else {
            res.status(400).json({
                message: "Card not found or could not be updated.",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error while updating, please try again.",
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

        const usersCard = await prisma.userLink.findMany({
            where: {
                userid
            }
        });

        // Serialize BigInt fields to strings
        const serializedUsersCard = usersCard.map(card => ({
            ...card,
            phone: card.phone ? card.phone.toString() : null,
        }))

        res.status(200).json({
            message: "successfully get the data",
            usersCard: serializedUsersCard
        });
    }catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Error while fetching the cards, please try again."
        });
    }
});

// @ts-ignore
router.delete('/cards', isValidMiddleware, async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if(!id) {
            res.status(400).json({
                message: "Please provide all fields!"
            });
            return;
        }
        // @ts-ignore
        const userid = req.userid.id;

        const deleteCard = await prisma.userLink.delete({
            where: {
                id,
                userid
            }
        })

        if(deleteCard){
            res.status(200).json({
                message: "Successfully deleted the card!"
            });
        }

    } catch(error) {
        res.status(500).json({
            message: "Error while deleting the card, please try again."
        });
    }
});

router.get('/share/showcard/:uuid', async (req: Request, res: Response) => {
    try {
        const { uuid } = req.params;

        const share = await prisma.userLink.findFirst({
            where: {
                UUID: uuid
            }
        });

        if (share) {
            const formattedShare = {
                ...share,
                phone: share.phone ? share.phone.toString() : null,
            };

            res.status(200).json({
                share: formattedShare
            });
        } else {
            res.status(200).json({
                message: "Invalid URL!"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error while fetching the data"
        });
    }
});

router.get('/total-users', async (req: Request, res: Response) => {
    try{
        const userCount = await prisma.createUser.count();

        if(userCount) {
            res.status(200).json({
                userCount
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error while fetching the user count."
        });
    }
});

export default router;