import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import ListViewer from './ListViewer';
import NavToolBar from './NavToolBar';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    // function handleCreateNewList() {
    //     store.createNewList();
    // }
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let listCard = "";
    let cardStatus = false;
    let isModalOpen = false;
    const handleAccordionChange = (panel) => {
        setExpanded((expanded === panel) ? false : panel);
        if(expanded === panel){
            store.closeCurrentList();
        }
        else{
            store.setCurrentList(panel);
        }
    }
    if (store) {
        if(store.currentModal != "NONE"){
            isModalOpen = true;
        }
        if (store.listNameActive) {
            cardStatus = true;
        }

        if(store.currentList && expanded != store.currentList._id){
            setExpanded(store.currentList._id);
        }
        listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        expanded={expanded}
                        handleAccordionChange={handleAccordionChange}
                    />
                ))
            }
            </List>;
    }
    return (
        <Box>
            <div id="playlist-selector">
                {/* <div id="list-selector-heading">
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    disabled={isModalOpen || cardStatus}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h2">Your Lists</Typography>
                </div> */}
                <div id="nav-bar">
                    <NavToolBar />
                </div>
                <div id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </div>
                <div id="list-viewer">
                    <ListViewer />
                </div>
            </div>
            { modalJSX }
        </Box>)
}

export default HomeScreen;