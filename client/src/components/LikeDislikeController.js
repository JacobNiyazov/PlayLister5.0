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
        <AppBar sx={{ bgcolor: 'rgb(131, 173, 201)', borderRadius: "5rem", width: '70%'}} position="static">
          <Toolbar>
            <Button style={{ minWidth: '0', minHeight: '0', color: '#ffffff'}}>
                <ThumbUpOffAltIcon style={{fontSize:'16pt'}}/>
            </Button>
            <Typography variant= 'h6'>10</Typography>
            <Button style={{ minWidth: '0', minHeight: '0', color: '#ffffff'}}>
                    <ThumbDownOffAltIcon style={{fontSize:'16pt'}}/>
            </Button>
            <Typography variant= 'h6'>50</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default LikeDislikeController;