import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {  FaGithub } from "react-icons/fa";
import ReactGA from 'react-ga';

const { GOOGLE_ANALYTICS_MEASUREMENT_ID } = process.env;

ReactGA.initialize(GOOGLE_ANALYTICS_MEASUREMENT_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

// work out how to use these!
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(.5),
    // textAlign: 'center',
    color: theme.palette.text.primary,
  },
  formcontrol: {
    color: theme.palette.text.primary
  },
  inputlabel: {
    color: theme.palette.text.primary
  },
  input: {
    color: theme.palette.text.primary
  },
  formhelpertext: {
    color: theme.palette.text.primary
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  appbarroot: {
    flexGrow: 1,
  },
  githubButton: {
    marginRight: theme.spacing(2),
    color: 'secondary'
  },
  appbartitle: {
    flexGrow: 1,
  },
  teamOneControl: {
    order:1,
  },
  teamTwoControl: {
    order:4,
    [theme.breakpoints.down("md")]: {
      order: 2
    },
    [theme.breakpoints.down("sm")]: {
      order: 2
    },
    [theme.breakpoints.down("xs")]: {
      order: 2
    }
  },
  teamOneTrades: {
    order:2,
    [theme.breakpoints.down("md")]: {
      order: 3
    },
    [theme.breakpoints.down("sm")]: {
      order: 3
    },
    [theme.breakpoints.down("xs")]: {
      order: 3
    },
  },
  teamTwoTrades: {
    order:5,
    [theme.breakpoints.down("md")]: {
      order: 4
    },
    [theme.breakpoints.down("sm")]: {
      order: 4
    },
    [theme.breakpoints.down("xs")]: {
      order: 4
    },
  },
  teamOneSummary: {
    order:3,
    [theme.breakpoints.down("md")]: {
      order: 5
    },
    [theme.breakpoints.down("sm")]: {
      order: 5
    },
    [theme.breakpoints.down("xs")]: {
      order: 5
    },
  },
  teamTwoSummary: {
    order:6,
  },
}));

const App = () => {
  const [pickIn, setPickIn] = React.useState([])
  const [pickOut, setPickOut] = React.useState([])
  const data = require('./dvi.json')
  const classes = useStyles();

  const handleSubmitIn = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    // const pickIn = data.get(`pickIn`)
    setPickIn(prev => [...prev, Number(data.get('pickIn'))])
  }

  const handleSubmitOut = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    // const pickOut = data.get(`pickOut`)
    setPickOut(prev => [...prev, Number(data.get('pickOut'))])
  }

  const totalPointsA = pickIn.reduce((acc,cur) => {
    const points = data.find(pick => pick.pick === cur).points
    return acc + points 
    },0)

  const totalPointsB = pickOut.reduce((acc,cur) => {
    const points = data.find(pick => pick.pick === cur).points
    return acc + points 
    },0)

  const diffA = totalPointsA - totalPointsB
  const diffB = totalPointsB - totalPointsA

  var closestA = 0

  // if diffA is positive, try to look it up, else error
  // if diffA is negative, look up the absolute value, else error
  if (diffA > 0) {
    try {
      closestA = data.find(spot => spot.points <= diffA).pick
    } catch (error) {
      console.log(error)
      closestA = '-1'
    }
  } else {
    try {
      closestA = data.find(spot => spot.points <= Math.abs(diffA)).pick
    } catch (error) {
      console.log(error)
      closestA = '-1'
    }
  }

  var closestB = 0

  if (diffB > 0) {
    try {
      closestB = data.find(spot => spot.points <= diffB).pick
    } catch (error) {
      console.log(error)
      closestB = '-1'
    }
  } else {
    try {
      closestB = data.find(spot => spot.points <= Math.abs(diffB)).pick
    } catch (error) {
      console.log(error)
      closestB = '-1'
    }
  }

  return <>
  <div className={classes.appbarroot}>
    <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.appbartitle}>
            AFL Draft Value Index Trade Comparison Tool
          </Typography>
          <IconButton
            color='inherit'
            onClick={event =>  window.location.href='https://github.com/jaketclarke/afl-dvi-calculator'}
          >
            <FaGithub  />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>

    <br />

    <div>
      <Typography>
        This tool is for helping understand the impact of complex pick swaps.
      </Typography>
      <Typography>
        Enter the picks two teams end up with in a deal to understand the impact of the pick swaps.
      </Typography>
    </div>
    <br />
    <div className={classes.root}>
      {/* ToDo implement order https://codesandbox.io/s/xvv7o07614 */}
      <Grid container spacing={3}>
        
        <Grid item lg={3} md={6} sm={6} xs={12} className = {classes.teamOneControl}>
          <Card>
            <CardContent>
              <form className={classes.formcontrol} onSubmit={handleSubmitIn}>
                  <InputLabel htmlFor="DraftPicksInA" className={classes.inputlabel}>
                    Team A
                  </InputLabel>
                  {/* Put in validation for pick > 73 */}
                  <Input
                    name='pickIn'
                    id="pickInId"
                    type='number'
                    aria-describedby="pickIdIn-helper-text"
                    className={classes.input}
                  />
                  <FormHelperText id="pickIdIn-helper-text" className={classes.formhelpertext}>
                    Enter a draft pick that ends up with Team A
                  </FormHelperText>
                  <Button variant="contained" color="primary" type="submit">
                    Add
                  </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12} className = {classes.teamOneTrades}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h5">
                Team A - Picks In
              </Typography>
              {/* make this a nice list! */}
              {/* {pickIn.map((pick,index) => <p key={index}>{pick}</p>)} */}
              {pickIn.map((pick,index) => <Typography key={index}>Pick: {pick}</Typography>)}
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={5} md={6} sm={6} xs={12} className = {classes.teamOneSummary}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h5">
                Team A - Summary
              </Typography>
              <Typography>
                Total Points In: {totalPointsA}
              </Typography>
              <Typography>
                Difference: {diffA}
              </Typography>
              <Typography>
                Equivalent Pick {diffA > 0 ? 'In' : 'Out'}: {closestA}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={6} sm={6} xs={12} className = {classes.teamTwoControl}>
          <Card>
            <CardContent>
              <form className={classes.formcontrol} onSubmit={handleSubmitOut}>
                <InputLabel htmlFor="my-input2" className={classes.inputlabel}>
                  Team B
                </InputLabel>
                <Input
                  name='pickOut'
                  id="pickInOut"
                  type='number'
                  aria-describedby="pickIdOut-helper-text"
                  className={classes.input}
                />
                <FormHelperText id="pickIdOut-helper-text" className={classes.formhelpertext}>
                  Enter a draft pick that ends up with Team B
                </FormHelperText>
                <Button variant="contained" color="primary" type="submit">
                  Add
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={6} sm={6} xs={12} className = {classes.teamTwoTrades}>
          <Card>
            <CardContent>
              {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                Draft Picks In
              </Typography> */}
              
              <Typography variant="h5" component="h5">
                Team B - Picks In
              </Typography>
              {/* {pickIn.map((pick,index) => <p key={index}>{pick}</p>)} */}
              {pickOut.map((pick,index) => <Typography key={index}>Pick: {pick}</Typography>)}
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={5} md={6} sm={6} xs={12} className = {classes.teamTwoSummary}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h5">
                Team B - Summary
              </Typography>
              <Typography>
                Total Points Out: {totalPointsB}
              </Typography>
              <Typography>
                Difference: {diffB}
              </Typography>
              <Typography>
                Equivalent Pick {diffB > 0 ? 'In' : 'Out'}: {closestB}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </div>

    </>
  

}

export default App;