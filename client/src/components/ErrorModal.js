import { useContext } from 'react'
import GlobalStoreContext from '../store';
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

export default function RegisterErrorModal() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    function handleCloseModal(event) {
        auth.closeRegisterErrorModal();
    }

    return (
        <Modal
            open={auth.registerError !== null}
        >
            <Box sx={style}>
                <div>
                <Alert severity="warning">{auth.registerError}</Alert>
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