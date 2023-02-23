import React, { useRef, useEffect, useState } from "react"
import "./games.css";

import editClass from "../../functions/editClass";
import getClasses from "../../functions/getClasses";

import * as tf from '@tensorflow/tfjs';
import { Label } from "recharts";
import html2canvas from "html2canvas";

import image0 from '../../resources/lineDrawing/0.png';
import image1 from '../../resources/lineDrawing/1.png';
import image2 from '../../resources/lineDrawing/2.png';
import image3 from '../../resources/lineDrawing/3.png';
import image4 from '../../resources/lineDrawing/4.png';
import image5 from '../../resources/lineDrawing/5.png';
import image6 from '../../resources/lineDrawing/6.png';
import image7 from '../../resources/lineDrawing/7.png';
import image8 from '../../resources/lineDrawing/8.png';
import image9 from '../../resources/lineDrawing/9.png';
import image10 from '../../resources/lineDrawing/10.png';
import image11 from '../../resources/lineDrawing/11.png';
import image12 from '../../resources/lineDrawing/12.png';
import image13 from '../../resources/lineDrawing/13.png';
import image14 from '../../resources/lineDrawing/14.png';
import image15 from '../../resources/lineDrawing/15.png';
import image16 from '../../resources/lineDrawing/16.png';
import image17 from '../../resources/lineDrawing/17.png';
import image18 from '../../resources/lineDrawing/18.png';
import image19 from '../../resources/lineDrawing/19.png';
import image20 from '../../resources/lineDrawing/20.png';
import image21 from '../../resources/lineDrawing/21.png';
import image22 from '../../resources/lineDrawing/22.png';
import image23 from '../../resources/lineDrawing/23.png';
import image24 from '../../resources/lineDrawing/24.png';

export default function Redraw(props) {
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

  const images = [image0, image1, image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12, image13, image14,image15,
    image16,image17,image18,image19,image20,image21,image22,image23,image24]

  let randomIndex = Math.floor(Math.random() * images.length)
    const MODEL_URL = 'model.json';
    const [model, setModel] = useState(null);
    const TARGET_CLASSES = {
    0: "0",
    1: "1",
    2: "10",
    3: "11",
    4: "12",
    5: "13",
    6: "14",
    7: "15",
    8: "16",
    9: "17",
    10: "18",
    11: "19",
    12: "2",
    13: "20",
    14: "21",
    15: "22",
    16: "23",
    17: "24",
    18: "3",
    19: "4",
    20: "5",
    21: "6",
    22: "7",
    23: "8",
    24: "9",
    };
    const [selectedImage, setSelectedImage] = useState(images[randomIndex]);

    const loadModel = async () => {
      const m = await tf.loadGraphModel(MODEL_URL);
      console.log(m)
      setModel(m);
    }
    
    useEffect(() => {
    refresh()
    loadModel();
    },[])

    const handleImageUpload = async () => {
      console.log("hi");
      const canvas = await html2canvas(document.getElementById("screenshotThis"));
      const tensor = tf.browser.fromPixels(canvas)
        .resizeNearestNeighbor([300, 300]) // change the image size
        .expandDims()
        .toFloat()
        .reverse(-1);
        const predictions = await model.predict(tensor).data();
        const topPredictions = Array.from(predictions)
          .map((probability, i) => ({
            probability,
            className: TARGET_CLASSES[i],
          }))
          .sort((a, b) => b.probability - a.probability)
          .slice(0)
          .filter((prediction) => prediction.probability >= 0.2);
      console.log(topPredictions)
      console.log(topPredictions[0]?.className)
      const wholeNumber = parseInt(selectedImage.split("/").pop())
      const num2String = wholeNumber.toString();
      console.log(num2String)
      let checked = false
      for (let i = 0; i < topPredictions.length; i++) {
        if (num2String === topPredictions[i].className) {
          setChecker(true)
          setWronger(false)
          pushDataCorrect()
          checked = true
        }
      }
      if (!checker && !checked) {
        setWronger(true)
        pushDataWrong()
      }        
  };

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
    let randomIndex = Math.floor(Math.random() * images.length)
    setSelectedImage(images[randomIndex]);
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
          backgroundImage: `url(${selectedImage})`,
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
        <button className="buttons-redraw" onClick={handleImageUpload}> Check </button>
        <div id="screenshot"> {/* The content to screenshot goes here */} </div>
        <button className = "buttons-redraw" onClick={() => {newSet(); clear()}}>New Set</button>
        <button className = "buttons-redraw" onClick={clear}>Clear</button>
        {checker ? <div className="green-check"></div> : null}
        {wronger ? <div className="red-x"></div> : null}
      </div>
    </>
  )
}