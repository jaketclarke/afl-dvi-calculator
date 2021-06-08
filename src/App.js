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
    color: theme.palette.text.primary
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
  // maybe a string of string do Number(data.get(‘pickIn’)
  setPickIn(prev => [...prev, Number(data.get('pickIn'))])

}

const handleSubmitOut = (event) => {
  event.preventDefault()
  const data = new FormData(event.target)
  const pickIn = data.get(`pickOut`)
  // maybe a string of string do Number(data.get(‘pickIn’)
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

    
    return <>

    <div className={classes.root}>
      <Grid container spacing={3}>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <form className={classes.formcontrol} onSubmit={handleSubmitIn}>
              <InputLabel htmlFor="my-input" className={classes.inputlabel}>Draft Pick</InputLabel>
              <Input name='pickIn' id="pickInId" type='number' aria-describedby="pickIdIn-helper-text" className={classes.input} />
              <FormHelperText id="pickIdIn-helper-text" className={classes.formhelpertext}>Enter a draft pick</FormHelperText>
              <Button variant="contained" color="primary" type="submit">
                Add Another Draft Pick
              </Button>
              <br />
              <br />
              <Button variant="contained" color="secondary" type="submit">
                Done
              </Button>
            </form>
          </Paper>
        </Grid>
        
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        
      </Grid>
    </div>

      {/* <form onSubmit={handleSubmitIn}>
        <input name='pickIn' type='number' />
        <button>Add</button>
      </form> */}

      <form id = '2' onSubmit={handleSubmitOut}>
        <input name='pickOut' type='number' />
        <button>Add</button>
      </form>

      {pickIn.map((pick,index) => <p key={index}>{pick}</p>)}
      <p>Total Points In: {totalPointsIn}</p>

      {pickOut.map((pick,index) => <p key={index}>{pick}</p>)}
      <p>Total Points Out: {totalPointsOut}</p> 

    </>
  

}




// function App() {
  // const [data,setData]=useState([]);
  // const getData=()=>{
  //   fetch('./dvi.json'
  //   ,{
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   }
  //   )
  //     .then(function(response){
  //       console.log(response)
  //       return response.json();
  //     })
  //     .then(function(myJson) {
  //       console.log(myJson);
  //       setData(myJson)
  //     });
  // }
  // useEffect(()=>{
  //   getData()
  // },[])
//   return (
//     <div className="App">
//      {
//        data && data.length>0 && data.map((item)=><p>{item.points}</p>)
//      }
//     </div>
//   );
// }

export default App;