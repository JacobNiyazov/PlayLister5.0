import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import { Typography } from '@mui/material'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    let text ="";

    function handleCreateNewList() {
        store.createNewList();
        // store.loadIdNamePairs();
    }

    if ((store.currentPage == store.CurrentPageType.PLAYLISTS || store.currentPage == store.CurrentPageType.USERS) && store.currentList){
        return (
            <div id="playlister-statusbar">
                <Typography variant="h5">{store.currentList}</Typography>
            </div>
        );
    }
    else if(auth.loggedIn && store.currentPage == store.CurrentPageType.HOME){
        return (
            <div id="playlister-statusbar">
                <Fab size="small"
                    style={{backgroundColor: '#ffffff', color: '#1976d2'}}
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                <Typography sx={{m:'0.75rem'}}variant="h4">Your Lists</Typography>
            </div>
        );
    }
    else{
        return (
            <div id="playlister-statusbar">
                <Typography variant="h5">Developed By Jacob Niyazov</Typography>
            </div>
        );
    }
}

export default Statusbar;