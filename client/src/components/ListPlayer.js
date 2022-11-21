import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel';
import PropTypes from 'prop-types';
import ListPlayerController from './ListPlayerControls'
import { Typography } from '@mui/material'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListPlayer = () => {
    const { store } = useContext(GlobalStoreContext);
    
    return (
      <Grid>
          <Box sx={{mx: '1rem', mb: '0.5rem', height: '23rem', width: '40rem', border: 1, borderColor: 'black' }}>
            Hello
          </Box>
          <Typography variant='h5'>PlayList: </Typography>
          <Typography variant='h5'>Song # </Typography>
          <Typography variant='h5'>Title: </Typography>
          <Typography variant='h5'>Artist: </Typography>
          <ListPlayerController />
      </Grid>
      )
}

export default ListPlayer;