import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import http from 'http';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: process.env.FRONT_SERVER_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

import usersRouter from "./router/users";
import postsRouter from "./router/posts";
import apiplantsRouter from "./router/apiplant";
import plantsRouter from "./router/plants";
import commentsRouter from "./router/comments";

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/plantidapi", apiplantsRouter);
app.use("/plants", plantsRouter);
app.use("/comments", commentsRouter);

// catch 404 and forward to error handler
app.use(function(req : Request, res : Response) {
    res.status(StatusCodes.NOT_FOUND).end();
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`💡 서버 포트: ${PORT}`);
});
