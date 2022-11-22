import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
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
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected, expanded, handleAccordionChange } = props;
    

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
            toggleEdit();
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
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            if(text != ""){
                store.changeListName(id, text);
            }
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
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
    console.log(expanded)
    console.log("hi")
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '28pt' }}
            button
            onClick={handleToggleEdit}
        >
            <Accordion expanded={expanded === idNamePair._id} sx={{ p: 1, flexGrow: 1}} onChange={handleAccordionChange(idNamePair._id)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon
                        style={{ cursor: 'pointer'}}
                        onClick={() => handleAccordionChange(idNamePair._id)} />
                    }
                    >
                    <Grid container>
                        <Grid item xl={7}>
                            <Typography variant= 'h4'>{idNamePair.name}</Typography>
                        </Grid>
                        <Grid item xl={5}>
                            <LikeDislikeController/>
                        </Grid>
                        <Grid item xl={10}>
                            <Typography variant= 'h6'>By:</Typography>
                        </Grid>
                        <Grid item xl={8}>
                            <Typography variant= 'body2'>Published:</Typography>
                        </Grid>
                        <Grid item xl={4}>
                            <Typography variant= 'body2'>Listens:</Typography>
                        </Grid>
                    </Grid>                    
                </AccordionSummary>
                <AccordionDetails>
                    <Box maxHeight={500} sx={{ overflowY: "scroll" }}>
                        <List 
                            id="playlist-cards" 
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                        >
                            {
                                // store.currentList.songs.map((song, index) => (
                                    <SongCard
                                        id={'playlist-song-' + (0)}
                                        key={'playlist-song-' + (0)}
                                        index={0}
                                        song={{title:"Unknonwn", artist:"Unknown",youTubeId:"73t2rg283"}}
                                    />
                                // ))  
                            }
                            <Box textAlign='center' className="list-card unselected-list-card" style={{height:'1.5rem'}}>
                                <Button className="add-song-button" style={{color: '#1976d2'}}>
                                    <AddIcon/>
                                </Button>
                            </Box>
                        </List>            
                    </Box>
                    <Grid container>
                        <Grid item xl={6}>
                            <Button style={{color: '#1976d2'}}>
                                <UndoIcon style={{fontSize:'16pt'}}/>
                            </Button>
                            <Button style={{color: '#1976d2'}}>
                                <RedoIcon style={{fontSize:'16pt'}}/>
                            </Button>
                        </Grid>
                        <Grid item xl={6}>
                            <Button autoFocus>
                                Publish
                            </Button>
                            <Button autoFocus>
                                Duplicate
                            </Button>
                            <Button autoFocus>
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
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
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