import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    LOAD_PLAYLISTS: "LOAD_PLAYLISTS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_LIST_NAME_NOT_EDIT_ACTIVE: "SET_LIST_NAME_NOT_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    LOG_OUT: "LOG_OUT",
    UPDATE_CURRENT_PAGE: "UPDATE_CURRENT_PAGE",
    DUPLICATE_LIST: "DUPLICATE_LIST",
    LOAD_ALL_PUBLISHED_PLAYLISTS: "LOAD_ALL_PUBLISHED_PLAYLISTS",
    SEARCH_BY_PLAYLIST: "SEARCH_BY_PLAYLIST",
    SEARCH_BY_USER: "SEARCH_BY_USER",
    UPDATE_USER_LISTS: "UPDATE_USER_LISTS",
    UPDATE_PUBLISHED_LISTS: "UPDATE_PUBLISHED_LISTS",
    INC_CURRENT_SONG_IDX: "INC_CURRENT_SONG_IDX",
    SET_CURRENT_PLAYING_LIST: "SET_CURRENT_PLAYING_LIST"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG",
    SET_RENAME_ERROR: "SET_RENAME_ERROR"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        userLists: [],
        currentList: null,
        currentSongIndex : 0,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        currentPage: "HOME",
        allPublishedPlaylists: null,
        playlistSearchRes: [],
        userSearchRes: [],
        currentSearch: "",
        renameError: null,
        currentPlayingList: null
    });
    const history = useHistory();
    store.CurrentPageType = {
        HOME : "HOME",
        PLAYLISTS : "PLAYLISTS",
        USERS : "USERS"
    }
    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    userLists: payload.lists,
                    currentList: null,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: payload.allLists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: null,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: payload,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                })
            }
            case GlobalStoreActionType.DUPLICATE_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: null,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.pairsArray,
                    userLists: payload.lists,
                    currentList: payload.newList,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: payload.allLists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.SEARCH_BY_PLAYLIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: null,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: payload.lists,
                    userSearchRes: store.userSearchRes,
                    currentSearch: payload.search,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.SEARCH_BY_USER: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: null,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.CurrentPageType.USERS,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: payload.lists,
                    currentSearch: payload.search,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            // case GlobalStoreActionType.LOAD_PLAYLISTS: {
            //     return setStore({
            //         currentModal : CurrentModal.NONE,
            //         idNamePairs: store.idNamePairs,
            //         userLists: payload,
            //         currentList: null,
            //         currentSongIndex: 0,
            //         currentSong: null,
            //         newListCounter: store.newListCounter,
            //         listNameActive: false,
            //         listIdMarkedForDeletion: null,
            //         listMarkedForDeletion: null,
            //         currentPage: store.currentPage
            //     });
            // }
            case GlobalStoreActionType.LOAD_ALL_PUBLISHED_PLAYLISTS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: null,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: payload,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: store.currentList,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: null
                });
            }
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: store.currentList,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: payload,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: payload,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.SET_LIST_NAME_NOT_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: payload,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: store.currentList,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.SET_RENAME_ERROR: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: store.currentList,
                    currentSongIndex: 0,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: payload,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.INC_CURRENT_SONG_IDX: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex + payload,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: store.renameError,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.SET_CURRENT_PLAYING_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: store.currentList,
                    currentSongIndex: 0,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: store.renameError,
                    currentPlayingList: payload
                });
            }
            case GlobalStoreActionType.UPDATE_USER_LISTS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: payload,
                    currentList: store.currentList,
                    currentSongIndex: 0,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: store.renameError,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.UPDATE_PUBLISHED_LISTS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: store.currentList,
                    currentSongIndex: 0,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    currentPage: store.currentPage,
                    allPublishedPlaylists: payload,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: store.renameError,
                    currentPlayingList: store.currentPlayingList
                });
            }
            case GlobalStoreActionType.LOG_OUT: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: [],
                    userLists: [],
                    currentList: null,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: store.CurrentPageType.HOME,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: store.playlistSearchRes,
                    userSearchRes: store.userSearchRes,
                    currentSearch: store.currentSearch,
                    renameError: null,
                    currentPlayingList: null
                });
            }
            case GlobalStoreActionType.UPDATE_CURRENT_PAGE: {
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: store.idNamePairs,
                    userLists: store.userLists,
                    currentList: null,
                    currentSongIndex: 0,
                    currentSong: null,
                    newListCounter: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: payload.currentPage,
                    allPublishedPlaylists: store.allPublishedPlaylists,
                    playlistSearchRes: [],
                    userSearchRes: [],
                    currentSearch: "",
                    renameError: null,
                    currentPlayingList: null
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.
    store.updateCurrentPage = function (page) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_CURRENT_PAGE,
            payload: {
                currentPage: page
            }
        });
    }
    store.handleUpdateLike = function (list) {
        let reac = list.reactions.filter(reaction => reaction.username == auth.user.username);
        if(reac.length != 0){
            if(reac[0].reaction == "like") return;
            else{
                let index = list.reactions.findIndex(r => r==reac[0]);
                list.reactions[index] = {username: auth.user.username, reaction: "like"};
                list.dislikes = list.dislikes - 1;
                list.likes = list.likes + 1;
            }
        }
        else{
            list.reactions.push({username: auth.user.username, reaction: "like"});
            list.likes = list.likes + 1;
        }
        // NOW MAKE IT OFFICIAL
        async function asyncUpdateList(list) {
            const response = await api.updatePlaylistById(list._id, list);
            if (response.data.success) {
                store.loadIdNamePairs();
            }
        }
        asyncUpdateList(list);
    }
    store.handleUpdateDislike = function (list) {
        let reac = list.reactions.filter(reaction => reaction.username == auth.user.username);
        if(reac.length != 0){
            if(reac[0].reaction == "dislike") return;
            else{
                let index = list.reactions.findIndex(r => r==reac[0]);
                list.reactions[index] = {username: auth.user.username, reaction: "dislike"};
                list.likes = list.likes - 1;
                list.dislikes = list.dislikes + 1;
            }
        }
        else{
            list.reactions.push({username: auth.user.username, reaction: "dislike"});
            list.dislikes = list.dislikes + 1;
        }
        // NOW MAKE IT OFFICIAL
        async function asyncUpdateList(list) {
            const response = await api.updatePlaylistById(list._id, list);
            if (response.data.success) {
                store.loadIdNamePairs();
            }
        }
        asyncUpdateList(list);
    }
    store.setCurrentPlayingList = function (list) {
        async function asyncUpdate(list) {
            list.listens = list.listens +1;
            const response = await api.updatePlaylistById(list._id, list);
            if (response.data.success) {
                store.loadIdNamePairs(null, list);
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_PLAYING_LIST,
                    payload: list
                });
            }
        }
        asyncUpdate(list);
    }
    store.addComment = function (text) {
        let list = store.currentPlayingList;      
        list.comments.push({author: auth.user.username, comment: text}); 

        // NOW MAKE IT OFFICIAL
        async function asyncUpdate(list) {
            const response = await api.updatePlaylistById(list._id, list);
            if (response.data.success) {
                store.loadIdNamePairs();
            }
        }
        asyncUpdate(list);
    }
    store.searchByPlaylist = function (text) {
        async function asyncSearchByPlaylist(text){
            let response = await api.getAllPublishedPlaylists();
            if (response.data.success) {
                let playlists = response.data.data;
                playlists = playlists.filter(playlist => (playlist.isPublished && playlist.name == text));
                storeReducer({
                    type: GlobalStoreActionType.SEARCH_BY_PLAYLIST,
                    payload: { lists: playlists, search: text}
                });
            }
        }
        asyncSearchByPlaylist(text);
    }
    store.searchByUser = function (text) {
        async function asyncSearchByUser(text){
            let response = await api.getAllPublishedPlaylists();
            if (response.data.success) {
                let playlists = response.data.data;
                playlists = playlists.filter(playlist => (playlist.isPublished && playlist.author == text));
                storeReducer({
                    type: GlobalStoreActionType.SEARCH_BY_USER,
                    payload: { lists: playlists, search: text}
                });
            }
        }
        asyncSearchByUser(text);
    }
    store.getPlaylists = async function () {
        let response = await api.getPlaylists();
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.LOAD_PLAYLISTS,
                payload: response.data
            });
        }
    }
    store.logout = function () {
        storeReducer({
            type: GlobalStoreActionType.LOG_OUT,
            payload: null
        });
        storeReducer({
            type: GlobalStoreActionType.UPDATE_CURRENT_PAGE,
            payload: {
                currentPage: store.CurrentPageType.HOME
            }
        });
        tps.clearAllTransactions();
    }
    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                let response2 = await api.getPlaylists();
                                if (response2.data.success) {
                                    let userPlaylists = response2.data.data;
                                    const response3 = await api.getAllPublishedPlaylists();
                                    if (response3.data.success) {
                                        storeReducer({
                                            type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                            payload: {idNamePairs: pairsArray, lists: userPlaylists, allLists: response3.data.data}
                                        });
                                    }
                                }
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.idNamePairs.length;
        console.log(auth.user)
        const response = await api.createPlaylist(newListName, [], auth.user.email, auth.user.username);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            store.loadIdNamePairs(newList);
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            });           
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function (newList=null, playingList=null) {
        async function asyncLoadIdNamePairs() {
            try{
                const response = await api.getPlaylistPairs();
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    let response2 = await api.getPlaylists();
                    if (response2.data.success) {
                        let userPlaylists = response2.data.data;
                        const response3 = await api.getAllPublishedPlaylists();
                        if (response3.data.success) {
                            console.log(store.currentList)
                            storeReducer({
                                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                payload: {pairsArray: pairsArray, lists: userPlaylists, allLists: response3.data.data, newList: newList }
                            });
                            if(playingList){
                                storeReducer({
                                    type: GlobalStoreActionType.SET_CURRENT_PLAYING_LIST,
                                    payload: playingList
                                });
                            }
                            console.log(store)
                        }
                    }
                }
                else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            catch (e){
                console.log(e);
            }
        }
        asyncLoadIdNamePairs();
    }

    store.getAllPublishedPlaylists = function () {
        async function asyncGetAllPublishedPlaylists() {
            const response = await api.getAllPublishedPlaylists();
            console.log(response)
            if (response.data.success) {
                let playlists = response.data.data;
                console.log(playlists)
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ALL_PUBLISHED_PLAYLISTS,
                    payload: playlists
                });
            }
        }
        asyncGetAllPublishedPlaylists();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.unmarkListForDeletion = function() {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                store.loadIdNamePairs();
                // store.getPlaylists();

                history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    store.duplicateList = function(id) {
        async function getList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                let newListName = "Copy of " + playlist.name;
                let response2 = await api.createPlaylist(newListName, playlist.songs, auth.user.email, auth.user.username);
                console.log("createNewList response: " + response2);
                if (response2.status === 201) {
                    tps.clearAllTransactions();
                    let newList = response2.data.playlist;
                    storeReducer({
                        type: GlobalStoreActionType.DUPLICATE_LIST,
                        payload: newList
                    });
                    store.loadIdNamePairs();
                    // store.getPlaylists();
                }
                else {
                    console.log("API FAILED TO CREATE A NEW LIST");
                }
            }
        }
        getList(id);
    }
    store.publishList = function(id) {
        async function asyncPublishCurrentList() {
            let list = store.currentList;
            list.isPublished = true;
            list.publishDate = new Date();
            list.listens = 0;
            const response = await api.updatePlaylistById(store.currentList._id, list);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: null
                });
                store.loadIdNamePairs();
            }
        }
        asyncPublishCurrentList();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.openRenameErrorModal = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_RENAME_ERROR,
            payload: "name already exists"
        }); 
    }
    store.closeRenameErrorModal = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_RENAME_ERROR,
            payload: null
        }); 
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            try{
                let response = await api.getPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    // response = await api.updatePlaylistById(playlist._id, playlist);
                    // if (response.data.success) {
                    //     storeReducer({
                    //         type: GlobalStoreActionType.SET_CURRENT_LIST,
                    //         payload: playlist
                    //     });
                    //     // history.push("/playlist/" + playlist._id);
                    // }
                }
            }
            catch (e){
                let response = await api.getPublishedPlaylistById(id);
                if (response.data.success) {
                    let playlist = response.data.playlist;
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                }
            }
            
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
                store.loadIdNamePairs(store.currentList);
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }
    store.incCurrentSongIndex = function (val=null){
        if(val == -1){
            storeReducer({
                type: GlobalStoreActionType.INC_CURRENT_SONG_IDX,
                payload: -1
            });
        }
        else{
            storeReducer({
                type: GlobalStoreActionType.INC_CURRENT_SONG_IDX,
                payload: 1
            });
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.setNameNotEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_NOT_EDIT_ACTIVE,
            payload: null
        });
    }

    store.updateUserLists = function (playlist) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_USER_LISTS,
            payload: playlist
        });
    }
    store.updatePublishedLists = function (playlist) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_PUBLISHED_LISTS,
            payload: playlist
        });
    }
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };