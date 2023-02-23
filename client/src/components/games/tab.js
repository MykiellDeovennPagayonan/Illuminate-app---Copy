import React from 'react'
import "./tab.css"

export default function Tab(props) {
  return (
    <>
      <div className='top-tab'>
        {props.pageNum === 5 ? 
        <>
          <button className='top-tab-button-game' onClick={() => props.GameChange(1)} style={props.gameNum === 1 ? {backgroundColor: "#e1c7a1"} : null}> Word Search </button>
          <button className='top-tab-button-game' onClick={() => props.GameChange(2)} style={props.gameNum === 2 ? {backgroundColor: "#e1c7a1"} : null}> Sequence Memorization </button>
          <button className='top-tab-button-game' onClick={() => props.GameChange(3)} style={props.gameNum === 3 ? {backgroundColor: "#e1c7a1"} : null}> Letter Rescramble </button>
          <button className='top-tab-button-game' onClick={() => props.GameChange(4)} style={props.gameNum === 4 ? {backgroundColor: "#e1c7a1"} : null}> Redraw </button>
          <button className='top-tab-button-game' onClick={() => props.GameChange(5)} style={props.gameNum === 5 ? {backgroundColor: "#e1c7a1"} : null}> Letter Match </button>
        </>       
        : null}
        {props.pageNum === 6 ? 
        <>
          <button className='top-tab-button-game' onClick={() => props.GameChange(1)} style={props.gameNum === 1 ? {backgroundColor: "#e1c7a1"} : null}> Letter Recognition </button>
          <button className='top-tab-button-game' onClick={() => props.GameChange(2)} style={props.gameNum === 2 ? {backgroundColor: "#e1c7a1"} : null}> Syllable Recognition </button>
          <button className='top-tab-button-game' onClick={() => props.GameChange(3)} style={props.gameNum === 3 ? {backgroundColor: "#e1c7a1"} : null}> Word Recognition </button>
        </>       
        : null}
      </div>
    </>
  );
}