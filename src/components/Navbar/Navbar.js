import React, { useState } from 'react'
import "./Navbar.css"
import {Link, useNavigate} from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Upload from '../Upload/Upload';
const Navbar = () => {
  const navigate = useNavigate()
  const {currentUser} = useSelector(state=>state.user)
  const [open,setOpen] = useState(false)
  const [q,setQ]=useState("")
  return (

    <>
    <div className='navbar_con'>
      <div className='navbar_wrap'>
         <div className='search'>
            <input placeholder="Search" onChange={(e)=>setQ(e.target.value)}/>
            <SearchIcon style={{cursor:"pointer"}} onClick={()=>navigate(`/search?q=${q}`)}/>
            
         </div>
         { currentUser ? (
          <div className='user'>
            <VideoCallIcon onClick={()=>setOpen(true)} style={{cursor:"pointer"}}/>
            <img className='userimg' src={currentUser.img} referrerPolicy="no-referrer" alt="...">
            </img>
              {currentUser.name}
          </div>
         ) : <Link to="/signin" style={{textDecoration:"none"}}>
         <button className='nav_button'>
            <AccountCircleIcon/>
            SIGN IN
         </button>
            </Link>}
      </div>
    </div>
    {open && <Upload setOpen={setOpen}/>}
           </>
  )
}

export default Navbar
