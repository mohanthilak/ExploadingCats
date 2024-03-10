import React, { useEffect, useState } from 'react'
import "./board.css"
import axios from 'axios';
const Board = ({menuActive, username}) => {
  const [showBoard, setShowBoard] = useState(true);
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([])
  useEffect(()=>{
    axios.get('https://gocats.onrender.com/game/leader-board').then(res=>{
      console.log(res.data)
      if(res.data?.length>0){
        setPlayers([...res.data])
      }
    })  
  }, [])
  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 1000){
        setShowBoard(true)
      }else setShowBoard(menuActive)
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    useEffect(() => {
      console.log("{{{{{{{{{{{{{{{{{{{{{[[", username)
      if(!username) return
      console.log("}}}}}}}}}}}}}}}}}}}}}}}")
        // Initialize WebSocket connection
        // https://gocats.onrender.com/
        const ws = new WebSocket(`wss://gocats.onrender.com/ws/${username}`)
                // const ws = new WebSocketClient();

        // Handle WebSocket events
        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            console.log('Message received:', event.data);
            // Handle incoming messages
            const data = JSON.parse(event.data) 
            console.log("\n\nddata:", data)
            if(data?.type == "leaderBoard"){
              console.log("+++++++++")
              setPlayers([...data.payload])
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup function
        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };

    }, [username]);

  useEffect(()=>{
    if(window.innerWidth<1001){
      setShowBoard(menuActive)
    }
  }, [menuActive])
  return (
    <div className='board-container' style={{display: showBoard ? "block": "none"}}>
      <div className='board'>
        <div className='board-title'>
            <h1>Leader Board</h1>
        </div>
        <div className='board-list'>
            <ul className='board-list-ul'>
                {players?.length > 0 && players.map((el, i)=>(
                  <li key={i} className='board-player'>
                    <h4><span>{i+1}. {el.username}</span><span>{el.points}</span></h4>
                  </li>
                ))}
                
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Board