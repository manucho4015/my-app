import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DeleteIcon from '@mui/icons-material/Delete';

// colors
import { elloColors } from "../data/colors";
// custom types
import type { Book } from "../custom-types/book";

const BookCard = ({ book, deleteCount, setDeleteCount }: { book: Book, deleteCount: number, setDeleteCount: React.Dispatch<React.SetStateAction<number>> }) => {
    const [isHover, setIsHover] = useState(false);

    let curBookList: Book[] = []
    let bookStorage = localStorage.getItem('bookList')
    if (bookStorage != null) {
        curBookList = JSON.parse(bookStorage) as unknown as Book[]
    }

    const handleDelete = () => {

        const newBookList = curBookList.filter((filterBook) => filterBook.title !== book.title)

        localStorage.setItem('bookList', JSON.stringify([...newBookList]))
        console.log('Delete!')
        setDeleteCount(deleteCount + 1)
    }

    return (
        <motion.div
            animate={{ backgroundColor: isHover ? elloColors.primary.turquoise : elloColors.primary.white }}
            onMouseEnter={() => setIsHover(!isHover)}
            onMouseLeave={() => setIsHover(!isHover)}
            className="book"
            style={{ display: 'flex' }}
        >

            <div className="info" style={{ width: '70%' }}>

                <motion.h4 animate={{ color: isHover ? elloColors.primary.white : elloColors.secondary.teal }}>
                    {book.title}
                </motion.h4>
                <motion.p
                    animate={{
                        color: isHover ? elloColors.primary.white : elloColors.secondary.teal,
                        display: isHover ? "none" : "block",
                        y: isHover ? 40 : 0,
                    }}
                    transition={{ delay: 0.1, stiffness: 1000, velocity: -100 }}
                >
                    Author: <span style={{ fontWeight: 'bold' }}>{book.author}</span>

                </motion.p>
                <motion.p
                    animate={{
                        color: isHover ? elloColors.primary.white : elloColors.secondary.teal,
                        display: isHover ? "none" : "block",
                        y: isHover ? 40 : 0,
                    }}
                    transition={{ stiffness: 1000, velocity: -100 }}
                >
                    Reading level: <span style={{ fontWeight: 'bold' }}>{book.readingLevel}</span>
                </motion.p>
                <motion.p
                    animate={{
                        color: elloColors.primary.white,
                        display: isHover ? "block" : "none",
                        y: isHover ? 0 : 40,
                    }}
                    transition={{ stiffness: 1000, velocity: -100 }}
                >
                    Date Added: <span style={{ fontWeight: 'bold' }}>{book.readingLevel}</span>
                </motion.p>
                <motion.button
                    animate={{
                        color: elloColors.primary.white,
                        display: isHover ? "block" : "none",
                        y: isHover ? 0 : 40,
                    }}
                    transition={{ delay: 0.1, stiffness: 1000, velocity: -100 }}
                    onClick={() => handleDelete()}
                >
                    <DeleteIcon sx={{ color: elloColors.secondary.orangeRed }} />
                </motion.button>
            </div>
            <img src={`/${book.coverPhotoURL}`} alt="" style={{ width: '30%' }} />
        </motion.div>
    );
};

export default BookCard;
