import { useContext } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ListPlayer from './ListPlayer';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


function LikeDislikeController(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    
    const { likes, dislikes, handleLike, handleDislike, list } = props;

    let likeIcon = <ThumbUpOffAltIcon style={{fontSize:'16pt'}}/>;
    let isLiked = [];
    if(auth.user){
      isLiked = list.reactions.filter(r => r.username == auth.user.username && r.reaction == 'like');
    }
    if(isLiked.length){
      likeIcon = <ThumbUpIcon style={{fontSize:'16pt'}}/>;
    }
    let dislikeIcon = <ThumbDownOffAltIcon style={{fontSize:'16pt'}}/>
    let isDislike = [];
    if(auth.user){
      isDislike = list.reactions.filter(r => r.username == auth.user.username && r.reaction == 'dislike');
    }
    if(isDislike.length){
      dislikeIcon = <ThumbDownIcon style={{fontSize:'16pt'}}/>;
    }
    return (
      <Box m="auto">
        <AppBar sx={{ bgcolor: 'rgb(131, 173, 201)', borderRadius: "5rem", width: '70%', opacity:'80%'}} position="static">
          <Toolbar>
            <Button style={{ minWidth: '0', minHeight: '0', color: '#ffffff'}} onClick={handleLike} >
                {likeIcon}
            </Button>
            <Typography variant= 'h6'>{likes}</Typography>
            <Button style={{ minWidth: '0', minHeight: '0', color: '#ffffff'}} onClick={handleDislike} >
                    {dislikeIcon}
            </Button>
            <Typography variant= 'h6'>{dislikes}</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default LikeDislikeController;