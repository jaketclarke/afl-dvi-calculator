import React,{useState,useEffect} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


// work out how to use these!
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
    color: theme.palette.text.primary,
    textAlign: 'center'
  },
  cardroot: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  appbarroot: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbartitle: {
    flexGrow: 1,
  }
}));

const App = () => {
const [pickIn, setPickIn] = React.useState([])
const [pickOut, setPickOut] = React.useState([])
const data = require('./dvi.json')
const classes = useStyles();

const handleSubmitIn = (event) => {
  event.preventDefault()
  const data = new FormData(event.target)
  const pickIn = data.get(`pickIn`)
  setPickIn(prev => [...prev, Number(data.get('pickIn'))])
}

const handleSubmitOut = (event) => {
  event.preventDefault()
  const data = new FormData(event.target)
  const pickOut = data.get(`pickOut`)
  setPickOut(prev => [...prev, Number(data.get('pickOut'))])
}

  const totalPointsIn = pickIn.reduce((acc,cur) => {
    const points = data.find(pick => pick.pick === cur).points
    return acc + points 
    },0)

  const totalPointsOut = pickOut.reduce((acc,cur) => {
    const points = data.find(pick => pick.pick === cur).points
    return acc + points 
    },0)
  
  const diffIn = totalPointsIn - totalPointsOut
  const diffOut = totalPointsOut - totalPointsIn

  const closestIn = data.find(spot => spot.points <= diffIn).pick


  return <>
  <div className={classes.appbarroot}>
    <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.appbartitle}>
            AFL Draft Value Index Trade Comparison Tool
          </Typography>
          {/* make this a github button */}
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>

    <div className={classes.root}>
      {/* ToDo implement order https://codesandbox.io/s/xvv7o07614 */}
      <Grid container spacing={3}>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <form className={classes.formcontrol} onSubmit={handleSubmitIn}>
              <InputLabel htmlFor="my-input" className={classes.inputlabel}>Draft Pick In</InputLabel>
              <Input name='pickIn' id="pickInId" type='number' aria-describedby="pickIdIn-helper-text" className={classes.input} />
              <FormHelperText id="pickIdIn-helper-text" className={classes.formhelpertext}>Enter a draft pick</FormHelperText>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
              {/* <br />
              <Button variant="contained" color="secondary" type="submit" paddingTop='10px'>
                Done
              </Button> */}
            </form>
          </Paper>
        </Grid>
        
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <form className={classes.formcontrol} onSubmit={handleSubmitOut}>
              <InputLabel htmlFor="my-input2" className={classes.inputlabel}>Draft Pick Out</InputLabel>
              <Input name='pickOut' id="pickInOut" type='number' aria-describedby="pickIdOut-helper-text" className={classes.input} />
              <FormHelperText id="pickIdOut-helper-text" className={classes.formhelpertext}>Enter a draft pick</FormHelperText>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
              {/* <br />
              <br />
              <Button variant="contained" color="secondary" type="submit">
                Done
              </Button> */}
            </form>
          </Paper>
        </Grid>

        <Grid item xs={6}>
        <Card className={classes.cardroot}>
          <CardContent>
            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
              Draft Picks In
            </Typography> */}
            <Typography variant="h5" component="h5">
              Team A
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              Picks Will Go Here ✔✔
            </Typography>
            {/* {pickIn.map((pick,index) => <p key={index}>{pick}</p>)} */}
            {pickIn.map((pick,index) => <Typography key={index}>Pick: {pick}</Typography>)}
            <Typography>
              Total Points In: {totalPointsIn}
            </Typography>
            <Typography>
              Difference: {diffIn}
            </Typography>
            <Typography>
              Equivalent Pick In: {closestIn}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
        </Grid>

        <Grid item xs={6}>
        <Card className={classes.cardroot}>
          <CardContent>
            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
              Draft Picks In
            </Typography> */}
            <Typography variant="h5" component="h5">
              Team B
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              Picks Will Go Here ✔✔
            </Typography>
            {/* {pickIn.map((pick,index) => <p key={index}>{pick}</p>)} */}
            {pickOut.map((pick,index) => <Typography key={index}>Pick: {pick}</Typography>)}
            <Typography>
              Total Points Out: {totalPointsOut}
            </Typography>
            <Typography>
              Difference: {diffOut}
            </Typography>
            <Typography>
              Equivalent: Pick Equivalent Will Go Here ✔✔
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
        </Grid>
      </Grid>
    </div>

    </>
  

}




export default App;