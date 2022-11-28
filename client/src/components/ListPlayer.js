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
import YouTubePlayer from './YouTubePlayer'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListPlayer = () => {
    const { store } = useContext(GlobalStoreContext);
    let [pauseOrPlay, setPauseOrPlay] = useState("play");

    let songNum = "";
    let listName = "";
    let songTitle = "";
    let songArtist = "";
    if(store.currentPlayingList && store.currentSongIndex < store.currentPlayingList.songs.length){
      songNum = store.currentSongIndex+1;
      listName = store.currentPlayingList.name;
      songTitle = store.currentPlayingList.songs[store.currentSongIndex].title;
      songArtist = store.currentPlayingList.songs[store.currentSongIndex].artist;
    }

    return (
      <Grid>
          <Box sx={{mx: '1rem', mb: '0.5rem', height: '23rem', width: '40rem', border: 5, borderColor: 'black' }}>
            {store.currentPlayingList && (store.currentSongIndex < store.currentPlayingList.songs.length) && 
              <YouTubePlayer 
              songNum={songNum}
              songTitle={songTitle}
              songArtist={songArtist}
              pauseOrPlay={pauseOrPlay} />}
          </Box>
          <Typography variant='h5'>PlayList: {listName}</Typography>
          <Typography variant='h5'>Song #{songNum}</Typography>
          <Typography variant='h5'>Title: {songTitle}</Typography>
          <Typography variant='h5'>Artist: {songArtist}</Typography>
          <ListPlayerController setPauseOrPlay={setPauseOrPlay} />
      </Grid>
      )
}

export default ListPlayer;