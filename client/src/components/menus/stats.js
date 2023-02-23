import React, { useState, useEffect } from 'react'
import "./stats.css"
import WordSearchChart from '../charts/wordSearchCharts';
import SequenceMemorizationChart from '../charts/sequenceMemorizationCharts';
import LetterRescrambleChart from '../charts/letterRescrambleCharts';
import RedrawChart from '../charts/redrawCharts';
import LetterMatchChart from '../charts/letterMatchChart';
import LetterRecognitionChart from '../charts/letterRecognitionChart';
import SyllableRecognitionChart from '../charts/syllableRecognitionChart';
import WordRecognitionChart from '../charts/wordRecognitionChart';
import WordSearchDetailed from './stats-detailed/wordSearchDetailed';

import getClasses from "../functions/getClasses";

export default function Stats(props) {
  const [ classes, setClasses ] = useState([])
  const [ statViewing, setStatViewing ] = useState(0)
  const [ numClasses, setNumClasses ] = useState(0)
  const [ numStudents, setNumStudents ] = useState(0)

  async function refresh () {
    const classesIni = await getClasses();
    let studentsInitial = []
    for (let i = 0; i < classesIni[props.classViewing].studentsList.length; i++) {
      studentsInitial.push(classesIni[props.classViewing].studentsList[i])
    }
    setNumClasses(classesIni.length)
    setNumStudents(studentsInitial.length)
    setClasses(classesIni)
  }

  useEffect(() => {
    refresh()
  }, [props.studentViewing, props.classViewing])

  return (
    <>
      <div className="right-tab-stats">
      <div className="class-title"> Class Selected </div>
        {classes.map((classItem, index) => {
          if (props.classViewing === index){
            return (
            <>
              <button className="class-selected"> {classItem.name} </button>
              <div className="button-container">
                <button className="prev" onClick={() => {props.setStudentViewing(0); props.prevClassView(numClasses)}}> Prev </button>
                <button className="next" onClick={() => {props.setStudentViewing(0); props.nextClassView(numClasses)}}> Next </button>
              </div>
              <div className="class-title"> Student Name </div>
              <button className="student-name"> {classItem.studentsList[props.studentViewing].name} </button>
              <div className="button-container">
                <button className="prev" onClick={() => {props.prevStudentView(numStudents)}}> Prev </button>
                <button className="next" onClick={() => {props.nextStudentView(numStudents)}}> Next </button>
              </div>
            </>
            )       
          } else { return null }} 
        )}
      </div>
      <div className='stats-main-body'>
        {statViewing === 0 ? 
        <>
          <div className='games-stats-1'>
            <div className='games-stats-content' onClick={() => {setStatViewing(1)}}>
              <h2 style={{color: "black", textAlign: "left", margin: 5, fontSize: 15}}> Word Search </h2>
            <WordSearchChart classViewing={props.classViewing} studentViewing={props.studentViewing}/>
            </div>
            <div className='games-stats-content'>
              <h2 style={{color: "black", textAlign: "left", margin: 5, fontSize: 15}}> Sequence Memorization </h2>
            <SequenceMemorizationChart classViewing={props.classViewing} studentViewing={props.studentViewing}/>
            </div>
            <div className='games-stats-content'>
              <h2 style={{color: "black", textAlign: "left", margin: 5, fontSize: 15}}> Letter Rescramble </h2>
            <LetterRescrambleChart classViewing={props.classViewing} studentViewing={props.studentViewing}/>
            </div>
            <div className='games-stats-content' style={{marginLeft: "auto", marginRight: 7}}>
              <h2 style={{color: "black", textAlign: "left", margin: 5, fontSize: 15}}> Redraw </h2>
            <RedrawChart classViewing={props.classViewing} studentViewing={props.studentViewing}/>
            </div>
            <div className='games-stats-content' style={{marginLeft: 7, marginRight: "auto"}}>
              <h2 style={{color: "black", textAlign: "left", margin: 5, fontSize: 15}}> Letter Match </h2>
            <LetterMatchChart classViewing={props.classViewing} studentViewing={props.studentViewing}/>
            </div>
          </div>
          <div className='games-stats-2'>
            <div className='games-stats-content'>
              <h2 style={{color: "black", textAlign: "left", margin: 5, fontSize: 15}}> Letter Recognition </h2>
            <LetterRecognitionChart classViewing={props.classViewing} studentViewing={props.studentViewing}/>
            </div>
            <div className='games-stats-content'>
              <h2 style={{color: "black", textAlign: "left", margin: 5, fontSize: 15}}> Syllable Recognition </h2>
            <SyllableRecognitionChart classViewing={props.classViewing} studentViewing={props.studentViewing}/>
            </div>
            <div className='games-stats-content'>
              <h2 style={{color: "black", textAlign: "left", margin: 5, fontSize: 15}}> Word Recognition </h2>
            <WordRecognitionChart classViewing={props.classViewing} studentViewing={props.studentViewing}/>
            </div>
          </div>
        </>
      : null }
      {statViewing === 1 ? <WordSearchDetailed classViewing={props.classViewing} studentViewing={props.studentViewing} setStatViewing={setStatViewing}/> : null}
      </div>
    </>
  );
}