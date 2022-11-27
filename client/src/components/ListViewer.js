import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListPlayer from './ListPlayer'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel';
import PropTypes from 'prop-types';
import { List } from '@mui/material'
import CommentCard from './CommentCard'
import CommentViewer from './CommentViewer'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListViewer = () => {
    const { store } = useContext(GlobalStoreContext);
    const [tabValue, setTabValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
      setTabValue(newValue);
    }
    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    let player = <ListPlayer />
    let commenter = <CommentViewer />;
    
    return (
      <Grid>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleChangeTab} TabIndicatorProps={{style: {backgroundColor: "white"}}}>
                  <Tab style={{ color: '#ffffff', fontFamily:'arial' }} label="Player" {...a11yProps(0)}/>
                  <Tab style={{ color: '#ffffff', fontFamily:'arial' }} label="Comments" {...a11yProps(1)}/>
              </Tabs>
          </Box>
          {tabValue === 0 && player}
          {tabValue === 1 && commenter}
      </Grid>
      )
}

export default ListViewer;