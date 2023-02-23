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

export default function RedrawChart(props) {
  const [classes, setClasses ] = useState(undefined)

  async function refresh () {
    const response = await getClasses();
    setClasses(response)
  }

  refresh()

  let data = []
  if (classes !== undefined) {
    for (let i = 0; i < classes[props.classViewing]?.studentsList[props.studentViewing].stats.lineDrawing.length; i++){
      data.push({
        attempt: String("Attempt: " + (i + 1)),
        completed: Number(classes[props.classViewing].studentsList[props.studentViewing].stats.lineDrawing[i])
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
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  );
}
