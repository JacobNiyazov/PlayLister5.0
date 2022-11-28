import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import StopIcon from '@mui/icons-material/Stop';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ListPlayer from './ListPlayer';

function ListPlayerController(props) {
    const { store } = useContext(GlobalStoreContext);
    let { setPauseOrPlay } = props;
    function handlePrev(){
      store.incCurrentSongIndex(-1);
    }
    function handleNext(){
      store.incCurrentSongIndex();
    }
    function handlePause(){
      setPauseOrPlay("pause");
    }
    function handlePlay(){
      setPauseOrPlay("play");
    }
    return (
      <Box m="auto" sx={{width: '50%'}}>
        <AppBar sx={{ borderRadius: "5rem", mx: '1rem', my: '0.5rem'}} position="static">
          <Toolbar>
            <Button 
                style={{backgroundColor: '#ffffff', color: '#1976d2', margin: '0.25rem'}}
                size='large'
                id='add-song-button'
                variant="contained"
                onClick={handlePrev}>
                <SkipPreviousIcon />
            </Button>
            <Button 
                style={{backgroundColor: '#ffffff', color: '#1976d2', margin: '0.25rem'}}
                size='large'
                id='undo-button'
                variant="contained"
                onClick={handlePause}>
                <StopIcon />
            </Button>
            <Button 
                style={{backgroundColor: '#ffffff', color: '#1976d2', margin: '0.25rem'}}
                size='large'
                id='redo-button'
                variant="contained"
                onClick={handlePlay}>
                    <PlayCircleIcon />
            </Button>
            <Button 
                style={{backgroundColor: '#ffffff', color: '#1976d2', margin: '0.25rem'}}
                size='large'
                id='close-button'
                variant="contained"
                onClick={handleNext}>
                    <SkipNextIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default ListPlayerController;