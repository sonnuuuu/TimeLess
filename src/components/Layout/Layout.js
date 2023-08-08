import React,{useContext} from 'react'
import './Layout.scss'
import {Outlet} from 'react-router-dom'
import Rightbar from '../Rightbar/Rightbar'
import Leftbar from '../Leftbar/Leftbar'
import Loader from '../Loader/Loader'
import UserContext from '../../Context/UserContext'

const Layout = () => {
  const user=useContext(UserContext)
  const {isdatafetched}=user
  return (<>
        {
          isdatafetched ?
          <div className='layout'>
              <Leftbar name={user.user.name} email={user.user.email}/>
              <Outlet/>
              <Rightbar/>
            </div>
            :
            <Loader/>
          }
  </>
  )
}

export default Layout