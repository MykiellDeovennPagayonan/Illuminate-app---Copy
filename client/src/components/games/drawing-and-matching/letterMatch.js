import React, { useRef, useEffect, useState } from "react"
import "./games.css";

import editClass from "../../functions/editClass";
import getClasses from "../../functions/getClasses";

export default function LetterMatch(props) {
  const [ classes, setClasses ] = useState([])

  async function refresh () {
    const classesIni = await getClasses();
    let studentsInitial = []
    for (let i = 0; i < classesIni[props.classViewing].studentsList.length; i++) {
      studentsInitial.push(classesIni[props.classViewing].studentsList[i])
    }
    setClasses(classesIni)
  }

  async function pushData() {
    let newClass = classes[props.classViewing]
    newClass.studentsList[props.studentViewing].stats.wordSearch.push(dataHolder)
    await editClass(classes[props.classViewing]._id, newClass)
    refresh()
  }

  useEffect(() => {
    refresh()
  }, [])

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [ dataHolder, setDataHolder] = useState(0)
  const [ lettersChosen, setLettersChosen ] = useState([])
  const numLetters = 4
  const [ score, setScore ] = useState(0)
  const [ begin, setBegin ] = useState(false)  

  function newSet() {
    setBegin(true)
    setScore(0)
    lettersSet()
  }

  function lettersSet(){
    let lettersChosenInitial = []

    for (let i = 0; i < numLetters; i++) {
      let match = false
      let letter;

      do {
        match = false
        letter = String.fromCharCode(Math.floor(Math.random()*26) + 97)
        
        for (let i = 0; i < lettersChosenInitial.length; i++) {
          if (letter === lettersChosenInitial[i]){
            match = true
          }
        }

      } while (match === true)

      lettersChosenInitial.push(letter)
    }

    setLettersChosen(lettersChosenInitial)

    function runCanvas() {
      const canvas = canvasRef.current
      canvas.width = 950
      canvas.height = 500
  
      const context = canvas.getContext("2d");
      context.strokeStyle = "black";
      context.lineWidth = 5;
      contextRef.current = context;
  
      let colors = ["#FF69B4", "#FFA07A", "#FFFF00", "#32CD32", "#00BFFF"];
      let numberCircles = 30
      let lettersIn = 0
      let floatingLetters = []
  
      class cirlces {
        x;
        y;
        colorChoice;
        dx;
        radius;
        letter;
  
        respawn(x, y){
          this.x = x
          this.y = y
          this.colorChoice = colors[Math.floor(Math.random()*colors.length)]
          this.letter = String.fromCharCode(Math.floor(Math.random()*26) + 97)
        }
  
        constructor(x, y, colorChoice, letter) {
          this.x = x
          this.y = y
          this.colorChoice = colorChoice
          this.dx = .5
          this.letter = letter
          this.radius = 23
        }
      }
  
      for (let i = 0; i < numberCircles; i++){
        let repeat;
        let xIni;
        let yIni;

        do {
          repeat = false

          xIni = Math.floor(Math.random()*canvas.width)
          yIni = Math.floor(Math.random()*canvas.height)

          for (let k = 0; k < floatingLetters.length; k++){
            if ((floatingLetters[k].x - xIni < 30 && xIni - floatingLetters[k].x < 30) && (floatingLetters[k].y - yIni < 30 && yIni - floatingLetters[k].y < 30)) {
              repeat = true
            }
          }
        } while (repeat)

        let colorChoiceIni = colors[Math.floor(Math.random()*colors.length)]
        let letterIni = String.fromCharCode(Math.floor(Math.random()*26) + 97)

        if (lettersIn < 4) {
          letterIni = lettersChosenInitial[Math.floor(Math.random()*lettersChosenInitial.length)]
        }

        for (let j = 0; j < lettersChosenInitial.length; j++) {
          if (letterIni === lettersChosenInitial[j]) {
            lettersIn++
          }
        }

        let circleInitial = new cirlces(xIni, yIni, colorChoiceIni, letterIni)
        floatingLetters.push(circleInitial)
      }
  
      let mouse = {
        x: undefined,
        y: undefined
      }
      
      let draw = false
      window.addEventListener("mousemove", function(event){
        window.addEventListener("mousedown", function() {
          draw = true
          if (event.x >= 265 && event.x <= 265 + canvas.width && event.y >= 175 && event.y <= 175 + canvas.height) {
            mouse.x = event.x - 315
            mouse.y = event.y - 175
            }
        })
        window.addEventListener("mouseup", function() {
          draw = false
        })
        if (draw === true){
          if (event.x >= 265 && event.x <= 265 + canvas.width && event.y >= 175 && event.y <= 175 + canvas.height) {
            mouse.x = event.x - 315
            mouse.y = event.y - 175
          }
        } else {
          mouse.x = undefined
          mouse.y = undefined
        }
      })
  
      function animate(){
        requestAnimationFrame(animate)
        context.clearRect(0, 0, canvas.width, canvas.height)
  
        for(let i = 0; i < numberCircles; i++){
          context.beginPath()
          context.arc(floatingLetters[i].x, floatingLetters[i].y, floatingLetters[i].radius, 0, Math.PI*2, true)
          context.stroke()
          context.fillStyle = floatingLetters[i].colorChoice
          context.fill()
          context.fillStyle = "black"
          context.font = "bold 32px sans-serif"
  
          context.fillText(floatingLetters[i].letter, floatingLetters[i].x - 8, floatingLetters[i].y + 7)
          if (floatingLetters[i].x > canvas.width) {
            for (let j = 0; j < lettersChosenInitial.length; j++) {
              if (floatingLetters[i].letter === lettersChosenInitial[j]) {
                lettersIn--
              }
            }
            let repeat;
            let x;
            let y;

            do {
              repeat = false

              x = Math.floor(Math.random()* - 200)
              y = Math.floor(Math.random()*canvas.height)
  
              for (let k = 0; k < numberCircles; k++){
                if ((floatingLetters[k].x - x < 70 && x - floatingLetters[k].x < 70) && (floatingLetters[k].y - y < 70 && y - floatingLetters[k].y < 70)) {
                  repeat = true
                }
              }
            } while (repeat)

            floatingLetters[i].respawn(x, y)
          }
  
          if ((floatingLetters[i].x - mouse.x < 30 && mouse.x - floatingLetters[i].x < 30) && (floatingLetters[i].y - mouse.y < 30 && mouse.y - floatingLetters[i].y < 30)) {
            let notChosen = true
            for (let j = 0; j < lettersChosenInitial.length; j++) {
              if (floatingLetters[i].letter === lettersChosenInitial[j]) {
                notChosen = false
                setScore(prevScore => prevScore + 1)
                lettersIn--
              }
            }

            if (notChosen === true) {
              setScore(prevScore => prevScore - 1)
            }

            let repeat;
            let x;
            let y;

            do {
              repeat = false

              x = Math.floor(Math.random()* - 200)
              y = Math.floor(Math.random()*canvas.height)
  
              for (let k = 0; k < numberCircles; k++){
                if ((floatingLetters[k].x - x < 70 && x - floatingLetters[k].x < 70) && (floatingLetters[k].y - y < 70 && y - floatingLetters[k].y < 70)) {
                  repeat = true
                }
              }
            } while (repeat)

            floatingLetters[i].respawn(x, y)
          }
  
          floatingLetters[i].x += floatingLetters[i].dx
        }
      }
      animate()
    }
    runCanvas()
  }

  return (
    <>
      <div className="letters-and-score">
        <button className="score"> {score} </button>
        {lettersChosen.map((letter) => {
          return (<button className="letters"> {letter} </button>)
        })}
        <button className="score" style={{backgroundColor: "white", fontSize: 20}} onClick={() => {newSet()}}> New Set </button>
      </div>
      <canvas className="canvas-free-draw" style={{width: 950, height: 500, margin: 0, padding: 0}}
      ref={canvasRef}
      >
      </canvas>
    </>
  )
}