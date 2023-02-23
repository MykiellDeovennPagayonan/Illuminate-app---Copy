import React from 'react'
import "./home.css"

export default function Home(props) {
  return (
    <>
      <div className='main-home-intro'>
        <h1 className='welcome-class'> Welcome Class</h1>
        <div className='button-game-series'>
          <button className='button-game' onClick={() => {
            props.PageChange(5)
            props.GameChange(1)
            }}> Drawing and Matching </button>
          <button className='button-game'onClick={() => {
            props.PageChange(6)
            props.GameChange(1)
            }}> Phonetic Recognition </button>
          <button className='button-game' onClick={() => {
            props.PageChange(7)
            props.GameChange(1)
            }}> Models </button>
        </div>
      </div>
    </>
  );
}