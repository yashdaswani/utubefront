import React, { useEffect, useState } from "react";
import "./Video.css"
import Comments from "../../components/Comments/Comments";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../../components/redux/videoSlice.js";
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru.json'
import ReactTimeAgo from 'react-time-ago'
import { subscription } from "../../components/redux/Userslice";
import Recommandation from "../../components/recommandation/Recommandation";

TimeAgo.addLocale(ru)
const Video = () => {
  const {currentUser} = useSelector((state)=>state.user);
  const {currentVideo} = useSelector((state)=>state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel,setChannel] = useState({})

  useEffect(()=>{
    const fetchdata = async()=>{
      try {
        const videores = await axios.get(`/video/find/${path}`)
        const channelres = await axios.get(`/user/find/${videores.data.userId}`)
        setChannel(channelres.data);
        dispatch(fetchSuccess(videores.data))
      } catch (error) {
        
      }
      }
      fetchdata();
  },[path,dispatch])
  const handleLike = async () => {
    await axios.put(`/user/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(`/user/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };
  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/user/unsub/${channel._id}`)
      : await axios.put(`/user/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  
  return (
    <div className="video_cont">
      <div className="video_content">
        <div className="video_wrapper">
        <iframe
            width="100%"
            height="720"
            src={currentVideo.videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="title">{currentVideo.title}</div>
          <div className="details">
            <div className="info"> {currentVideo.views} views • <ReactTimeAgo date={Date.parse(currentVideo.createdAt)} locale="en-US"/></div>
            <div className="video_classbutton">
                <button className="video_button" onClick={handleLike}>
                {currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
                  {currentVideo.likes?.length}
                 
                  </button>
                <button className="video_button" onClick={handleDislike}>
                {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownAltIcon />
              ) : (
                <ThumbDownOutlinedIcon />
              )}{" "}Dislike</button>
                <button className="video_button">
                  <ReplyIcon/>
                  Share</button>
                <button className="video_button">
                  <ContentCutIcon/>
                  Save</button>
                  </div>
          </div>
          <hr/>
          <div className="channel">
            <div className="channelinfo">
                <img className="card_channelImg" src={channel.img} alt=".."></img>
                <div className="channeldetail">
                <div className="channelnamevideo">{channel.name}</div>
                <div className="channelcounter">{channel.subscribers} subscribers</div>
                <div className="description">
                  {currentVideo.desc}
                </div>
            </div>
            </div>
            <div className="subscribe" onClick={handleSub}>{currentUser.subscribedUsers?.includes(channel._id)?"SUBSCRIBED":"SUBSCRIBE"}</div>
          </div>
          <hr/>
          <Comments videoId={currentVideo._id}/>
        </div>
      </div>
      <Recommandation tags={currentVideo.tags}/>
    </div>
  );
};

export default Video;
