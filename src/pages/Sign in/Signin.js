import React, { useState } from 'react'
import "./Signin.css"
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../components/redux/Userslice';
import {auth,provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogIn = async(e)=>{
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post("/auth/signin", { name, password });
      console.log(email);
      dispatch(loginSuccess(res.data))
    } catch (error) {
      dispatch(loginFailure())
    }
  }

  const signinWithgoogle = async()=>{
    dispatch(loginStart())
    signInWithPopup(auth,provider)
    .then((result)=>{
      axios.post("/auth/google",{
        name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL
      }).then((res)=>{
        dispatch(loginSuccess(res.data))
      })
    })
    .catch((error)=>{
      dispatch(loginFailure())
    })
  }

  return (
    <div className='signin_container'>
        <div className='signin_wrapper'>
            <div className='signin_title'>Sign in</div>
            <div className='signin_subtitle'>to continue to UTube</div>
            <input placeholder='username' className='signin_input' onChange={e=>setName(e.target.value)}/>
            <input placeholder="password"  className='signin_input' type="password"onChange={e=>setPassword(e.target.value)}/>
            <button className='signin_button ' onClick={handleLogIn}>Sign in</button>
            <div className='signin_title'>or</div>
            <button className='signin_button ' onClick={signinWithgoogle}>Sign in with Google</button>

            <div className='signin_title'>or</div>
            <input placeholder='username' className='signin_input'onChange={e=>setName(e.target.value)}/>
            <input placeholder='email' className='signin_input'onChange={e=>setEmail(e.target.value)}/>
            <input placeholder="password" type="password" className='signin_input'onChange={e=>setPassword(e.target.value)}/>
            <button className='signin_button' >Sign up</button>
        </div>
        <div className='more'>English(USA)</div>
      
    </div>
  )
}

export default Signin









