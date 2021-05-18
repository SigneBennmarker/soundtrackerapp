import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import About from "../../About";
import Home from '../../Home';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
    paddingBottom: '0px',
    paddingTop: '40px',
    paddingLeft: '7vw',
    color: '#FFFFFF',
    alignContent: 'space-between',
  },
  navLinks: {
    padding: theme.spacing(2),
    textAlign: 'right',
    alignContent: 'space-between',
    color: '#FFFFFF',
    display: 'inline-block',
    textDecoration: 'none',
  },
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <>
      <BrowserRouter>

        <nav className={classes.root}>
          <Link to='/home' className={classes.navLinks}><p>Home</p></Link>
          <Link to='/about' className={classes.navLinks}><p>About</p></Link>
        </nav>

        <Switch>
          <Route path="/home"><Home /></Route>
          <Route path="/about"><About /></Route>
          <Route path="/"><Home /></Route>
          <Route path=""><Home /></Route>
        </Switch>

      </BrowserRouter>
    </>
  );
}