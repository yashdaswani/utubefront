import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import axios from "axios";
const Home = ({type}) => {
  const [video,setVideo]=useState([])

  useEffect(()=>{
    const fetchvideos = async()=>{
      const res = await axios.get(`/video/${type}`)
      setVideo(res.data)
    }
    fetchvideos();
  },[type])

  return (
    <div className='home_cont'>
      {video.map(video=>(

      <Card key={video._id} video={video}/>
      ))}
      

    </div>
  )
}

export default Home
