import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Comment.css"
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from 'react-time-ago'
const Comment = ({comment}) => {
  const [channel,setChannel]= useState([])
  useEffect(()=>{
    const fetchComment = async()=>{
      const res = await axios.get(`/user/find/${comment.userId}`)
      setChannel(res.data);
    }
    fetchComment();
  },[comment.userId])
  return (
    <div className='comment_cont '>
       <img className='avatar' src={channel.img} alt="..."/>
        <div className='details_comment'>
          <div className='user_details'>
            <div className='Name'>{channel.name}</div>
            <div className='Date'>• <ReactTimeAgo date={Date.parse(comment.createdAt)} locale="en-US"/></div>
            </div>
            <div className='text'>{comment.desc}</div>
        </div>
      
    </div>
  )
}

export default Comment
