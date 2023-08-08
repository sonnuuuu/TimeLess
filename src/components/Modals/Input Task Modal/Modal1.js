import React from 'react'
import "./Modal1.scss"

const Modal1 = (props) => {
    const [Taskobj, setTaskobj] = React.useState({
        Date: "30/1/23",
            task: {
              Heading: "TempleHub Meeting",
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

    const AddTask = async () => {
        const res = await fetch(
          "https://authking.onrender.com/user/addTask",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authToken":window.localStorage.getItem("authKey")
            },
            body: JSON.stringify(Taskobj),
          }
        );
    
        const finalres= await res.json()
        if(finalres.success)
        {
          window.location.reload();
        }
        // console.log(finalres)
      }
  
      function handleChange(event) {
        setTaskobj(prevFormData => {
          return {
            ...prevFormData,
            [event.target.name]: event.target.value
          }
        })
      }
      const handlechange2=(event)=>{
            event.preventDefault();
            setTaskobj((prev)=>{
                return{
                    ...prev,
                    task:{
                        ...prev.task,
                        [event.target.name]:event.target.value
                    }
                }
            })
      }
    return (
        <div className='modal_main h-[100vh] w-[100vw] text-black flex justify-center items-center absolute z-[10]'>
            <div className="outside h-[100vh] w-[100vw] absolute z-[9]" onClick={props.setIsModal(prev=>!prev)}></div>
            <div className="modalsection mt-10 relative z-10">
                <div className="modalrect h-[65vh] w-[23vw] bg-[rgba(255,255,255,1)] shadow-lg rounded-3xl border border-[rgba(0,0,0,0.1)] mb-4  p-8 flex flex-col items-center gap-5">
                    <div className="flex flex-col items-center justify-center w-[100%] gap-2">
                        <div className="head"><h3 className='font-bold text-xl'>Task Details</h3></div>
                        <div className="modalLine font-regular text-xs text-center"><p>Hey, Enter the details for the task you want to generate</p></div>
                    </div>
                    <form action='none' className="modalup w-[95%] flex flex-col gap-4">
                        <div className="modalfields flex flex-col gap-5 pt-3 w-[100%]">
                            <div className="email rounded-lg shadow-md outline outline-[0.1px] outline-[rgba(0,0,0,0.2)] flex items-center justify-around ">
                                <input type="text" name="Heading" className=' p-3 px-5 placeholder:text-xs text-xs focus:outline-none focus:border-none w-[80%] h-[100%] bg-transparent placeholder:text-center' placeholder='Enter the heading' onChange={handlechange2}/>
                            </div>
                            <div className="pass text-xs rounded-lg shadow-md outline outline-[0.1px] outline-[rgba(0,0,0,0.2)] flex items-center justify-around ">
                                <input name="Objective" className=' p-3 px-5 focus:outline-none focus:border-none placeholder:text-xs w-[80%] h-[100%] bg-transparent placeholder:text-center' placeholder='Objective' onChange={handlechange2}/>
                            </div>
                            <div className="pass text-xs rounded-lg shadow-md outline outline-[0.1px] outline-[rgba(0,0,0,0.2)] flex items-center justify-around ">
                                <input name="Date" pattern='[0-9][0-9]+/[0-9][0-9]+/[0-9][0-9]' className=' p-3 px-5 focus:outline-none focus:border-none placeholder:text-xs w-[100%] h-[100%] bg-transparent placeholder:text-center text-center' title='The date should be of the pattern DD/MM/YY' placeholder='Date' onChange={handleChange}/>
                            </div>
                        </div>
                        <button type='submit' className='w-100% p-3 px-5 rounded-lg shadow-md bg-pink-400 font-medium text-white text-sm'onClick={AddTask}>Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal1
