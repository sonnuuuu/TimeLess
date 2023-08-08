import React from 'react'
import  './Leftbar.scss'
import {NavLink} from 'react-router-dom'
import {FaClock,FaHome,FaTasks} from "react-icons/fa"
import {AiOutlineSetting,AiTwotoneCalendar} from 'react-icons/ai'
import Cloud from '../../assets/images/Clouds.png'
const Leftbar = (props) => {
  return (
    <div className='leftbar-main'>
        <h1 style={{fontSize:"x-large"}}><span style={{color:"#70367c"}}>Time</span><span style={{color:"#fd7f51"}}>less</span></h1>
        <div className="user-details">
            <div className="user-image">
                <img src="https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?cs=srgb&dl=pexels-ali-pazani-2787341.jpg&fm=jpg" alt="UserImage" />
                <div className="user-time">
                <FaClock color='pink'/>
                <h6>28h</h6>
                </div>
            </div>
            <h3>Sonu Kumar</h3>
            <p>sonnuuuu3@gmail.com</p>
        </div>
        <div className="left-navbar">
            <nav>
                <div className="left-nav-item">
                    <NavLink to="/"><FaHome color='#000'/><p>Dashboard</p></NavLink>
                </div>
                <div className="left-nav-item">
                    <NavLink to="/calender"><AiTwotoneCalendar color='#000'/><p>Calender</p></NavLink>
                </div>
                <div className="left-nav-item">
                    <NavLink to="/tasks"><FaTasks color='#000'/><p>Tasks List</p></NavLink>
                </div>
                <div className="left-nav-item">
                    <NavLink to="/settings"><AiOutlineSetting color='#000'/><p>Setting</p></NavLink>
                </div>
            </nav>
        </div>
        <img src={Cloud} alt="Cloud" className='left-cloud'/>
    </div>
  )
}

export default Leftbar