import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListPlayer from './ListPlayer'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel';
import PropTypes from 'prop-types';

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
    const player = <ListPlayer />
    
    return (
      <Grid>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleChangeTab}>
                  <Tab label="Item One" {...a11yProps(0)}/>
                  <Tab label="Item Two" {...a11yProps(1)}/>
              </Tabs>
          </Box>
          {tabValue === 0 && player}
      </Grid>
      )
}

export default ListViewer;