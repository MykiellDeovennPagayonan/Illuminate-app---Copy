import React, { useState, useEffect } from "react"
import "./phonetic games.css";

import editClass from "../../functions/editClass";
import getClasses from "../../functions/getClasses";

export default function WordRecognition(props) {
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
    newClass.studentsList[props.studentViewing].stats.wordRecognition[0]++
    await editClass(classes[props.classViewing]._id, newClass);
  }

  async function pushDataWrong() {
    let newClass = classes[props.classViewing];
    newClass.studentsList[props.studentViewing].stats.wordRecognition[1]++
    await editClass(classes[props.classViewing]._id, newClass);
  }

  const [ boxes, setBoxes ] = useState([])

  const syllables = ["ne", "har", "te", "mu", "ni", "op", "tra", "da", "la", "si", "vi", "fa", "li", "ka", "pi", "wi", "hi", "po", "to", "no", "go", "ro", "so", "bo", "do", "jo", "mo", "yo", "lo", "zo", "wo", "ko", "fo", "vo", "co", "ho", "be", "me", "pe", "le", "ke", "se", "re", "de", "ge", "he", "fe", "ce", "oe", "je", "ze", "xe", "ye", "ve", "ae", "ee", "ie", "ue", "oi", "ai", "ei", "bi", "mi", "fi", "si", "di", "ki", "li", "xi", "yi", "vi", "mi", "ni", "bo", "fo", "so", "do", "ko", "lo", "xo", "yo", "vo", "mo", "no", "bi", "fi", "si", "di", "ki", "li", "xi", "yi", "vi", "mi", "ni", "bu", "fu", "su", "du", "ku", "gep", "zim", "lof", "ron", "ked", "nol", "fru", "vep", "hic", "qor", "tet", "nov", "uvz", "gir", "xul", "yex", "zol", "wop", "bem", "dep", "lem", "kep", "sep", "rep", "deg", "leg", "fel", "val", "mol", "nol"];

  const [ wordChosen, setWordChosen ] = useState(null)
  const numWords = 8
  const [ wordIndex, setWordIndex ] = useState(null)
  const [checker, setChecker] = useState(false)
  const [wronger, setWronger] = useState(false)

  function newSet() {
    let wordsVault = []

    for (let i = 0; i < numWords + 1; i++){
      let wordNew = ""
      for (let j = 0; j < 3; j++){
        wordNew += syllables[Math.floor(Math.random()*syllables.length)]
      }
      wordsVault.push(wordNew)
    }

    let indexWordsvalut = Math.floor(Math.random()*wordsVault.length)
    let wordInitial = wordsVault[indexWordsvalut]
    wordsVault.splice(indexWordsvalut, 1)

    setWordChosen(wordInitial)

    let boxesInitial = []
    for (let i = 0; i < numWords; i++) {
      indexWordsvalut = Math.floor(Math.random()*wordsVault.length)
      let randomWordInitial = wordsVault[indexWordsvalut]
      wordsVault.splice(indexWordsvalut, 1)

      boxesInitial.push(randomWordInitial)
    }

    let insertWordIndex = Math.floor(Math.random() * boxesInitial.length + 1)
    boxesInitial.splice(insertWordIndex, 0, wordInitial)

    setBoxes(boxesInitial)
    setWordIndex(insertWordIndex)
    setChecker(false)
    setWronger(false)
  }

  function checkerCorrect(index){
    if (checker === false) {
      if (index === wordIndex ) {
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
    msg.text = String(wordChosen);
    window.speechSynthesis.speak(msg);
  }

  useEffect(() => {
    newSet()
    refresh()
   }, [])

  return (
    <>
      <div className="boxes-holder">
        {boxes.map((word, index) => {
          return (<button className="word" onClick={() => checkerCorrect(index)}> {word} </button>)
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