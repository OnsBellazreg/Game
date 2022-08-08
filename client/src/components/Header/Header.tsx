import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Box } from '@mui/material';
import { useAppSelector } from '../../app/hooks';


export default function Header() {

  const opponentName = useAppSelector(state => state.game.opponentName);

  return (
    <AppBar position="static" color='secondary'>
    <Toolbar variant="dense">
      <Avatar alt="Takeaway Logo" src="/src/assets/logo.svg"/>
      <Box sx={{ display: 'flex', flexDirection: 'column', color:"secondary.light", m:"8px 16px" }}>
      <Typography variant="subtitle1" display="block" >
        playing with {opponentName}
      </Typography>
      <Typography variant="subtitle2" display="block">
        Win the game or win the job
      </Typography>
      </Box>
     
    </Toolbar>
  </AppBar>
  );
}
