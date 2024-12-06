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
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        const userLink = `CREATE TABLE IF NOT EXISTS socialtable (
            userid INT NOT NULL,
            name VARCHAR(50) NOT NULL,
            username VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
        )`
        
        await pgClient.query(createUser);
        await pgClient.query(userLink);
        console.log("Users table initialized successfully.");
    } catch(error) {
        console.error("Error initializing database schema:", error);
        process.exit(1);
    }
}

export default pgClient;