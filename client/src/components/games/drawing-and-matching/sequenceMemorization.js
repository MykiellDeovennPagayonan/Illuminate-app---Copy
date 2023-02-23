import React, { useEffect, useState } from "react";
import "./games.css";

import editClass from "../../functions/editClass";
import getClasses from "../../functions/getClasses";

export default function SequenceMemorization(props) {
  const [classes, setClasses] = useState([]);
  const [dataHolder, setDataHolder] = useState(0);

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

  async function pushData() {
    let newClass = classes[props.classViewing];
    if (dataHolder !== 0) {
      newClass.studentsList[props.studentViewing].stats.wordSearch.push(
        dataHolder
      );
    }
    await editClass(classes[props.classViewing]._id, newClass);
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

  const [boxes, setBoxes] = useState([]);
  const [lettersIn, SetLettersIn] = useState([]);
  const [show, setShow] = useState(true);
  const [done, setDone] = useState(false);
  let numLetters = 4;
  const lettersVault = [
    "b",
    "d",
    "p",
    "q",
    "m",
    "w",
    "n",
    "u",
    "g",
    "j",
    "z",
    "x",
    "v",
    "k",
    "f",
  ];

  function randomLetters() {
    let lettersChosenInitial = [];

    for (let i = 0; i < numLetters; i++) {
      let randomLetterIndex = Math.floor(Math.random() * lettersVault.length);
      lettersChosenInitial.push(lettersVault[randomLetterIndex]);
    }

    return lettersChosenInitial;
  }

  function randomWord() {
    let lettersChooseFrom = [...randomizedLetters];
    let wordInitial = [];
    while (lettersChooseFrom.length > 0) {
      let wordsIndexRandom = Math.floor(
        Math.random() * lettersChooseFrom.length
      );
      wordInitial.push(lettersChooseFrom[wordsIndexRandom]);
      lettersChooseFrom.splice(wordsIndexRandom, 1);
    }
    setShow(true);
    return wordInitial;
  }

  const [randomizedLetters, SetRandomizedLetters] = useState(randomLetters);

  const [randomizedWord, SetRandomizedWord] = useState(randomWord);

  function createBoxLetters() {
    let boxesInitial = [];
    for (let i = 0; i < randomizedLetters.length; i++) {
      boxesInitial.push(randomizedLetters[i]);
    }
    setBoxes(boxesInitial);
  }

  useEffect(() => {
    createBoxLetters();
  }, []);

  function addLetter(index) {
    let lettersInInitial = [...lettersIn];
    let boxesInitial = [...boxes];
    boxesInitial.splice(index, 1);
    lettersInInitial.push(boxes[index]);
    SetLettersIn(lettersInInitial);
    setBoxes(boxesInitial);
  }

  function removeLetter(index) {
    let lettersInInitial = [...lettersIn];
    let boxesInitial = [...boxes];
    boxesInitial.push(lettersInInitial[index]);
    lettersInInitial.splice(index, 1);
    SetLettersIn(lettersInInitial);
    setBoxes(boxesInitial);
  }

  function dontShow() {
    setShow(false);
  }

  function doShow() {
    setShow(true);
  }

  function newSet() {
    setDone(false);
    SetRandomizedLetters(randomLetters);
    SetRandomizedWord(randomWord);
    createBoxLetters();
  }

  function checkMatch() {
    let wordInBox = "";
    let wordToMatch = "";
    for (let i = 0; i < lettersIn.length; i++) {
      wordInBox += lettersIn[i];
    }
    for (let i = 0; i < randomizedWord.length; i++) {
      wordToMatch += randomizedWord[i];
    }
    if (wordInBox === wordToMatch) {
      setDone(true);
      SetLettersIn([]);
      setDataHolder((prev) => prev + 1);
    }
  }

  useEffect(() => {
    checkMatch();
  }, [lettersIn]);

  return (
    <>
      {done ? (
        <div>
          <div
            className="green-check"
            style={{ position: "absolute", top: 180, left: 770 }}
          ></div>
          <button className="new-set" onClick={() => newSet()}>
            {" "}
            new set{" "}
          </button>
        </div>
      ) : (
        <button className="new-set" onClick={() => doShow()}>
          {" "}
          show again{" "}
        </button>
      )}
      <div className="box-input">
        {lettersIn.map((box, index) => {
          return (
            <button
              className="box-letters-smaller"
              onClick={() => removeLetter(index)}
            >
              {" "}
              {box}{" "}
            </button>
          );
        })}
      </div>
      <div className="series-box-letters">
        {boxes.map((box, index) => {
          return (
            <button
              className="box-letters"
              onClick={() => {
                addLetter(index);
                checkMatch();
              }}
            >
              {" "}
              {box}{" "}
            </button>
          );
        })}
      </div>
      {show ? (
        <button className="word-sequence" onClick={() => dontShow()}>
          {randomizedWord.map((box) => {
            return <button className="box-letters"> {box} </button>;
          })}
        </button>
      ) : null}
    </>
  );
}