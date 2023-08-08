import React,{useContext} from 'react'
import './Rightbar.scss'
import UserContext from '../../Context/UserContext'


const Rightbar = () => {
  const user= useContext(UserContext);
  // console.log(user)
  return (
    <div className='rightbar-main'>
      <div className="rightbar-con">
          <h3>Calender</h3>
        <div className="rightbar-sec">
          {user.user.tasksArray.map((tasksbig)=>{
            return (
              <>
                <p className='rightbar-date' key={tasksbig.Date}>{tasksbig.Date}</p>
                {tasksbig.Tasks.map((task)=>{
                  // console.log(task.TaskId)
                  return(
                    task &&
                    <RightbarCard task={task} key={task.TaskId}/>
                    )
                  })}
              </>
              )
          })}
        </div>
      </div>
    </div>
  )
}


const RightbarCard =(props)=>{
  return (
    <div className="rightbar-card">
      <div className="rightbar-card-left">
        <h3>10:00</h3>
        </div>
          <div className="rightbar-card-right">
            <div className="rightbar-card-line"></div>
            <p>{props.task.Heading}</p>
            <h4>{props.task.Objective.split(" ").length>4 ? `${props.task.Objective.split(" ").slice(0,4)}...`:props.task.Objective}</h4>
        </div>
      </div>
  )
}
export default Rightbar