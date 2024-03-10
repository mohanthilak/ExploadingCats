import React, { useEffect, useState } from 'react'
import Card from '../Cards/Card'
import "./game.css"
import axios from 'axios'
const Game = ({username}) => {
  // const [game,setGame] = useState()
  const [cards, setCards] = useState([])
  const [deffusers, setDefussers] = useState(0)
  const [cardIcon, setCardIcons] = useState({shuffle: '🔀', cat: '😺', exploding: '💣', defuse: '🙅‍♂️'})
  const [gameOn, setGameOn] = useState(true)
  const [gameStatus, setGameStatus] = useState("")
  useEffect(()=>{
    handleStartGame()
  }, [username])

  const handleDraw = (e) =>{
    e.preventDefault();
    if(!username) return;
    setGameStatus("")
    axios.get(`http://localhost:8000/game/draw-card/${username}`).then(res=>{
    console.log(res.data)
    if(res.data.status != "playing"){
      setGameOn(false)
      setGameStatus(res.data.status)
    }
    if(res.data.cards){
      const arr = res.data.cards.reverse()
      setCards([...arr])
      setDefussers(res.data.diffuser)
    }
    }).catch(err=> console.log("error while draw a card:", err))
  }

  function handleStartGame () {
    setGameStatus("")
    setGameOn(true)
    if(!username) return;
    axios.get(`http://localhost:8000/game/start/${username}`).then(res=>{
      if(res.data.status != "winner"){
        const arr = res.data.cards.reverse()
      setCards([...arr])
        console.log(res.data)
        setDefussers(res.data.diffuser)
      }
    }).catch(err => console.log(err))
  }

  // if(!username) return null;
  
  return (
    <div className='game-container'>
        {/* Card-Container */}

        <div className='cards-container' style={{left: gameStatus != "" ? "85px" : "90px"}}>
            {cards?.length>0 && cards.map((el, i)=>(
              <Card key={i} emoji={cardIcon[el.cardType]} text={el.cardType} />
              ))}
              {/* <Card />
              <Card />
              <Card />
            <Card /> */}
        </div>
              <div className='game-status-div'>
                <h1>{gameStatus}</h1>
              </div>
            
        {/* Button */}
        <div className='button-div' style={{position:"relative",left: gameStatus == "winner" ? "-60px" : gameStatus == "lost" ? "-50px": "0px"}}>
          <button onClick={gameOn ? handleDraw : (e)=>{e.preventDefault(); handleStartGame()}}>{gameOn ? "Draw" : "Star Game"}</button>
        </div>
    </div>
  )
}

export default Game