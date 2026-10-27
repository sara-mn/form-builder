import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jsonServer from 'json-server';
import createAuthRouter from './routes/auth.js';
import createFormsRouter from './routes/forms.js';

export default function createApp({ dbPath, isProduction }) {
    const app = express();

    const allowedOrigins = ['http://localhost:4200', 'https://sara-mn.github.io'];

    app.use(
        cors({
            origin: allowedOrigins,
            credentials: true,
            methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
        })
    );

    app.use(cookieParser());

    const jsonServerRouter = jsonServer.router(dbPath);

    const db = jsonServerRouter.db;
    app.use('/api/auth', express.json(), createAuthRouter(db, isProduction));
    app.use('/forms', createFormsRouter(db));

    const blockedJsonServerPaths = ['/users', '/db'];
    app.use(blockedJsonServerPaths, (_req, res) => {
        res.status(404).json({ message: 'Not found' });
    });

    app.use(jsonServerRouter);

    return app;
}
