import "./chartStyles.css";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import getClasses from "../functions/getClasses";

export default function LetterMatchChart(props) {
  const [classes, setClasses ] = useState(undefined)

  async function refresh () {
    const response = await getClasses();
    setClasses(response)
  }

  refresh()

  let data = []
  if (classes !== undefined){
    for (let i = 0; i < classes[props.classViewing]?.studentsList[props.studentViewing].stats.freeDrawing.length; i++){
      data.push({
        attempt: String("Attempt: " + (i+ 1)),
        completed: Number(classes[props.classViewing].studentsList[props.studentViewing].stats.freeDrawing[i])
      })
    }
  }

  return (
    <BarChart
    width={310}
    height={180}
    data={data}
    margin={{
      top: 5,
      right: 10,
      left: 10,
      bottom: 0
    }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="attempt" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="completed" fill="#8884d8" />
    </BarChart>
  );
}
