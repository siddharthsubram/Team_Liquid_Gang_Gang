import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import team_liquid from '../../assets/Team_Liquid_2020.png';
import './Navbar.css';
import team_liquid_valorant from '../../assets/valorant_title.png'

export class Navbar extends React.Component {
  // const classes = useStyles();
  render() {
    return (
      <AppBar position="static" color="default" elevation={0} className='appBar'>
        <Toolbar className='{classes.toolbar}'>
          <img className='logo' src={team_liquid} alt="Team Liquid"/>
          <Typography variant="h6" color="inherit" noWrap className='{classes.toolbarTitle}'>
            <img src={team_liquid_valorant} style={{maxHeight: '100px', maxWidth: '500px'}}/>
            </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className='MapPick'>
              Map Pick
              </Link>
            <div class="dropdown">
              <button class="dropbtn" style={{color: 'white'}}>COMPARE TEAMS</button>
              <div class="dropdown-content">
                <a href="#">ASCENDING</a>
                <a href="#">DESCENDING</a>
              </div>
            </div>
            <div class="dropdown">
              <button class="dropbtn" style={{color: 'white'}}>PLAYERS</button>
              <div class="dropdown-content">
                <a href="#">Kryptix</a>
                <a href="#">ec1s</a>
                <a href="#">ScreaM</a>
                <a href="#">soulcas</a>
                <a href="#">L1NK</a>
                <a href="#">Sliggy</a>
              </div>
            </div>
          </nav>
        </Toolbar>
      </AppBar>
    );
  }
}
