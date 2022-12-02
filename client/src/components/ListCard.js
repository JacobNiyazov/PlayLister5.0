import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
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

function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { list, selected, expanded, handleAccordionChange, handleAccordionChangeFunc } = props;
    
    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        if (event.detail === 2) {
            if(expanded){
                handleAccordionChangeFunc(expanded);
            }
            toggleEdit();
        }
        else if(event.detail === 1){
            store.setCurrentPlayingList(list);
        }
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        else{
            store.setNameNotEditActive();
        }
        setEditActive(newActive);
        if(expanded){
            handleAccordionChangeFunc(expanded);
        }
    }

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleDuplicateList() {
        if(expanded){
            handleAccordionChangeFunc(expanded);
        }
        store.duplicateList(list._id);
    }
    function handlePublishList() {
        if(expanded){
            handleAccordionChangeFunc(expanded);
        }
        store.publishList();
    }
    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(list._id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            let sameName = store.userLists.filter(list => list.name == text);
            if(sameName.length == 0){
                if(text != ""){
                    store.changeListName(id, text);
                }
                toggleEdit();
            }
            else{
                store.openRenameErrorModal();
            }
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let songCards = "";
    if(store.currentList){
        songCards = store.currentList.songs.map((song, index) => (
            <SongCard
                id={'playlist-song-' + (index)}
                key={'playlist-song-' + (index)}
                index={index}
                song={song}
            />
        ))
    }
    // getLists();
    // let plist;
    // async function getLists() {
    //     plist = await store.getPlaylistById(idNamePair._id);
    // }
    let author = list.author;
    let likes = list.likes;
    let dislikes = list.dislikes;

    function handleProfileSearch (event) {
        event.stopPropagation();
        store.searchByUser(author);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.listNameActive) {
        cardStatus = true;
    }
    let isModalOpen = false;
    if(store.currentModal != "NONE"){
        isModalOpen = true;
    }
    let bckgColor = '#ffffff';
    let fColor = '#000000'
    if(store.currentPlayingList == list){
        bckgColor = '#290072';
        fColor = 'white';
    }
    let cardElement =
        <ListItem
            id={list._id}
            key={list._id}
            sx={{display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '28pt' }}
            button
            // onClick={handleToggleEdit}
        >
            <Accordion expanded={expanded === list._id} sx={{ p: 1, flexGrow: 1, color:fColor, backgroundColor:bckgColor}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon
                        style={{ cursor: 'pointer'}}
                        onClick={handleAccordionChange(list._id)} />
                    }
                    onClick={handleToggleEdit}
                    >
                    <Grid container>
                        <Grid item xl={7}>
                            <Typography variant= 'h4'>{list.name}</Typography>
                        </Grid>
                        <Grid item xl={10}>
                            <Typography variant= 'h6'>By: <span onClick={handleProfileSearch} style={{color: '#cc6699', fontWeight:'bold', fontSize: '14pt'}}>{author}</span></Typography>
                        </Grid>
                    </Grid>                    
                </AccordionSummary>
                <AccordionDetails>
                    <Box maxHeight={300} sx={{ overflowY: "scroll" }}>
                        <List 
                            id="playlist-cards" 
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                        >
                            {
                                songCards 
                            }
                            <Box textAlign='center' className="list-card unselected-list-card" style={{height:'1.5rem'}}>
                                <Button className="add-song-button" onClick={handleAddNewSong} style={{color: '#1976d2'}}>
                                    <AddIcon/>
                                </Button>
                            </Box>
                        </List>            
                    </Box>
                    <Grid container>
                        <Grid item xl={6}>
                            <Button onClick={handleUndo} style={{color: '#1976d2'}}>
                                <UndoIcon style={{fontSize:'16pt'}}/>
                            </Button>
                            <Button onClick={handleRedo} style={{color: '#1976d2'}}>
                                <RedoIcon style={{fontSize:'16pt'}}/>
                            </Button>
                        </Grid>
                        <Grid item xl={6}>
                            <Button autoFocus onClick={handlePublishList}>
                                Publish
                            </Button>
                            <Button autoFocus onClick={handleDuplicateList}>
                                Duplicate
                            </Button>
                            <Button autoFocus onClick={handleDeleteList}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            {/* <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} disabled={isModalOpen || cardStatus} aria-label='edit'>
                    <EditIcon style={{fontSize:'28pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} disabled={isModalOpen || cardStatus} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'28pt'}} />
                </IconButton>
            </Box> */}
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                color="secondary"
                // sx={{ borderColor: 'red'}}
                id={"list-" + list._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={list.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;