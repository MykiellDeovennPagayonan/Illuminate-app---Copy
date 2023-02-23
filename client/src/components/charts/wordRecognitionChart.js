import "./chartStyles.css";
import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import getClasses from "../functions/getClasses";

export default function WordRecognitionChart(props) {
  const [classes, setClasses ] = useState(undefined)

  async function refresh () {
    const response = await getClasses();
    setClasses(response)
  }

  refresh()

  const COLORS = ["#00FF00", "#FF0000"];

  let data = []
  console.log()
  if (classes !== undefined) {
    console.log(classes[props.classViewing])
    data = [
      {name: "answers right", value: classes[props.classViewing]?.studentsList[props.studentViewing].stats.wordRecognition[0]},
      {name: "answers wrong", value: classes[props.classViewing]?.studentsList[props.studentViewing].stats.wordRecognition[1]}
    ]
  }

  return (
    <PieChart width={310} height={180}>
      <Pie
        data={data}
        cx={155}
        cy={90}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Pie
        data={data}
        cx={420}
        cy={200}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
