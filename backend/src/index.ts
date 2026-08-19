import express, { type Express, type Request, type Response } from 'express';
import booksRouter from './route/route.ts';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use('/api', booksRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
