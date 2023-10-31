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
  const [numtasks, setTasks] = useState(0);

  function handleClick() {
    setTasks(numtasks+1);
  }

  return (
    <>
      <div className="boardbox">
        <div className="top">
          <span> { id } </span>
          <span> { title } </span>
        </div>

        <div className="mainstuff">
          <button onClick={handleClick}>
            Number of tasks is: {numtasks} 
          </button>
          <p>bl</p>
        </div>
      </div>
    </>
  );
}
