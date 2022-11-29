import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Comment from '../Comment/Comment'
import "./Comments.css"
const Comments = ({videoId}) => {
  const {currentUser} = useSelector((state)=>state.user);
  const [comments,setComments]=useState([]);
  const [addComment,getAddcomment]= useState("");

  useEffect(()=>{

    const fetchComments = async() =>{
      try {
        const res = await axios.get(`/comments/${videoId}`)
        setComments(res.data)
        // console.log(res.data)
      } catch (error) {
        
      }
    }
    fetchComments();
  },[videoId])

  // useEffect(()=>{
  //   const handlecomment = async()=>{
  //     await  axios.post('/comments',{desc:addComment,videoId:videoId})
  //   }
  //   handlecomment();
  // },[])

  const handlecomment = async()=>{
    await  axios.post('/comments',{desc:addComment,videoId:videoId})
  }


  return (
    <div className='comments_cont'>
      <div className='newcomment'>
        <img className='avatar' src={currentUser.img} alt='...'/>
        <input className='Input' placeholder="Add a comment..." onChange={(e)=>getAddcomment(e.target.value)} />
        <button className="commentbtn" onClick={handlecomment}>Comment</button>
      </div>

      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
      
    </div>
  )
}

export default Comments
