import express, { type Express } from 'express';
import cors from 'cors';
import booksRouter from './route/route.ts';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api', booksRouter);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
