import React,{useState,useEffect} from 'react';
import './App.css';

const App = () => {
const [pickIn, setPickIn] = React.useState([])
const [pickOut, setPickOut] = React.useState([])
const dataJson = require('./dvi.json')
// const data = JSON.parse(dataJson)
const data = dataJson

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
      <form onSubmit={handleSubmitIn}>
        <input name='pickIn' type='number' />
        <button>Add</button>
      </form>

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