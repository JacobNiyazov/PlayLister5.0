import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import logoIMG from '../PlaylisterLogo.png'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export default function NavToolBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleHomeButton = (event) => {
        store.updateCurrentPage(store.CurrentPageType.HOME);
    };
    const handlePlaylistsButton = (event) => {
        store.updateCurrentPage(store.CurrentPageType.PLAYLISTS);
    };
    const handleUsersButton = (event) => {
        store.updateCurrentPage(store.CurrentPageType.USERS);
    };
    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    let homeDisabled = false;
    if(auth.userType == 'guest')
        homeDisabled = true;

    const menuId = 'primary-search-sort-menu';
    const sortMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}

        >
            <MenuItem onClick={handleMenuClose}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes (High - Low)</MenuItem>
        </Menu>        

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button 
                        style={{backgroundColor: '#ffffff', color: '#1976d2', margin: '0.25rem'}}
                        size='large'
                        variant="contained"
                        disabled={homeDisabled}
                        classes={{disabled:"top5-button-disabled"}}
                        onClick={handleHomeButton}>
                        <HomeIcon />
                    </Button>
                    <Button 
                        style={{backgroundColor: '#ffffff', color: '#1976d2', margin: '0.25rem'}}
                        size='large'
                        variant="contained"
                        onClick={handlePlaylistsButton}>
                        <GroupsIcon />
                    </Button>
                    <Button 
                        style={{backgroundColor: '#ffffff', color: '#1976d2', margin: '0.25rem'}}
                        size='large'
                        variant="contained"
                        onClick={handleUsersButton}>
                        <PersonSearchIcon />
                    </Button>
                    <TextField fullWidth sx={{ mx: '20%', bgcolor: '#ffffff'}} id="filled-basic" label="Search" variant="filled"/>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Typography variant='h6' mt='0.7rem'>Sort</Typography>
                        <Typography variant='h6' mt='0.7rem'>&nbsp;</Typography>
                        <Typography variant='h6' mt='0.7rem'>By</Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleSortMenuOpen}
                            color="inherit"
                        >
                            <SortIcon fontSize="large"/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                sortMenu
            }
        </Box>
    );
}