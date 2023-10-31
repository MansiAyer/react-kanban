"use client";
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from "react";

export default function Home() {

  const initBoards = [
    {id: 1, title: 'New Board'}
    ];

  const [numBoards, setBoards] = useState(initBoards);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Number of boards:&nbsp;
          <code className={styles.code}> {numBoards.length} </code>
        </p>
        <div>
          <button onClick={() => {
              setBoards(
                [{
                    id: numBoards.length+1,
                    title: 'New Board'
                  }, ...numBoards]
                );
            }
          }> Add Board + </button>
        </div>
      </div>

      <div className={styles.grid}>

        {numBoards.map(eachboard => (
          <Board 
            id={eachboard.id}
            title={eachboard.title}
          />
        ))}

      </div>
    </main>
  )
}




function Board({ id, title }) {
  const initTasks = [
    {id: 1, text: 'New Task', stat: 'pending'}
    ];

  const [numtasks, setTasks] = useState(initTasks);

  const handleStatus = id => {
    const tempList = numtasks.map(eachtask => {
     return eachtask.id == id ? { ...eachtask, stat: eachtask.stat=='pending'?'completed':'pending'}  : { ...eachtask};
   });
    /* it maps each member of the list. each task is checked for the clicked id. If it does not have the clicked id, the task is returned as is. If the id matches, it returns all params before the stat and then for the stat param which is last param, it checks what current stat is and toggles pending or completed. This returned list is then pushed into existing list*/
    setTasks(tempList);
  };


  return (
    <>
      <div className="boardbox">
        <div className="top">
          <span> { id } </span>
          <span> { title } </span>
        </div>

        <div className="mainstuff">
          <p>{numtasks.length} { (numtasks.length>1)?('tasks'):('task') }</p>
          <button onClick={() => {
              setTasks(
                [{
                    id: numtasks.length+1,
                    text: 'New Task',
                    stat: 'pending'
                  }, ...numtasks]
                );
            }
          }>
            Add Task + 
          </button>
          <div>
            {numtasks.map(eachtask => (
              <Task 
                id={eachtask.id}
                text={eachtask.text}
                status={eachtask.stat}
                handleComplete={handleStatus}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

function Task({ id, text, status, handleComplete }){

  return (
    <button className={status} onClick={() => handleComplete(id)}>
      <span> {id} | </span>
      <b> {text} </b>
    </button>
    )
}