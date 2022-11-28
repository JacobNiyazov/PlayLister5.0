import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AddIcon from '@mui/icons-material/Add';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import LikeDislikeController from './LikeDislikeController';
import SongCard from './SongCard';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/

function PublishedListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const { list, selected, expanded, owner, handleAccordionChange, handleAccordionChangeFunc } = props;

    let isGuest = auth.userType == 'guest' ? true : false;

    function handleDuplicateList() {
        if(expanded){
            handleAccordionChangeFunc(expanded);
        }
        store.duplicateList(list._id);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(list._id);
    }
    function handleToggleEdit(event) {
        event.stopPropagation();
        if(event.detail === 1){
            store.setCurrentPlayingList(list);
        }
    }

    let songCards = "";
    if(store.currentList){
        songCards = store.currentList.songs.map((song, index) => {
            if(store.currentPlayingList && index == store.currentSongIndex){
                return <ListItem
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                            sx={{display: 'flex', p: 1 }}
                            style={{ width: '100%', fontSize: '28pt' }}
                        >
                            <Typography variant='h6' color='rgb(131, 173, 201)'>{`${index+1}. ${song.title} by ${song.artist}`}</Typography>
                        </ListItem>;
            }
            else{
                return <ListItem
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                    sx={{display: 'flex', p: 1 }}
                    style={{ width: '100%', fontSize: '28pt' }}
                >
                    <Typography variant='h6' color='#ffffff'>{`${index+1}. ${song.title} by ${song.artist}`}</Typography>
                </ListItem>;
            }
              
        })
    }
    // getLists();
    // let plist;
    // async function getLists() {
    //     plist = await store.getPlaylistById(idNamePair._id);
    // }
    let author = list.author;
    let likes = list.likes;
    let dislikes = list.dislikes;
    let publishDate = list.publishDate.split("T")[0];
    let listens = list.listens;
    let isModalOpen = false;
    if(store.currentModal != "NONE"){
        isModalOpen = true;
    }

    function handleProfileSearch () {
        store.searchByUser(author);
    }

    let deleteButton = "";
    let space1 = 9;
    let space2 = 3;
    if(owner){
        space1 = 6;
        space2 = 6
        deleteButton = <Button autoFocus sx={{bgcolor:'white', opacity:'90%', ':hover': {bgcolor: 'primary.main', color: 'white'}}} onClick={handleDeleteList}>
                            Delete
                        </Button>
    }
    let duplicateButton = "";
    if(!isGuest){
        duplicateButton = <Button autoFocus sx={{bgcolor:'white', opacity:'90%', mr:'5%', ':hover': {bgcolor: 'primary.main', color: 'white'}}} onClick={handleDuplicateList}>
                            Duplicate
                        </Button>
    }

    let cardElement =
        <ListItem
            id={list._id}
            key={list._id}
            sx={{display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '28pt' }}
            button
        >
            <Accordion expanded={expanded === list._id} sx={{ p: 1, flexGrow: 1, color:'white', backgroundColor:'#1976d2'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon
                        style={{ cursor: 'pointer', color:'white'}}
                        onClick={handleAccordionChange(list._id)} />
                    }
                    onClick={handleToggleEdit}
                    >
                    <Grid container>
                        <Grid item xl={7}>
                            <Typography variant= 'h4'>{list.name}</Typography>
                        </Grid>
                        <Grid item xl={5}>
                            <LikeDislikeController
                                likes={likes}
                                dislikes={dislikes}
                                />
                        </Grid>
                        <Grid item xl={10}>
                            <Typography variant='h6'>By: <span onClick={handleProfileSearch} style={{color: '#cc6699', fontWeight:'bold', fontSize: '14pt'}}>{author}</span></Typography>
                        </Grid>
                        <Grid item xl={8}>
                            <Typography variant= 'body2'>Published: <span style={{color:'#00ffff'}}>{publishDate}</span></Typography>
                        </Grid>
                        <Grid item xl={4}>
                            <Typography variant= 'body2'>Listens: <span style={{color:'#00ffff'}}>{listens}</span></Typography>
                        </Grid>
                    </Grid>                    
                </AccordionSummary>
                <AccordionDetails>
                    <Box maxHeight={300} sx={{ overflowY: "scroll" }}>
                        <List 
                            id="playlist-cards" 
                            sx={{ width: '100%', bgcolor: '#2c2435' }}
                        >
                            {
                                songCards 
                            }
                        </List>            
                    </Box>
                    <Grid container>
                        <Grid item xl={space1}>
                        </Grid>
                        <Grid item xl={space2}>
                            { duplicateButton }
                            { deleteButton }
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

        </ListItem>
    return (
        cardElement
    );
}

export default PublishedListCard;