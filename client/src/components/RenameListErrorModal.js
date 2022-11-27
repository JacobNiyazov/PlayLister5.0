import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

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

export default function RenameListErroModal() {
  const { store } = useContext(GlobalStoreContext);

    function handleCloseModal(event) {
        store.closeRenameErrorModal();
    }

    return (
        <Modal
            open={store.renameError !== null}
        >
            <Box sx={style}>
                <div>
                    <Alert severity="warning">{"A playlist with this name already exists."}</Alert>
                    <div id="confirm-cancel-container">
                    <Button onClick={handleCloseModal} autoFocus>
                        Close
                    </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}