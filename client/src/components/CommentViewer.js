import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

import ListPlayer from './ListPlayer'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel';
import PropTypes from 'prop-types';
import { List } from '@mui/material'
import CommentCard from './CommentCard'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const CommentViewer = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [text, setText] = useState("");

    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if(text != ""){
                store.addComment(text);
            }
        }
    }

    let commenter = "";
    if(store.currentPlayingList){
      commenter =
                <List>
                {
                  store.currentPlayingList.comments.map((item) => (
                    <CommentCard key={item._id} author={item.author} comment={item.comment}/>
                  ))
                }
              </List>
    }
    
    let isGuest = auth.userType == 'guest';
    console.log(isGuest)
    return (
      <Grid container>
          <Grid item xl={12} maxHeight={'30rem'} style={{ minWidth: '40rem', minHeight:'30rem' }} sx={{ overflowY: "scroll" }}>
            {
              commenter
            }
          </Grid>
          <Grid item xl={12}>
              <TextField sx={{ width:'35%', 
                        position: 'fixed', 
                        mt: '2%', 
                        mx:'2.5%', 
                        bgcolor: '#ffffff'}} 
                        disabled={isGuest}
                        id="filled-basic" 
                        label="Post Comment" 
                        variant="filled" 
                        onKeyPress={handleKeyPress} 
                        onChange={handleUpdateText}/>
            </Grid>
      </Grid>
    )
}

export default CommentViewer;