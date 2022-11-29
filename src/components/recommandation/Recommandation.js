import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cardsm from '../Card/Cardsm';
import "./Recommandation.css"
const Recommandation = ({tags}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
      const fetchVideos = async () => {
        const res = await axios.get(`/video/random`);
        console.log(res.data)
        setVideos(res.data);
      };
      fetchVideos();
    }, [tags]);
  return (
    <div className='rec_cont'>
       {videos.map((video) => (
        <Cardsm  key={video._id} video={video} />
      ))}
    </div>
  )
}

export default Recommandation
