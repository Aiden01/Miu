import axios from 'axios';
import IBook from '../interfaces/IBook';

export async function search(query: string): Promise<IBook[]> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
        query
    )}&key=${process.env.GOOGLE_BOOKS_KEY}`;
    const {
        data: { totalItems, items },
    } = await axios.get(url);
    if (totalItems >= 1) {
        return (items as any[]).map(
            (
                {
                    volumeInfo: {
                        infoLink,
                        title,
                        authors,
                        imageLinks: { smallThumbnail },
                        publishedDate,
                        pageCount,
                        description,
                    },
                },
                index
            ) => ({
                authors,
                id: index + 1,
                moreInfoLink: infoLink,
                pageCount,
                publishedDate,
                summary: `${description.slice(0, 150)}...`,
                thumbnail: smallThumbnail,
                title,
            })
        );
    } else {
        return Promise.resolve([]);
    }
}
