import React, { useState, useEffect } from 'react'
import "./wordSearchDetailed.css"

import getClasses from "../../functions/getClasses";

export default function WordSearchDetailed(props) {
  const [ boxes, setBoxes ] = useState([])
  const [ words, setWords ] = useState([])
  const [ attemptViewing, setAttemptViewing ] = useState(0)
  const [ setViewing, setSetViewing ] = useState(0)
  const [ numAttempts, setNumAttempts ] = useState(0)
  const [ numSets, setNumSets ] = useState(0)

  const nextAttemptView = (numAttempts) => {
    if (attemptViewing < numAttempts - 1) {
      setAttemptViewing((prev) => prev + 1);
    } else {
      setAttemptViewing(0);
    }
  };

  const prevAttemptView = (numAttempts) => {
    if (attemptViewing > 0) {
      setAttemptViewing((prev) => prev - 1);
    } else {
      setAttemptViewing(numAttempts - 1);
    }
  };

  const nextSetView = (numSets) => {
    if (setViewing < numSets - 1) {
      setSetViewing((prev) => prev + 1);
    } else {
      setSetViewing(0);
    }
  };

  const prevSetView = (numSets) => {
    if (setViewing > 0) {
      setSetViewing((prev) => prev - 1);
    } else {
      setSetViewing(numSets - 1);
    }
  };

  async function refresh () {
    const classesIni = await getClasses();
    setNumAttempts(classesIni[props.classViewing].studentsList[props.studentViewing].stats.wordSearch.length)
    setNumSets(classesIni[props.classViewing].studentsList[props.studentViewing].stats.wordSearch[attemptViewing].length)
    setBoxes(classesIni[props.classViewing].studentsList[props.studentViewing].stats.wordSearch[attemptViewing][setViewing].boxes)
    setWords(classesIni[props.classViewing].studentsList[props.studentViewing].stats.wordSearch[attemptViewing][setViewing].words)
  }

  useEffect(() => {
    refresh()
  }, [props.studentViewing, props.classViewing, attemptViewing, setViewing])

  return (
    <>
      <div className='conatiner-stats'>
        <div className='container-top'>
          <button className='back' onClick={() => {props.setStatViewing(0)}}> {"< Back"} </button>
          <button className='stat-title'> Word Search </button>
        </div>
        <div className='container-bottom'>
          <div className='details-left'>
            <div className='switches'>
              <div className='attempts'>
                <button className='change' onClick={() => {prevAttemptView(numAttempts); setViewing(0)}}> Previous </button>
                <h2 className='name'> Attempt {attemptViewing + 1} </h2>
                <button className='change' onClick={() => {nextAttemptView(numAttempts); setViewing(0)}}> Next </button>
              </div>
              <div className='sets'>
                <button className='change' onClick={() => {prevSetView(numSets)}}> Previous </button>
                <h2 className='name'> Set {setViewing + 1} </h2>
                <button className='change' onClick={() => {nextSetView(numSets)}}> Next </button>
              </div>
            </div>
            <button className='stats-content'>
              <div className='grid-boxes'>
                {boxes.map((boxes) => {
                  if (boxes.activation === false) {
                    return (<button className='boxes-words'> {boxes.letter} </button>)
                  } else{
                    return (<button className='boxes-words-enlarged'> {boxes.letter} </button>)
                  }
                })}
              </div>
              <div className='words-lined'>
                {words.map((words) => {
                  return(<button className='words-chosen'> {words.word} </button>)
                })}
              </div>
            </button>
          </div>
          <div className='details-right'>
          </div>
        </div>
      </div>
    </>
  );
}