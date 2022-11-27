import { useContext, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import logoIMG from '../PlaylisterLogo.png'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'


export default function SplashScreen() {
    const { auth } = useContext(AuthContext); 
    const { store } = useContext(GlobalStoreContext);
    const guestHandler = (event) => {
        auth.setGuestUser();
        store.updateCurrentPage(store.CurrentPageType.PLAYLISTS);
    };

    // useEffect(() => {
    //     store.getAllPublishedPlaylists();
    // }, []);
    return (
        <Grid sx={{height: '100%'}}>
            <div id="splash-screen" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <CardMedia sx={{height: '15rem', width: '36rem'}} image={logoIMG} />
                <Typography sx={{m:'1rem', mb:'0rem'}} variant='h2'>
                    Welcome To Playlister!
                </Typography>
                <Typography sx={{m:'1rem', mb:'1.5rem'}} variant='h4'>
                    Get started creating, publishing, and viewing playlists today.
                </Typography>
                <Button sx={{m:'0.5rem'}} variant="contained" href='login'>Login</Button>
                <Button sx={{m:'0.5rem'}} variant="contained" href='register'>Create Account</Button>
                <Button sx={{m:'0.5rem'}} variant="contained" onClick={guestHandler}>Continue As Guest</Button>
            </div>
        </Grid>
    )
}