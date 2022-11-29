import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import "./Cardsm.css"
// import TimeAgo from 'javascript-time-ago'
import axios from "axios";
// import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from 'react-time-ago'
const Cardsm = ({video}) => {
  const [channel,setChannel]=useState({})

  useEffect(()=>{
    const fetchchannel = async()=>{
      const res = await axios.get(`/user/find/${video.userId}`)

      setChannel(res.data);  
    }
    
    fetchchannel();
  },[video.userId])
  return (
    <Link to="/video/text" style={{textDecoration:"none"}}>
    <div className='cardsm_cont'>
        <img className='cardsm_img' type="" src={video.imgUrl}  alt="..."/>
        <div className='detailssm'>
        
                <img className='channelImgsm'src={channel.img} alt='...'/>
            
            <div className='texts'>
                <div className='card_title'>{video.title}</div>
                <div className='card_channelname'>{channel.name}</div>
                <div className='card_info'>{video.views} views • <ReactTimeAgo date={Date.parse(video.createdAt)} locale="en-US"/></div>
            </div>
        </div>
      
    </div>
    </Link>
  )
}

export default Cardsm
