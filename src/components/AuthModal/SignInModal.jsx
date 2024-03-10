import React, { useState } from 'react'
import "./signInModel.css"
import axios from 'axios'
const SignInModal = ({isOpen, onClose}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = (e)=>{
        e.preventDefault();
        axios.post("https://gocats.onrender.com/user/login", {
            username, password
        }).then(res=>{
            setUsername("")
            setPassword("")
            localStorage.setItem("username", username)
            onClose()
        }).catch(err=>{
            console.log("Could not login:",err)
        })
    }
    if(!isOpen) return null;

    return (
    <div className='modal'>
        <div className='modal-content'>
            <h2>SignIn/SignUp</h2>
            <div className='input-div'>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Mohan'/>
            </div>
            <div className='input-div'>
                <label htmlFor="password">Password:</label>
                <input type="passowrd" value={password} onChange={(e)=>{setPassword(e.target.value)}} id='password'/>
            </div>
            <button onClick={onSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default SignInModal