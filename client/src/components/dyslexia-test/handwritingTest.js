import React, { useRef, useEffect, useState } from "react"
import "./handwritingTest.css"

import editClass from "../../functions/editClass";
import getClasses from "../../functions/getClasses";

import * as tf from '@tensorflow/tfjs';
import html2canvas from "html2canvas";

export default function HandWritingTest(props) {
  const [ classes, setClasses ] = useState([])

  async function refresh () {
    const classesIni = await getClasses();
    let studentsInitial = []
    for (let i = 0; i < classesIni[props.classViewing].studentsList.length; i++) {
      studentsInitial.push(classesIni[props.classViewing].studentsList[i])
    }
    setClasses(classesIni)
  }

  async function pushDataCorrect() {
    let newClass = classes[props.classViewing];
    newClass.studentsList[props.studentViewing].stats.lineDrawing[0]++
    await editClass(classes[props.classViewing]._id, newClass);
  }

  async function pushDataWrong() {
    let newClass = classes[props.classViewing];
    newClass.studentsList[props.studentViewing].stats.lineDrawing[1]++
    await editClass(classes[props.classViewing]._id, newClass);
  }

  const [checker, setChecker] = useState(false)
  const [wronger, setWronger] = useState(false)
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = 400
    canvas.height = 400

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.lineWidth = 5;
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({nativeEvent}) => {
      if(!isDrawing) {
          return;
      }
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      nativeEvent.preventDefault();
  };

  const clear = async () => {
    const canvas = await html2canvas(document.getElementById("screenshotThis"));
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  const newSet = () => {
    setChecker(false)
    setWronger(false)
  }

  const stopDrawing = () => {
      contextRef.current.closePath();
      setIsDrawing(false);
  };

  return (
      <>
        <div className="image" style={{  width: 400,
          height: 400,
          margin: 0,
          padding: 0,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 200,
          left: 260,
          border: "4px solid black",
        }}>
        </div>
        <canvas id="screenshotThis"
          className="canvas" 
          style={{width: 400, height: 400, margin: 0, padding: 0}}
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        >
        </canvas>
      <div className="buttons-redraw-holder">
        <div id="screenshot"> {/* The content to screenshot goes here */} </div>
        <button className = "buttons-redraw" onClick={() => {newSet(); clear()}}>New Set</button>
        <button className = "buttons-redraw" onClick={clear}>Clear</button>
        {checker ? <div className="green-check"></div> : null}
        {wronger ? <div className="red-x"></div> : null}
      </div>
    </>
  )
}