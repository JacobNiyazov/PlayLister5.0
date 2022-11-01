import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.currentSong !== null}
        >
            <Box sx={style}>
                <div
                    id="edit-song-modal"
                    // className="modal is-visible"
                    data-animation="slideInOutLeft">
                    <div
                        id='edit-song-root'
                        className="modal-root">
                        <Typography id="modal-modal-title" variant="h4" component="h1">
                            Edit Song
                        </Typography>
                        <div
                            id="edit-song-modal-content"
                            className="modal-center">
                            <div style={{ display: 'inline-flex', margin:'15px 0px' }}>
                                <Typography id="modal-modal-title" variant="h6" component="h5" mr='83px' pt='10px' >
                                    Title:
                                </Typography>
                                <TextField id="outlined-basic" variant="outlined" defaultValue={title} onChange={handleUpdateTitle}/>
                            </div>
                            <div style={{ display: 'inline-flex', margin:'15px 0px' }}>
                                <Typography id="modal-modal-title" variant="h6" component="h5" mr='75px' pt='10px' >
                                    Artist:
                                </Typography>
                                <TextField id="outlined-basic" variant="outlined" defaultValue={artist} onChange={handleUpdateArtist}/>
                            </div>
                            <div style={{ display: 'inline-flex', margin:'15px 0px' }}>
                                <Typography id="modal-modal-title" variant="h6" component="h5" mr='20px' pt='10px' >
                                    YouTube Id:
                                </Typography>
                                <TextField id="outlined-basic" variant="outlined" defaultValue={youTubeId} onChange={handleUpdateYouTubeId}/>
                            </div>
                        </div>
                        <div className="modal-south">
                            <Button onClick={handleConfirmEditSong} autoFocus>
                                Confirm
                            </Button>
                            <Button onClick={handleCancelEditSong} autoFocus>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}