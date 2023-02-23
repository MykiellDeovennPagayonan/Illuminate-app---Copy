import React, { useState } from "react";
import Logo from "./logos-and-buttons/logo";
import Home from "./menus/home";
import Classes from "./menus/classes";
import Students from "./menus/students";
import Stats from "./menus/stats";
import Tab from "./games/tab";
import HomeButtons from "./logos-and-buttons/homeButtons";
import Gamebuttons from "./logos-and-buttons/gamesButtons";
import StudentsClasses from "./logos-and-buttons/students-classes";
import WordSearch from "./games/drawing-and-matching/wordSearch";
import SequenceMemorization from "./games/drawing-and-matching/sequenceMemorization";
import LetterRescramble from "./games/drawing-and-matching/letterRescramble";
import Redraw from "./games/drawing-and-matching/redraw";
import LetterMatch from "./games/drawing-and-matching/letterMatch";
import LetterRecognition from "./games/phonetic-recognition/letterRecognition";
import SyllableRecognition from "./games/phonetic-recognition/syllableRecognition";
import WordRecognition from "./games/phonetic-recognition/wordRecognition";
import Timer from "./games/timer";

import "./frontend.css";

export default function Frontend() {
  const [pageNum, setPageNum] = useState(1);
  const [gameNum, setGameNum] = useState(1);
  const [studentViewing, setStudentViewing] = useState(0);
  const [classViewing, setClassViewing] = useState(0);
  const [timerDone, setTimerDone] = useState(false);

  const nextStudentView = (studentViewLength) => {
    if (studentViewing < studentViewLength - 1) {
      setStudentViewing((prev) => prev + 1);
    } else {
      setStudentViewing(0);
    }
  };

  const prevStudentView = (studentViewLength) => {
    if (studentViewing > 0) {
      setStudentViewing((prev) => prev - 1);
    } else {
      setStudentViewing(studentViewLength - 1);
    }
  };

  const nextClassView = (classViewLength) => {
    if (classViewing < classViewLength - 1) {
      setClassViewing((prev) => prev + 1);
    } else {
      setClassViewing(0);
    }
  };

  const prevClassView = (classViewLength) => {
    if (classViewing > 0) {
      setClassViewing((prev) => prev - 1);
    } else {
      setClassViewing(classViewLength - 1);
    }
  };

  return (
    <div className="background-outer">
      <div className="background-inner">
        <div className="left-tab">
          <div className="top-left-tab">
            {pageNum > 4 ? (
              <StudentsClasses
                nextClassView={nextClassView}
                prevClassView={prevClassView}
                nextStudentView={nextStudentView}
                prevStudentView={prevStudentView}
                studentViewing={studentViewing}
                classViewing={classViewing}
                setClassViewing={setClassViewing}
                setStudentViewing={setStudentViewing}
              />
            ) : (
              <Logo />
            )}
          </div>
          <div className="bottom-left-tab">
            {pageNum >= 1 && pageNum <= 4 ? (
              <HomeButtons
                PageChange={(pageNum) => setPageNum(pageNum)}
                pageNum={pageNum}
              />
            ) : (
              <Gamebuttons
                PageChange={(pageNum) => setPageNum(pageNum)}
                GameChange={(gameNum) => setGameNum(gameNum)}
                pageNum={pageNum}
              />
            )}
          </div>
        </div>
        <div className="main-content">
          {pageNum === 1 ? (
            <Home
              PageChange={(pageNum) => setPageNum(pageNum)}
              GameChange={(gameNum) => setGameNum(gameNum)}
              pageNum={pageNum}
            />
          ) : null}
          {pageNum === 2 ? <Classes /> : null}
          {pageNum === 3 ? (
            <Students
              nextClassView={nextClassView}
              prevClassView={prevClassView}
              nextStudentView={nextStudentView}
              prevStudentView={prevStudentView}
              studentViewing={studentViewing}
              classViewing={classViewing}
              setClassViewing={setClassViewing}
              setStudentViewing={setStudentViewing}
            />
          ) : null}
          {pageNum === 4 ? (
            <Stats
              nextClassView={nextClassView}
              prevClassView={prevClassView}
              nextStudentView={nextStudentView}
              prevStudentView={prevStudentView}
              studentViewing={studentViewing}
              classViewing={classViewing}
              setClassViewing={setClassViewing}
              setStudentViewing={setStudentViewing}
            />
          ) : null}
          {pageNum > 4 ? (
            <Tab
              PageChange={(pageNum) => setPageNum(pageNum)}
              GameChange={(gameNum) => setGameNum(gameNum)}
              pageNum={pageNum}
              gameNum={gameNum}
            />
          ) : null}
          {pageNum === 5 && gameNum === 1 ? (
            <>
              <WordSearch
                studentViewing={studentViewing}
                classViewing={classViewing}
                timerDone={timerDone}
                setTimerDone={setTimerDone}
              />{" "}
              <Timer setTimerDone={setTimerDone} />
            </>
          ) : null}
          {pageNum === 5 && gameNum === 2 ? (
            <>
              <SequenceMemorization
                studentViewing={studentViewing}
                classViewing={classViewing}
                timerDone={timerDone}
                setTimerDone={setTimerDone}
              />{" "}
              <Timer setTimerDone={setTimerDone} />
            </>
          ) : null}
          {pageNum === 5 && gameNum === 3 ? (
            <>
              <LetterRescramble
                studentViewing={studentViewing}
                classViewing={classViewing}
                timerDone={timerDone}
                setTimerDone={setTimerDone}
              />{" "}
              <Timer setTimerDone={setTimerDone} />
            </>
          ) : null}
          {pageNum === 5 && gameNum === 4 ? (
            <Redraw
              studentViewing={studentViewing}
              classViewing={classViewing}
            />
          ) : null}
          {pageNum === 5 && gameNum === 5 ? (
            <>
              <LetterMatch
                studentViewing={studentViewing}
                classViewing={classViewing}
                timerDone={timerDone}
                setTimerDone={setTimerDone}
              />{" "}
              <Timer setTimerDone={setTimerDone} />
            </>
          ) : null}
          {pageNum === 6 && gameNum === 1 ? (
            <LetterRecognition
              studentViewing={studentViewing}
              classViewing={classViewing}
            />
          ) : null}
          {pageNum === 6 && gameNum === 2 ? (
            <SyllableRecognition
              studentViewing={studentViewing}
              classViewing={classViewing}
            />
          ) : null}
          {pageNum === 6 && gameNum === 3 ? (
            <WordRecognition
              studentViewing={studentViewing}
              classViewing={classViewing}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
