import React,{useContext} from 'react'
import './Home.scss'
import { BsThreeDotsVertical,BsPencil } from 'react-icons/bs'
import { MdRadioButtonUnchecked,MdDeleteOutline,MdRadioButtonChecked } from 'react-icons/md'
import {TiTick} from 'react-icons/ti'
import UserContext from '../../Context/UserContext'
import shortid from 'shortid'
import Modal1 from '../Modals/Input Task Modal/Modal1'
const Dashboard = () => {

  const user=useContext(UserContext);
  const date= new Date();
  const day= date.toLocaleString('default',{dateStyle:"full"})
  const [isModal,setIsModal]= React.useState(false)

  const handleClick=()=>{
    setIsModal(prev=>!prev)
  }
  // eslint-disable-next-line
  const [Taskobj,setTaskObj]=React.useState({
    Date: "30/1/23",
        task: {
          Heading: "Meeting for TempleHub",
          Objective: "To make the UI of the Website",
          Time: "15.00 PM",
          tags: [{
            tagName: "Ahu ahu",
            color: "Green"
          },
          { tagName: "Important", color: "red" }],
          TaskId:""
        }
  })
  const id= shortid.generate()
  Taskobj.task.TaskId=id;
  return (<>
    {isModal && <Modal1 setIsModal={setIsModal}/>}
    <div className='dashboard-main'>
      <div className="dashboard-top">
        <div className="helloAndDate">
          <h3>Hello, Sonu Kumar</h3>
          <p>Today is {day}</p>
        </div>
        <button onClick={handleClick}>Add A New Project</button>
      </div>
      <div className="dashboard-cards">
        {user.user.tasksArray[0].Tasks.slice(0,3).map((task)=>{
          // console.log(task)
        return(
          <DashboardCards task={task} bgcolor="#70367c" key={task.TaskId}/>
        )
        })}
      </div>
      <div className="dashboard-bottom">
        <div className="bottom-left">
          <h2>
            Tasks For Today
          </h2>
            {user.user.tasksArray[0].Tasks.slice(0,3).map((task)=>{
            // console.log(task)
          return(
            <TasksCards task={task} key={task.TaskId}/>
          )
          })}
        </div>
        <div className="bottom-right">
          <h2>Statistics</h2>
          <div className="stats-cards">
            <div className="stats-card">
              <h3>28h</h3>
              <p>Tracked<br />time</p>
            </div>
            <div className="stats-card">
              <h3>28h</h3>
              <p>Tracked<br />time</p>
            </div>
            <div className="stats-card">
              <h3>28h</h3>
              <p>Tracked<br />time</p>
            </div>
            <div className="stats-card">
              <h3>28h</h3>
              <p>Tracked<br />time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

const DashboardCards = (props) => {
  const [sidemodal,setSideModal]=React.useState(false)
  const handleSideModal=()=>{
    setSideModal(!sidemodal)
    console.log(sidemodal)
  }
  return (
    <div className="dashboard-card" style={{ background: `${props.bgcolor}` }}>
      <div className="card-con">
        <div className="card-top-sec">
          <h4>{props.task.Heading.split(" ")[0]}<br/>{props.task.Heading.split(" ")[1]}</h4>
          <div className={` w-[auto] ${sidemodal && "z-[3]"}`}>
            <BsThreeDotsVertical color='#fff' cursor={"pointer"} onClick={handleSideModal}/>
            { 
              sidemodal &&
              <>
                <div className={`buttonmodal absolute w-max h-max flex-col gap-4 bg-gray-100 flex rounded-md p-4  ${sidemodal && "z-[2]"}`}>
                  <div className='flex items-center justify-start'>
                    <BsPencil/>
                    <p className='font-semibold'>Edit</p>
                  </div>
                  <div className='flex items-center justify-start'>
                    <MdDeleteOutline color='red'/>
                    <p className='font-semibold'>Delete</p>
                  </div>
                  <div className='flex items-center justify-start'>
                    <TiTick color='green'/>
                    <p className='font-semibold'>Mark as done</p>
                  </div>
                </div>
                <div className="blurother z-[1] w-[100vw] h-[100vh] fixed top-0 left-0 backdrop-blur-md" onClick={handleSideModal}></div>
              </>
            }
          </div>
        </div>
        <div className="card-progress">
          <p>10 Tasks | 96%</p>
          <div className="progressout">
            <div className="progressin"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TasksCards = (props) => {
  const [isClicked,setIsClicked]= React.useState(false)
  // console.log(props)
  return (
    <div className="tasks-card">
      <div className="task-con">
        <div className="TaskCardRadioButton" onClick={()=>{
          setIsClicked(!isClicked);
        }}>
        {
          isClicked?<MdRadioButtonChecked className='radioo'/>:
          <MdRadioButtonUnchecked className='radioo'/>
        }
        </div>
        <div className="linee"></div>
        <h5>{props.task.Heading}</h5>
        <p>{props.task.Objective}</p>
      </div>
    </div>
  )
}
export default Dashboard