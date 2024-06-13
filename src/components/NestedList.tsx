import { useState, useEffect } from 'react';
import List from '@mui/material/List';





// components
import SearchListItem from './SearchListItem';

// colors
import { elloColors } from '../data/colors';
import { Book } from '../custom-types/book';

export default function NestedList({ bookState, setOpenSuggestionList }: { bookState: Book[], setOpenSuggestionList: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <List
            sx={{ width: '100%', maxWidth: 460, maxHeight: 350, overflow: 'auto', bgcolor: elloColors.secondary.turquoiseDark2, position: 'absolute', right: '0px', marginTop: '1.5vh', marginRight: '1.5vw', borderRadius: "5px" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            onMouseEnter={() => setOpenSuggestionList(true)}
            onMouseLeave={() => setOpenSuggestionList(false)}
        >
            {

                bookState?.length > 1 ?
                    bookState?.map((book: Book) => <SearchListItem book={book} />) : <h1 style={{ color: 'white', textAlign: 'center' }}>Could not find book</h1>
            }

        </List>
    );
}


