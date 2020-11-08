import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import team_liquid from '../../assets/Team_Liquid_2020.png';
import './Navbar.css';

export class Navbar extends React.Component {
  // const classes = useStyles();
  render() {
    return (
      <AppBar position="static" color="default" elevation={0} className='appBar'>
        <Toolbar className='{classes.toolbar}'>
          <img className='logo' src={team_liquid} alt="Team Liquid"/>
          <Typography variant="h6" color="inherit" noWrap className='{classes.toolbarTitle}'>
            Team Liquid VALORANT
            </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className='MapPick'>
              Map Pick
              </Link>
            <Link variant="button" color="textPrimary" href="#" className='CompareTeams'>
              Compare Teams
              </Link>
            <Link variant="button" color="textPrimary" href="#" className='Players'>
              Players
              </Link>
          </nav>
        </Toolbar>
      </AppBar>
    );
  }
}