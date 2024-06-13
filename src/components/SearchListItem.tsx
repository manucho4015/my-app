import React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// icons
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { elloColors } from '../data/colors';

// custom type
import type { Book } from '../custom-types/book';

const SearchListItem = ({ book }: { book: Book, }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    let curBookList: Book[] = []
    let bookStorage = localStorage.getItem('bookList')
    if (bookStorage != null) {
        curBookList = JSON.parse(bookStorage) as unknown as Book[]
    }



    const handleAdd = () => {
        let isSaved = false
        curBookList.map((savedBook) => {
            if (savedBook?.title == book?.title) {
                isSaved = true
            }
        })
        if (!isSaved) {
            curBookList.unshift(book)
            localStorage.setItem('bookList', JSON.stringify(curBookList))
        }
    }
    return (
        <div>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon sx={{ color: elloColors.primary.white }}>
                    <MenuBookIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: elloColors.primary.white }} primary={book.title} />
                {open ? <ExpandLess sx={{ color: elloColors.primary.white }} /> : <ExpandMore sx={{ color: elloColors.primary.white }} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PersonIcon sx={{ color: elloColors.primary.white }} />
                        </ListItemIcon>
                        <ListItemText sx={{ color: elloColors.primary.white }} primary={book.author} />
                        <ListItemIcon>
                            <AddBoxIcon sx={{ color: elloColors.secondary.orangePastel }} onClick={handleAdd} />
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Collapse>
        </div>
    )
}

export default SearchListItem
