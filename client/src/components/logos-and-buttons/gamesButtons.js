import React from 'react'
import "./homeButtons.css"

export default function Gamebutton(props) {
  return (
    <>
      <button className='button-profile' onClick={() => props.PageChange(5)} style={props.pageNum === 5 ? {backgroundColor: "#9ad08d"} : null }> Drawing and Matching </button>
      <button className='button-profile' onClick={() => props.PageChange(6)} style={props.pageNum === 6 ? {backgroundColor: "#9ad08d"} : null }> Phonological Games </button>
      <button className='button-profile' onClick={() => props.PageChange(7)} style={props.pageNum === 7 ? {backgroundColor: "#9ad08d"} : null }> 3D Models </button>
      <button className='button-profile' onClick={() => props.PageChange(1)} style={{width: 110}}> Home </button>
    </>
  );
}