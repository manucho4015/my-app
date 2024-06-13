import { useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useCycle, motion } from 'framer-motion';
import Manucho from './Manucho';
import { useDimensions } from '../framer-motion/dimensions';

const overlay = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(0px at 40px 40px)",
        transition: {
            delay: 0.1,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar({ setOpenSuggestionList, setSearchTerm, toggleOpen }: { setOpenSuggestionList: React.Dispatch<React.SetStateAction<boolean>>, setSearchTerm: React.Dispatch<React.SetStateAction<string>>, toggleOpen: any }) {


    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpenSuggestionList(true)
        setSearchTerm(e.target.value)
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#335C6E' }}>
                <Toolbar>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => toggleOpen()}

                    >
                        {/* <Manucho /> */}

                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: 'center' }}
                    >
                        Ello
                    </Typography>
                    <Search >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            sx={{ cursor: 'pointer' }}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
                        />
                    </Search>


                </Toolbar>
            </AppBar>
        </Box>
    );
}
