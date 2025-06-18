import { Request, Response } from 'express';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import http from 'http';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: process.env.FRONT_SERVER_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

// catch 404 and forward to error handler
app.use(function(req : Request, res : Response) {
    res.status(StatusCodes.NOT_FOUND).end();
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`💡 서버 포트: ${PORT}`);
});