import React, { useEffect, useState } from "react";
import "./games.css";

import editClass from "../../functions/editClass";
import getClasses from "../../functions/getClasses";

export default function WordSearch(props) {
  const [classes, setClasses] = useState([]);
  const [dataHolder, setDataHolder] = useState([]);

  async function refresh() {
    const classesIni = await getClasses();
    let studentsInitial = [];
    for (
      let i = 0;
      i < classesIni[props.classViewing].studentsList?.length;
      i++
    ) {
      studentsInitial.push(classesIni[props.classViewing].studentsList[i]);
    }
    await setClasses(classesIni);
  }

  async function pushData() {
    let newClass = classes[props.classViewing];
    if (dataHolder !== []) {
      newClass.studentsList[props.studentViewing].stats.wordSearch.push(
        dataHolder
      );
    }
    await editClass(classes[props.classViewing]._id, newClass);
  }

  useEffect(() => {
    if (props.timerDone === true) {
      pushData();
      setDataHolder([]);
      props.setTimerDone(false);
    }
  }, [props.timerDone]);

  const words = [
    "cat",
    "dog",
    "sun",
    "man",
    "top",
    "map",
    "pen",
    "box",
    "hat",
    "car",
    "bus",
    "leg",
    "fun",
    "run",
    "bun",
    "wet",
    "red",
    "big",
    "mix",
    "six",
    "yes",
    "lip",
    "cup",
    "tap",
    "rot",
    "fun",
    "sat",
    "wet",
    "wag",
    "hot",
    "wet",
    "fog",
    "jog",
    "gas",
    "tag",
    "act",
    "bag",
    "get",
    "pig",
    "dig",
    "fit",
    "kit",
    "nit",
    "sit",
    "bit",
    "kit",
    "zip",
    "yam",
    "yap",
    "yum",
  ];
  let indexes = [];
  let numWords = 3;
  const rows = 10;
  const columns = 8;
  let repeat;

  const [wordsChosen, SetWordsChosen] = useState([]);
  const [boxes, SetBoxes] = useState([]);
  const [done, setDone] = useState(false);

  function setWordsAndLetters() {
    repeat = false;
    let boxesContent = [];
    let wordsChosenInitial = [];

    for (let i = 0; i < rows * columns; i++) {
      boxesContent.push({ letter: "-", activation: false });
    }

    for (let i = 0; i < numWords; i++) {
      let randomWordIndex = Math.floor(Math.random() * words.length);
      let arrangementIndex = Math.floor(Math.random() * 4); // 0 is down, 1 is up, 2 is right, 3 is left

      let xStartInitial;
      let yStartInitial;

      let xEndInitial;
      let yEndInitial;

      if (arrangementIndex === 0) {
        xStartInitial = Math.floor(Math.random() * rows);
        yStartInitial = Math.floor(
          Math.random() * (columns - words[randomWordIndex].length)
        );
        xEndInitial = xStartInitial;
        yEndInitial = yStartInitial + (words[randomWordIndex].length - 1);
      } else if (arrangementIndex === 1) {
        xStartInitial = Math.floor(Math.random() * rows);
        yStartInitial =
          Math.floor(
            Math.random() * (columns - words[randomWordIndex].length)
          ) + words[randomWordIndex].length;
        xEndInitial = xStartInitial;
        yEndInitial = yStartInitial - (words[randomWordIndex].length - 1);
      } else if (arrangementIndex === 2) {
        xStartInitial = Math.floor(
          Math.random() * (rows - words[randomWordIndex].length)
        );
        yStartInitial = Math.floor(Math.random() * columns);
        xEndInitial = xStartInitial + (words[randomWordIndex].length - 1);
        yEndInitial = yStartInitial;
      } else if (arrangementIndex === 3) {
        xStartInitial =
          Math.floor(Math.random() * (rows - words[randomWordIndex].length)) +
          words[randomWordIndex].length;
        yStartInitial = Math.floor(Math.random() * columns);
        xEndInitial = xStartInitial - (words[randomWordIndex].length - 1);
        yEndInitial = yStartInitial;
      }

      let xWrite = xStartInitial;
      let yWrite = yStartInitial;

      for (let j = 0; j < words[randomWordIndex].length; j++) {
        if (
          boxesContent[yWrite * rows + xWrite].letter === "-" ||
          boxesContent[yWrite * rows + xWrite].letter ===
            String(words[randomWordIndex][j])
        ) {
          boxesContent[yWrite * rows + xWrite].letter = String(
            words[randomWordIndex][j]
          );
        } else {
          repeat = true;
        }

        if (arrangementIndex === 0) {
          yWrite++;
        } else if (arrangementIndex === 1) {
          yWrite--;
        } else if (arrangementIndex === 2) {
          xWrite++;
        } else {
          xWrite--;
        }
      }

      wordsChosenInitial.push({
        word: words[randomWordIndex],
        xStart: xStartInitial,
        yStart: yStartInitial,
        xEnd: xEndInitial,
        yEnd: yEndInitial,
        arrangement: arrangementIndex,
        activation: false,
      });
    }

    for (let i = 0; i < rows * columns; i++) {
      if (boxesContent[i].letter === "-") {
        boxesContent[i].letter = letterBackground[i];
      }
    }

    SetWordsChosen(wordsChosenInitial);
    SetBoxes(boxesContent);
  }

  function randomLetters() {
    let letterBackgroundInitial = [];
    for (let k = 0; k < rows * columns; k++) {
      letterBackgroundInitial.push(
        String.fromCharCode(Math.floor(Math.random() * 26) + 97)
      );
    }
    return letterBackgroundInitial;
  }

  const [letterBackground, setLetterBackground] = useState(randomLetters());

  function newSet() {
    setDone(false);
    setLetterBackground(randomLetters());
    do {
      setWordsAndLetters();
    } while (repeat);
  }

  useEffect(() => {
    newSet();
    refresh();
  }, []);

  function startIndex(indexS) {
    indexes[0] = indexS;
  }

  function endIndex(indexE) {
    indexes[1] = indexE;
    refreshBoard();
  }

  function refreshBoard() {
    let boxesInitial = [...boxes];
    for (let i = 0; i < rows * columns; i++) {
      boxesInitial[i].activation = false;
    }
    boxesInitial[indexes[0]].activation = true;
    boxesInitial[indexes[1]].activation = true;
    SetBoxes(boxesInitial);
    checkWord();
  }

  function checkWord() {
    let boxesInitial = [...boxes];
    let wordsChosenInitial = [...wordsChosen];
    for (let i = 0; i < wordsChosen.length; i++) {
      if (wordsChosen[i].activation === true) {
        let xWrite = wordsChosen[i].xStart;
        let yWrite = wordsChosen[i].yStart;
        for (let j = 0; j < wordsChosen[i].word.length; j++) {
          boxesInitial[yWrite * rows + xWrite].activation = true;
          if (wordsChosen[i].arrangement === 0) {
            yWrite++;
          } else if (wordsChosen[i].arrangement === 1) {
            yWrite--;
          } else if (wordsChosen[i].arrangement === 2) {
            xWrite++;
          } else {
            xWrite--;
          }
        }
      } else if (
        boxes[wordsChosen[i].yStart * rows + wordsChosen[i].xStart]
          .activation === true &&
        boxes[wordsChosen[i].yEnd * rows + wordsChosen[i].xEnd].activation ===
          true
      ) {
        wordsChosenInitial[i].activation = true;
      }
    }
    SetWordsChosen(wordsChosenInitial);
    activateCompleteLetters();
  }

  function activateCompleteLetters() {
    let boxesInitial = [...boxes];
    let completeWordsCount = 0;
    for (let i = 0; i < wordsChosen.length; i++) {
      if (wordsChosen[i].activation === true) {
        completeWordsCount++;
        let xWrite = wordsChosen[i].xStart;
        let yWrite = wordsChosen[i].yStart;
        for (let j = 0; j < wordsChosen[i].word.length; j++) {
          boxesInitial[yWrite * rows + xWrite].activation = true;
          if (wordsChosen[i].arrangement === 0) {
            yWrite++;
          } else if (wordsChosen[i].arrangement === 1) {
            yWrite--;
          } else if (wordsChosen[i].arrangement === 2) {
            xWrite++;
          } else {
            xWrite--;
          }
        }
      }
    }

    if (completeWordsCount === wordsChosen.length) {
      let dataHolderInitial = dataHolder
      dataHolderInitial.push({words: wordsChosen, boxes: boxes})
      setDataHolder(dataHolderInitial);
      console.log("ok!!!!!")
      setDone(true);
    }
    SetBoxes(boxesInitial);
  }

  return (
    <>
      <div className="word-search-words-grid">
        {wordsChosen.map((wordsChosen) => {
          if (wordsChosen.activation === false) {
            return (
              <button className="word-search-words">
                {" "}
                {wordsChosen.word}{" "}
              </button>
            );
          } else {
            return (
              <button className="word-search-words-activated">
                {" "}
                {wordsChosen.word}{" "}
              </button>
            );
          }
        })}
        <button
          className="word-search-words"
          style={{ width: 260, backgroundColor: "#E7BF83" }}
          onClick={() => newSet()}
        >
          {" "}
          next set{" "}
        </button>
        {done ? <div className="green-check"></div> : null}
      </div>
      <div className="grid">
        {boxes.map((box, index) => {
          if (box.activation === false) {
            return (
              <button
                className="grid-box"
                onMouseDown={() => startIndex(index)}
                onMouseUp={() => {
                  endIndex(index);
                }}
              >
                {" "}
                {box.letter}{" "}
              </button>
            );
          } else {
            return (
              <button className="grid-box-enlarged"> {box.letter} </button>
            );
          }
        })}
      </div>
    </>
  );
}
