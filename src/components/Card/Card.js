import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import "./Card.css"
import TimeAgo from 'javascript-time-ago'
import axios from "axios";
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import ReactTimeAgo from 'react-time-ago'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
// const timeAgo = new TimeAgo('en-US')
const Card = ({video}) => {
  const [channel,setChannel]=useState({})

  useEffect(()=>{
    const fetchchannel = async()=>{
      const res = await axios.get(`/user/find/${video.userId}`)

      setChannel(res.data);  
    }
    
    fetchchannel();
  },[video.userId])

  const handleview = async() =>{
    await axios.put(`/video/view/${video._id}`)
  }

  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
    <div className='card_cont' onClick={handleview}>
        <img className='card_img' type="" src={video.imgUrl} alt="..."/>
        <div className='card_details'>
        
                <img className='card_channelImg'src={channel.img} alt='...'/>
            
            <div className='card_texts'>
                <div className='card_title'>{video.title}</div>
                <div className='card_channelname'>{channel.name}</div>
                <div className='card_info'>{video.views} views • <ReactTimeAgo date={Date.parse(video.createdAt)} locale="en-US"/></div>
            </div>
        </div>
      
    </div>
    </Link>
  )
}

export default Card
