import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.currentSong !== null}
        >
            <Box sx={style}>
                <div
                    id="remove-song-modal"
                    // className={modalClass}
                    data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-remove-song-root'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Remove Song?
                        </Typography>
                        <Alert severity="warning">Are you sure you wish to permanently remove {songTitle} from the playlist?</Alert>
                        <div className="modal-south">
                            <Button onClick={handleConfirmRemoveSong} autoFocus>
                                Confirm
                            </Button>
                            <Button onClick={handleCancelRemoveSong} autoFocus>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}