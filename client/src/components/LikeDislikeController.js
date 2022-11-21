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
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


function LikeDislikeController() {
    const { store } = useContext(GlobalStoreContext);
    return (
      <Box m="auto">
        <AppBar sx={{ borderRadius: "5rem", width: '110%'}} position="static">
          <Toolbar>
            <Button style={{ color: '#ffffff'}}>
                <ThumbUpOffAltIcon style={{fontSize:'20pt'}}/>
            </Button>
            <Typography variant= 'h5' mr= '0.5rem'>12</Typography>
            <Button style={{color: '#ffffff'}}>
                    <ThumbDownOffAltIcon style={{fontSize:'20pt'}}/>
            </Button>
            <Typography variant= 'h5'>1</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default LikeDislikeController;