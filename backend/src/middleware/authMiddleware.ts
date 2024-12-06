import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        export interface Request {
            userId?: string;
        }
    }
}

export const isValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Error in isValidMiddleware:", error);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
