import React from 'react'
import "./Menu.css"
import {Link} from "react-router-dom"
import logo from "../../images/logo.png"
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import { useSelector } from 'react-redux';
const Menu = () => {
    const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='menu'>
      <div className='menu_wrapper'>
        <Link to ="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className='menu_logo'>
            <img src={logo} alt='...'></img>
            UTube
        </div>
        </Link>
        <Link to= "/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className='menu_item'>
            <HomeIcon/>
            Home
        </div>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
        <div className='menu_item'>
            <ExploreIcon/>
            Explore
        </div>
        </Link>
        <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
        <div className='menu_item'>
            <SubscriptionsIcon/>
            Subscriptions
        </div>
        </Link>
        <hr/>
        <div className='menu_item'>
            <VideoLibraryIcon/>
            Library
        </div>
        <div className='menu_item'>
            <HistoryIcon/>
            History
        </div>
        <hr/>
        {!currentUser && <div className='login_menu'>
        Sign in to like videos, comment, and subscribe.
        <Link to="/signin" style={{textDecoration:"none"}}>
        <button className='menu_button'>
            <AccountCircleIcon/>
            Sign in
        </button>
        </Link>
        <hr/>
        </div>}
        <div className='title'>BEST OF UTUBE</div>
        <Link to="/" style={{textDecoration:"none", color: "inherit" }}>
        <div className='menu_item'>
            <LibraryMusicIcon/>
            Music
        </div>
        </Link>
        <div className='menu_item'>
            <SportsBaseballIcon/>
            Sports
        </div>
        <div className='menu_item'>
            <SportsEsportsIcon/>
            Gaming
        </div>
        
        <div className='menu_item'>
            <MovieCreationIcon/>
            Movies
        </div>
        <div className='menu_item'>
            <NewspaperIcon/>
            News
        </div>
        <div className='menu_item'>
            <LiveTvIcon/>
            Live
        </div>
        <hr/>
        <div className='menu_item'>
            <SettingsIcon/>
            Settings
        </div>
        <div className='menu_item'>
            <ReportIcon/>
            Report
        </div>
        <div className='menu_item'>
            <HelpOutlineIcon/>
            Help
        </div>
        <div className='menu_item'>
            <FeedbackOutlinedIcon/>
            Send Feedback
        </div>
      </div>
    </div>
  )
}

export default Menu
