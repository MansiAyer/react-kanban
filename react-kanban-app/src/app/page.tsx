"use client";
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from "react";

export default function Home() {

  const initBoards = [
    {id: 1, title: 'New Board'}
    ];
  const [numBoards, setBoards] = useState(initBoards);

  const handleDelB = id => {
    const tempList = [...numBoards];
    tempList.splice(tempList.findIndex((item) => item.id==id),1);
    setBoards(
        tempList.map(eachboard => {
       return {id: tempList.indexOf(eachboard) , ...eachboard};
     })
      );

  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Number of boards:&nbsp;
          <code className={styles.code}> {numBoards.length} </code>
        </p>
        <div>
          <button onClick={() => {
              let temp = numBoards[0].id;
              setBoards(
                [{
                    id: temp+1,
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
            handleDelB={handleDelB}
          />
        ))}

      </div>
    </main>
  );
}




function Board({ id, title, handleDelB }) {
  const initTasks = [
    {id: 1, text: 'New Task', stat: 'pending'}
    ];
  const [numtasks, setTasks] = useState(initTasks);


  /*Below is the toggle for completed or pending task on a board.
      it maps each member of the list. 
      each task is checked for the clicked id. 
      If it does not have the clicked id, the task is returned as is. 
      If the id matches, it returns all params before the stat and then for the stat param which is last param, it checks what current stat is and toggles pending or completed. 
      This returned list is then pushed into existing list
  */
  const handleStatus = id => {
    const tempList = numtasks.map(eachtask => {
     return eachtask.id == id ? { ...eachtask, stat: eachtask.stat=='pending'?'completed':'pending'}  : { ...eachtask};
   });
    setTasks(tempList);
  };

  
  const [newText, setText] = useState(title);
  


  return (
    <>
      <div className="boardbox">
        <div className="top" onMouseEnter={() => setText('egg')} onMouseLeave={() => setText(title)}>
          <span> { id } </span>
          <span> { newText } </span>
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
        <button onClick={() => handleDelB(id)}>
          Delete Board
        </button>
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
    );
}