import React, { useState, useEffect } from "react"
import "./phonetic games.css";

import editClass from "../../functions/editClass";
import getClasses from "../../functions/getClasses";

export default function SyllableRecognition(props) {
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
    newClass.studentsList[props.studentViewing].stats.syllableRecognition[0]++
    await editClass(classes[props.classViewing]._id, newClass);
  }

  async function pushDataWrong() {
    let newClass = classes[props.classViewing];
    newClass.studentsList[props.studentViewing].stats.syllableRecognition[1]++
    await editClass(classes[props.classViewing]._id, newClass);
  }

  const [ boxes, setBoxes ] = useState([])

  const syllables = ["ne", "har", "te", "mu", "ni", "op", "tra", "da", "la", "si", "vi", "fa", "li", "ka", "pi", "wi", "hi", "po", "to", "no", "go", "ro", "so", "bo", "do", "jo", "mo", "yo", "lo", "zo", "wo", "ko", "fo", "vo", "co", "ho", "be", "me", "pe", "le", "ke", "se", "re", "de", "ge", "he", "fe", "ce", "oe", "je", "ze", "xe", "ye", "ve", "ae", "ee", "ie", "ue", "oi", "ai", "ei", "bi", "mi", "fi", "si", "di", "ki", "li", "xi", "yi", "vi", "mi", "ni", "bo", "fo", "so", "do", "ko", "lo", "xo", "yo", "vo", "mo", "no", "bi", "fi", "si", "di", "ki", "li", "xi", "yi", "vi", "mi", "ni", "bu", "fu", "su", "du", "ku", "gep", "zim", "lof", "ron", "ked", "nol", "fru", "vep", "hic", "qor", "tet", "nov", "uvz", "gir", "xul", "yex", "zol", "wop", "bem", "dep", "lem", "kep", "sep", "rep", "deg", "leg", "fel", "val", "mol", "nol"];

  const [ syllableChosen, setSyllableChosen ] = useState(null)
  const numSyllables = 24
  const [ syllableIndex, setSyllableIndex ] = useState(null)
  const [checker, setChecker] = useState(false)
  const [wronger, setWronger] = useState(false)

  function newSet() {
    let syllableInitial = syllables[Math.floor(Math.random()*syllables.length)]
    while (syllableInitial === syllableChosen){
      syllableInitial = syllables[Math.floor(Math.random()*syllables.length)]
    }

    setSyllableChosen(syllableInitial)

    let boxesInitial = []
    for (let i = 0; i < numSyllables; i++) {
      let duplicate = false
      let randomSyllableInitial;

      do {
        duplicate = false
        randomSyllableInitial = syllables[Math.floor(Math.random()*syllables.length)]

        for (let j = 0; j < boxesInitial.length; j++){
          if (randomSyllableInitial === boxesInitial[j]){
            duplicate = true
          }
        }

        if (randomSyllableInitial === syllableInitial){
          duplicate = true
        }

      } while (duplicate)

      boxesInitial.push(randomSyllableInitial)
    }

    let insertSyllableIndex = Math.floor(Math.random() * boxesInitial.length + 1)
    boxesInitial.splice(insertSyllableIndex, 0, syllableInitial)

    setBoxes(boxesInitial)
    setSyllableIndex(insertSyllableIndex)
    setChecker(false)
    setWronger(false)
  }

  function speak(){
    let msg = new SpeechSynthesisUtterance();
    msg.text = String(syllableChosen);
    window.speechSynthesis.speak(msg);
  }

  function checkerCorrect(index){
    if (checker === false) {
      if (index === syllableIndex ) {
        setChecker(true)
        setWronger(false)
        pushDataCorrect()
      } else if (checker === false) {
        pushDataWrong()
        setWronger(true)
      }
    }
  }

  useEffect(() => {
    refresh()
    newSet()
  }, [])

  return (
    <>
      <div className="boxes-holder">
        {boxes.map((syllable, index) => {
          return (<button className="syllables" onClick={() => checkerCorrect(index)}> {syllable} </button>)
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