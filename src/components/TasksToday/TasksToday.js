import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import "./TasksToday.scss";


var date;
var time = new Date();
const TasksToday = () => {
    date = time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear();

    const user= useContext(UserContext)

    return (
        <div className="tasksMain">
            <div className="heading">
                <h1>Your Tasks</h1>
            </div>
            <div className="uptasklist">
                <div className="taskslistmain">
                    {user.user.tasksArray.map((dates) => {
                        return (
                        <>
                            {dates.Date===date ? <h4>Today</h4>: <h4>{dates.Date}</h4> }
                            {
                                dates.Tasks.map((task)=>{
                                    return(
                                <div className="taskrec">
                                <div className="left">
                                    <h3>{task.Heading}</h3>
                                    <p>{dates.Date}</p>
                                </div>
                                <div className="right">
                                    <p className="objective">Objective: {task.Objective}</p>
                                    <div className="tags">
                                        {task.tags.map((tag) => {
                                            return (
                                                <div className="tag" style={{ border: ` 1px solid ${tag.color}`, color: tag.color, opacity: 0.5, borderStyle: "dashed" }}>{tag.tagName}</div>
                                                )
                                            })}
                                    </div>
                                </div>
                            </div>
                                            )
                                        })
                            }
                        </>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
export default TasksToday;
