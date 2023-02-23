import React, { useEffect, useState } from "react"
import "./games.css";

import editClass from "../../functions/editClass";
import getClasses from "../../functions/getClasses";

export default function LetterRescramble(props) {
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

  useEffect(() => {
    if (props.timerDone) {
      pushData();
      props.setTimerDone(false);
    }
  }, [props.timerDone])

  const numWords = 4
  const [ dataHolder, setDataHolder] = useState([])
  const words = ["cat", "dog", "sun", "man", "top", "map", "pen", "box", "hat", "car", "bus", "leg", "fun", "run", "bun", "wet", "red", "big", "mix", "six", "yes", "lip", "cup", "tap", "rot", "fun", "sat", "wet", "wag", "hot", "wet", "fog", "jog", "gas", "tag", "act", "bag", "get", "pig", "dig", "fit", "kit", "nit", "sit", "bit", "kit", "zip", "yam", "yap", "yum"]
  const [ wordsChosen, setWordsChosen ] = useState([])
  const [ boxes, setBoxes ] = useState([])
  const [ lettersIn, SetLettersIn ] = useState([])
  const [ done, setDone ] = useState(false)

  console.log(dataHolder)

  function randomWordsLetters(){
    setDone(false)
    let wordsChosenInitial = []
    let lettersVault = []
    let boxesInitial = []

    for (let i = 0; i < numWords; i++) {
      let wordIndex = Math.floor(Math.random() * words.length)
      wordsChosenInitial.push(words[wordIndex])
    }

    for(let i = 0; i < wordsChosenInitial.length; i++){
      for(let j = 0; j < wordsChosenInitial[i].length; j++){
        lettersVault.push(wordsChosenInitial[i][j])
      }
    }

    while (lettersVault.length > 0) {
      let randomLetterIndex = Math.floor(Math.random() * lettersVault.length)
      boxesInitial.push(lettersVault[randomLetterIndex])
      lettersVault.splice(randomLetterIndex, 1)
    }
    
    setBoxes(boxesInitial)
    setWordsChosen(wordsChosenInitial)
    SetLettersIn([])
  }

  useEffect(() => {
    randomWordsLetters()
  }, [])

  function addLetter(index){
    let lettersInInitial = [...lettersIn]
    let boxesInitial = [...boxes]
    boxesInitial.splice(index, 1)
    lettersInInitial.push(boxes[index])
    SetLettersIn(lettersInInitial)
    setBoxes(boxesInitial)
  }

  function removeLetter(index){
    let lettersInInitial = [...lettersIn]
    let boxesInitial = [...boxes]
    boxesInitial.push(lettersInInitial[index])
    lettersInInitial.splice(index, 1)
    SetLettersIn(lettersInInitial)
    setBoxes(boxesInitial)
  }

  function completeWordCheck(){

    let wordFormed = ""
    for (let i = 0; i < lettersIn.length; i++){
      wordFormed += lettersIn[i]
    }

    for (let i = 0; i < wordsChosen.length; i++){
      if(wordFormed === wordsChosen[i]){
        let wordsChosenInitial = [...wordsChosen]
        wordsChosenInitial.splice(i, 1)

        if (wordsChosenInitial.length === 0){
          setDone(true)
          let dataHolderInitial = [...dataHolder]
          dataHolderInitial.push({wordsChosen: "1", boxes: "ha"})
          setDataHolder(dataHolderInitial)
        }

        setWordsChosen(wordsChosenInitial)
        SetLettersIn([])
      }
    }
  }

  useEffect(() => {
    completeWordCheck()
  }, [lettersIn, boxes])

  return (
    <>
      <button className="new-set" onClick={() => randomWordsLetters()}> new set </button>
      <div className="box-input">
      {lettersIn.map((letters, index) => {
            return (<button className="box-letters-smaller" onClick={() => {removeLetter(index); completeWordCheck()}}> {letters} </button>)
        })}
      </div>
      <div className="series-words">
        {wordsChosen.map((word) => {
          return (<button className="words"> {word} </button>)
        })}
        {done ? <div className="green-check"></div> : null}
      </div>
      <div className="series-box-letters">
        {boxes.map((box, index) => {
          return (<button className="box-letters-smaller" onClick={() => {addLetter(index); completeWordCheck()}}> {box} </button>)
        })}
      </div>
    </>
  );
}