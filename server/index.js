import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Module } from 'node:module';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jsonServer from 'json-server';
import createAuthRouter from './routes/auth.js';

export const require = Module.createRequire(import.meta.url);
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();

app.use(
    cors({
        origin: ['http://localhost:4200'],
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
    })
);

// app.use(express.json());
app.use(cookieParser());

const jsonServerRouter = jsonServer.router('db.json');
const db = jsonServerRouter.db; // lowdb instance — shared with auth routes

app.use('/api/auth', express.json(), createAuthRouter(db));
app.use(jsonServerRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
