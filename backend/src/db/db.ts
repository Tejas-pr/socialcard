import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pgClient = new Client({
    connectionString: process.env.POSTGRES_URL
});

export const initializeDatabase = async () => {
    try {
        await pgClient.connect();
        console.log("Connected to PostgreSQL");

        // schema
        const createUser = `CREATE TABLE IF NOT EXISTS users (
            id SERIAL primary key,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        await pgClient.query(createUser);
        console.log("Users table initialized successfully.");
    } catch(error) {
        console.error("Error initializing database schema:", error);
        process.exit(1);
    }
}

export default pgClient;