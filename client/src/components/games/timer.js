import React, { useEffect, useState } from "react"
import "./timer.css";

export default function Timer(props) {
  const [ barProgress, setBarProgress ] = useState(1000)

  useEffect(() => {
    const timer = setInterval(() => {
      if (barProgress <= 0) {
        props.setTimerDone(true)
        setBarProgress(1000)
      } else {
        setBarProgress(prevProgress => prevProgress - 20)
      }
    }, 1000)
    return () => clearInterval(timer)
  })

  return (
    <>
      <button className="timer">
        <div className="timer-bar" style={{width: (barProgress/1000 * 1113)}}> </div>
      </button>
    </>
  )
}