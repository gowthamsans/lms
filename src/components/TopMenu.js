import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { MenuItem } from '@material-ui/core';
import Auth from '../Auth';

const drawerWidth = 240;
const auth = new Auth();




const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "gray"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



function TopMenu() {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <MenuItem>
          <Typography variant='h6' className={classes.title}>
            Home
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant='h6' className={classes.title}>
            About
          </Typography>
        </MenuItem>

        <MenuItem className="signOut" >
          {/* <Typography variant='h6' className={classes.title}>
            About
          </Typography> */}
          <a 
            className="App-link" 
            href="/abc" onClick={() => auth.logout()}
          >
            Sign Out
          </a> 
        </MenuItem>


        
      </Toolbar>
    </AppBar>
  );
}

export default TopMenu;
