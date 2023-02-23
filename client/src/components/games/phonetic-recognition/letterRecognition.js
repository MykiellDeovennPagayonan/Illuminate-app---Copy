import React, { useState, useEffect } from "react"
import "./phonetic games.css";

import editClass from "../../functions/editClass";
import getClasses from "../../functions/getClasses";

export default function LetterRecognition(props) {
  const [classes, setClasses] = useState([]);

  async function refresh() {
    const classesIni = await getClasses();
    let studentsInitial = [];
    for (
      let i = 0;
      i < classesIni[props.classViewing].studentsList.length;
      i++
    ) {
      studentsInitial.push(classesIni[props.classViewing].studentsList[i]);
    }
    setClasses(classesIni);
  }

  async function pushDataCorrect() {
    let newClass = classes[props.classViewing];
    newClass.studentsList[props.studentViewing].stats.letterRecognition[0]++
    await editClass(classes[props.classViewing]._id, newClass);
  }

  async function pushDataWrong() {
    let newClass = classes[props.classViewing];
    newClass.studentsList[props.studentViewing].stats.letterRecognition[1]++
    await editClass(classes[props.classViewing]._id, newClass);
  }


  const [ boxes, setBoxes ] = useState([])
  const [ letterChosen, setLetterChosen ] = useState(null)
  const numLetters = 8
  const [ letterIndex, setLetterIndex ] = useState(null)
  const [checker, setChecker] = useState(false)
  const [wronger, setWronger] = useState(false)

  function newSet() {
    let letterInitial = String.fromCharCode(Math.floor(Math.random()*26) + 97)
    while (letterInitial === letterChosen) {
      letterInitial = String.fromCharCode(Math.floor(Math.random()*26) + 97)
    }

    setLetterChosen(letterInitial)

    let boxesInitial = []
    for (let i = 0; i < numLetters; i++) {
      let duplicate = false
      let randomLetterInitial;

      do {
        duplicate = false
        randomLetterInitial = String.fromCharCode(Math.floor(Math.random()*26) + 97)

        for (let j = 0; j < boxesInitial.length; j++){
          if (randomLetterInitial === boxesInitial[j]){
            duplicate = true
          }
        }

        if (randomLetterInitial === letterInitial){
          duplicate = true
        }

      } while (duplicate)

      boxesInitial.push(randomLetterInitial)
    }

    let insertLetterIndex = Math.floor(Math.random() * boxesInitial.length + 1)
    boxesInitial.splice(insertLetterIndex, 0, letterInitial)

    setBoxes(boxesInitial)
    setLetterIndex(insertLetterIndex)
    setChecker(false)
    setWronger(false)
  }

  function checkerCorrect(index){
    if (checker === false) {
      if (index === letterIndex ) {
        setChecker(true)
        setWronger(false)
        pushDataCorrect()
      } else if (checker === false) {
        pushDataWrong()
        setWronger(true)
      }
    }
  }

  function speak(){
    let msg = new SpeechSynthesisUtterance();
    msg.text = String(letterChosen);
    window.speechSynthesis.speak(msg);
  }

  useEffect(() => {
    refresh()
    newSet()
  }, [])

  return (
    <>
      <div className="boxes-holder">
      {boxes.map((letter, index) => {
        return (<button className="letter" onClick={() => checkerCorrect(index)}> {letter} </button>)
      })}
      </div>
      <div className="buttons">
        <button className="listen" onClick={() => speak()}> Listen </button>
        <button className="next-set" onClick={() => newSet()}> Next Set </button>
        {checker ? <div className="green-check"></div> : null}
        {wronger ? <div className="red-x"></div> : null}
      </div>
    </>
  );
}
