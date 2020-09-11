import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import CompanyRoute from './CompanyRoute';
import GeckoRoute from './GeckoRoute';
import LoginRoute from './LoginRoute';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function routes(): JSX.Element {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            <Button color="inherit" component={Link} to="/company">
              Company
            </Button>
            <Button color="inherit" component={Link} to="/gecko">
              Gecko
            </Button>
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/company">
          <CompanyRoute />
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/gecko">
          <GeckoRoute />
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/login">
          <LoginRoute />
        </Route>
      </Switch>
    </>
  );
}

export { CompanyRoute, GeckoRoute, LoginRoute };
