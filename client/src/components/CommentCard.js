import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Typography } from '@mui/material';

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { author, comment } = props;
    function handleProfileSearch (event) {
        event.stopPropagation();
        store.searchByUser(author);
    }
    return (
        <Box className='list-card unselected-list-card'>
            <Typography variant='h6'><span onClick={handleProfileSearch} style={{color: '#cc6699', fontWeight:'bold', fontSize: '14pt'}}>{author}</span></Typography>
            <Typography variant='body1'>{comment}</Typography>
        </Box>
    );
}

export default CommentCard;