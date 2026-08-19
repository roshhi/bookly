import { type Request, type Response } from 'express';
import { getAllBooks } from '../service/bookService.ts';

export const booksController = async (req: Request, res: Response) => {
    try {
        const searchQuery = req.query.q as string;
        if (!searchQuery || typeof searchQuery !== 'string') {
            return res.status(400).json({ message: 'Query is required' });
        }
        else {
            const books = await getAllBooks(searchQuery);
            return res.status(200).json(books);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching books' });
    }
}
