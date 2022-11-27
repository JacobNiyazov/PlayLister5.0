import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import logoIMG from '../PlaylisterLogo.png'

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
    const [text, setText] = useState("");
    const isMenuOpen = Boolean(anchorEl);

    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if(store.currentPage == 'PLAYLISTS'){
                store.searchByPlaylist(text);
            }
            else if(store.currentPage == 'USERS'){
                store.searchByUser(text);
            }
        }
    }
    const handleHomeButton = (event) => {
        store.updateCurrentPage(store.CurrentPageType.HOME);
    };
    const handlePlaylistsButton = (event) => {
        // store.getAllPublishedPlaylists();
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
    function handleUserNameSort(){
        handleMenuClose();
        let playlists = store.userLists;
        playlists.sort((p1, p2) => p1.name.localeCompare(p2.name));
        store.updateUserLists(playlists);
    }
    function handleUserCDSort() {
        handleMenuClose();
        let playlists = store.userLists;
        playlists.sort((p1, p2) => (new Date(p1.createdAt)) - (new Date(p2.createdAt)));
        store.updateUserLists(playlists);
    }
    function handleUserLEDSort() {
        handleMenuClose();
        let playlists = store.userLists;
        playlists.sort((p1, p2) => (new Date(p1.updatedAt)) - (new Date(p2.updatedAt)) > 0 ? -1 : 1);
        store.updateUserLists(playlists);
    }
    function handleNameSort(){
        handleMenuClose();
        let playlists = store.allPublishedPlaylists;
        playlists.sort((p1, p2) => p1.name.localeCompare(p2.name));
        store.updatePublishedLists(playlists);
    }
    function handlePublishSort(){
        handleMenuClose();
        let playlists = store.allPublishedPlaylists;
        playlists.sort((p1, p2) => (new Date(p1.publishDate)) - (new Date(p2.publishDate)) > 0 ? -1 : 1);
        store.updatePublishedLists(playlists);
    }
    function handleListensSort(){
        handleMenuClose();
        let playlists = store.allPublishedPlaylists;
        playlists.sort((p1, p2) => p1.listens > p2.listens ? -1 : 1);
        store.updatePublishedLists(playlists);
    }
    function handleLikesSort(){
        handleMenuClose();
        let playlists = store.allPublishedPlaylists;
        playlists.sort((p1, p2) => p1.likes > p2.likes ? -1 : 1);
        store.updatePublishedLists(playlists);
    }
    function handleDislikesSort(){
        handleMenuClose();
        let playlists = store.allPublishedPlaylists;
        playlists.sort((p1, p2) => p1.dislikes > p2.dislikes ? -1 : 1);
        store.updatePublishedLists(playlists);
    }

    let homeDisabled = false;
    if(auth.userType == 'guest')
        homeDisabled = true;

    const menuId = 'primary-search-sort-menu';

    const currentPage = store.currentPage;
    let homePageButtonColor;
    let playlistsPageButtonColor;
    let usersPageButtonColor;
    if(currentPage === 'HOME'){
        homePageButtonColor = '#2c2435';
        playlistsPageButtonColor = '#ffffff';
        usersPageButtonColor = '#ffffff';
    } 
    else if(currentPage === 'PLAYLISTS'){
        homePageButtonColor = '#ffffff';
        playlistsPageButtonColor = '#2c2435';
        usersPageButtonColor = '#ffffff';
    } 
    else if(currentPage === 'USERS'){
        homePageButtonColor = '#ffffff';
        playlistsPageButtonColor = '#ffffff';
        usersPageButtonColor = '#2c2435';
    } 

    let sortMenu = 
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
            <MenuItem onClick={handleNameSort}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handlePublishSort}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleListensSort}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleLikesSort}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleDislikesSort}>Dislikes (High - Low)</MenuItem>
        </Menu>    
    if(currentPage === 'HOME'){
        sortMenu = 
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
            <MenuItem onClick={handleUserNameSort}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleUserCDSort}>Creation Date (Old - New)</MenuItem>
            <MenuItem onClick={handleUserLEDSort}>Last Edit Date (New - Old)</MenuItem>
        </Menu>    
    }
     

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button 
                        style={{backgroundColor: `${homePageButtonColor}`, color: '#1976d2', margin: '0.25rem'}}
                        size='large'
                        variant="contained"
                        disabled={homeDisabled}
                        classes={{disabled:"top5-button-disabled"}}
                        onClick={handleHomeButton}>
                        <HomeIcon />
                    </Button>
                    <Button 
                        style={{backgroundColor: `${playlistsPageButtonColor}`, color: '#1976d2', margin: '0.25rem'}}
                        size='large'
                        variant="contained"
                        onClick={handlePlaylistsButton}>
                        <GroupsIcon />
                    </Button>
                    <Button 
                        style={{backgroundColor: `${usersPageButtonColor}`, color: '#1976d2', margin: '0.25rem'}}
                        size='large'
                        variant="contained"
                        onClick={handleUsersButton}>
                        <PersonSearchIcon />
                    </Button>
                    <TextField fullWidth sx={{ mx: '20%', bgcolor: '#ffffff'}} id="filled-basic" label="Search" variant="filled" onKeyPress={handleKeyPress} onChange={handleUpdateText}/>
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