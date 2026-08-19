import { Router } from 'express';
import { booksController } from '../controller/booksController.ts';

const booksRouter = Router();

booksRouter.get('/books', booksController);

export default booksRouter;
