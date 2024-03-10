import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Headers/Header'
import Game from './components/GameComponent/Game'
import Board from './components/LeaderBoard/Board'
import SignInModal from './components/AuthModal/SignInModal'


function App() {
  const [count, setCount] = useState(0)
  const[menuActive, setMenuActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [username, setUsername] = useState("")
  useEffect(() =>{
    const usernameFromLocalStorage = localStorage.getItem("username");
    if(usernameFromLocalStorage) {
      setUsername(usernameFromLocalStorage)
      setIsModalOpen(false)
    }
  })

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClose = (e)=>{
      e.preventDefault();
      setMenuActive(false)
  }
  const handleOpen = (e)=>{
      e.preventDefault();
      setMenuActive(true)
  }

  return (
    <div>
      <SignInModal isOpen={isModalOpen} onClose={closeModal} />
      <Header menuActive={menuActive} handleClose={handleClose} handleOpen={handleOpen} />
      <div className='container'>
        <Game username={username} />
        <Board menuActive={menuActive} username={username} />
      </div>
    </div>
  )
}

export default App
