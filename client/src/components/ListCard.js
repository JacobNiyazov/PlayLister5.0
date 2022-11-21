import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import TextField, { textFieldClasses } from '@mui/material/TextField';
import LikeDislikeController from './LikeDislikeController';

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
    const { idNamePair, selected } = props;
    const [expand, setExpand] = useState(false);

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
    console.log(cardStatus)
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '28pt' }}
            button
            onClick={handleToggleEdit}
        >
            <Accordion expanded={expand} sx={{ p: 1, flexGrow: 1}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon
                        style={{ cursor: 'pointer'}}
                        onClick={() => setExpand(!expand)} />
                    }
                    >
                    <Grid container>
                        <Grid item xl={5}>
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
                    <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                        Aliquam eget maximus est, id dignissim quam.
                    </Typography>
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