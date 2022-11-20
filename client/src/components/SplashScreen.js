import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import logoIMG from '../PlaylisterLogo.png'

export default function SplashScreen() {
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
                <Button sx={{m:'0.5rem'}} variant="contained">Login</Button>
                <Button sx={{m:'0.5rem'}} variant="contained">Create Account</Button>
                <Button sx={{m:'0.5rem'}} variant="contained">Continue As Guest</Button>
            </div>
        </Grid>
    )
}