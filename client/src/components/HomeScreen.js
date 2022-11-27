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
import PublishedListCard from './PublishedListCard'
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
        // store.getPlaylists();
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
        console.log(store.allPublishedPlaylists)
        if(store.currentModal != "NONE"){
            isModalOpen = true;
        }
        if (store.listNameActive) {
            cardStatus = true;
        }

        if(store.currentList && expanded != store.currentList._id){
            setExpanded(store.currentList._id);
        }
        if(store.currentPage == 'HOME'){
            console.log(store.userLists)
            listCard = 
                <List sx={{ width: '90%', left: '5%'}}>
                {
                    store.userLists.map((list) => {
                        if(list.isPublished){
                            return <PublishedListCard
                                        key={list._id}
                                        list={list}
                                        selected={false}
                                        expanded={expanded}
                                        owner={true}
                                        handleAccordionChange={handleAccordionChange}
                                    />
                        }
                        else{
                            return <ListCard
                                        key={list._id}
                                        list={list}
                                        selected={false}
                                        expanded={expanded}
                                        handleAccordionChange={handleAccordionChange}
                                    />
                        }
                    })
                }
                </List>;
        }
        else if(store.currentPage == 'PLAYLISTS'){            
            if(store.playlistSearchRes.length == 0){
                listCard = 
                    <List sx={{ width: '90%', left: '5%'}}>
                    {
                        store.allPublishedPlaylists.map((list) => {
                            if(auth.user && list.ownerEmail == auth.user.email){
                                return <PublishedListCard
                                    key={list._id}
                                    list={list}
                                    selected={false}
                                    expanded={expanded}
                                    owner={true}
                                    handleAccordionChange={handleAccordionChange}
                                />;
                            }
                            else{
                                return <PublishedListCard
                                    key={list._id}
                                    list={list}
                                    selected={false}
                                    expanded={expanded}
                                    owner={false}
                                    handleAccordionChange={handleAccordionChange}
                                />;
                            }
                        })
                    }
                    </List>;
            }
            else{
                listCard = 
                    <List sx={{ width: '90%', left: '5%'}}>
                    {
                        store.playlistSearchRes.map((list) => {
                            if(auth.user && list.ownerEmail == auth.user.email){
                                return <PublishedListCard
                                    key={list._id}
                                    list={list}
                                    selected={false}
                                    expanded={expanded}
                                    owner={true}
                                    handleAccordionChange={handleAccordionChange}
                                />;
                            }
                            else{
                                return <PublishedListCard
                                    key={list._id}
                                    list={list}
                                    selected={false}
                                    expanded={expanded}
                                    owner={false}
                                    handleAccordionChange={handleAccordionChange}
                                />;
                            }
                        })
                    }
                    </List>;
            }
        }
        else if (store.currentPage == 'USERS' && store.userSearchRes.length != 0){
            listCard = 
                    <List sx={{ width: '90%', left: '5%'}}>
                    {
                        store.userSearchRes.map((list) => {
                            if(auth.user && list.ownerEmail == auth.user.email){
                                return <PublishedListCard
                                    key={list._id}
                                    list={list}
                                    selected={false}
                                    expanded={expanded}
                                    owner={true}
                                    handleAccordionChange={handleAccordionChange}
                                />;
                            }
                            else{
                                return <PublishedListCard
                                    key={list._id}
                                    list={list}
                                    selected={false}
                                    expanded={expanded}
                                    owner={false}
                                    handleAccordionChange={handleAccordionChange}
                                />;
                            }
                        })
                    }
                    </List>;
        }
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