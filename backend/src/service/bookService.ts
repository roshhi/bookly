export const getAllBooks = async (query: string) => {
    try {
        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=title,author_name&limit=10`
        );
        if (!response.ok) {
            throw new Error(`Open Library returned ${response.status}`);
        }
        const data = await response.json();
        const myBooks = data.docs;
        if (!Array.isArray(myBooks)) {
            return [];
        }
        const booksWithRating = await Promise.all(
            myBooks.map( async (book: any) => {

                let bookRating = null;
                    if (book.title) {
                        const titleQuery = encodeURIComponent(book.title);
                        const authorQuery = book.author_name ? encodeURIComponent(book.author_name[0]) : '';
                        const bookRatingUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleQuery}${authorQuery ? `+inauthor:${authorQuery}` : ''}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
                        
                        const bookRatingResponse = await fetch(bookRatingUrl);
                        const bookRatingData = await bookRatingResponse.json();
                        
                        bookRating = bookRatingData.items?.[0]?.volumeInfo?.averageRating 
                            ? bookRatingData.items[0].volumeInfo.averageRating.toFixed(1) 
                            : null;
                    }
                return {
                    ...book,
                    rating: bookRating
                }
            })
        );
        return booksWithRating;
    } catch (error) {
        throw new Error('Failed to fetch from Open Library');
    }
}