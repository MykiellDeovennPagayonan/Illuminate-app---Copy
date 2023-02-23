import React from 'react'
import "./homeButtons.css"

export default function HomeButtons(props) {
  return (
    <>
      <button className='button-profile' onClick={() => props.PageChange(1)} style={props.pageNum === 1 ? {backgroundColor: "#9ad08d"} : null }> Games </button>
      <button className='button-profile' onClick={() => props.PageChange(2)} style={props.pageNum === 2 ? {backgroundColor: "#9ad08d"} : null }> Classes </button>
      <button className='button-profile' onClick={() => props.PageChange(3)} style={props.pageNum === 3 ? {backgroundColor: "#9ad08d"} : null }> Students </button>
      <button className='button-profile' onClick={() => props.PageChange(4)} style={props.pageNum === 4 ? {backgroundColor: "#9ad08d"} : null }> Statistics </button>
    </>
  );
}