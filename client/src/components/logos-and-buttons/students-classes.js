import "./students-classes.css";
import { useState, useEffect } from "react";

export default function StudentsClasses(props) {
  const [numClasses, setNumClasses] = useState(0);
  const [numStudents, setNumStudents] = useState(0);

  function refresh() {
    const classesIni = props.classes;
    let studentsInitial = [];
    for (
      let i = 0;
      i < classesIni[props.classViewing].studentsList.length;
      i++
    ) {
      studentsInitial.push(classesIni[props.classViewing].studentsList[i]);
    }
    setNumClasses(classesIni.length);
    setNumStudents(studentsInitial.length);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="student-classes-holder">
      <div className="class-title-games"> Class Selected </div>
      {props.classes.map((classItem, index) => {
        if (props.classViewing === index) {
          return (
            <>
              <button className="class-selected"> {classItem.name} </button>
              <div className="button-container">
                <button
                  className="prev"
                  onClick={() => {
                    props.setStudentViewing(0);
                    props.prevClassView(numClasses);
                  }}
                >
                  {" "}
                  Prev{" "}
                </button>
                <button
                  className="next"
                  onClick={() => {
                    props.setStudentViewing(0);
                    props.nextClassView(numClasses);
                  }}
                >
                  {" "}
                  Next{" "}
                </button>
              </div>
              <div className="class-title-games"> Student Name </div>
              <button className="student-name">
                {" "}
                {classItem.studentsList[props.studentViewing].name}{" "}
              </button>
              <div className="button-container">
                <button
                  className="prev"
                  onClick={() => {
                    props.prevStudentView(numStudents);
                  }}
                >
                  {" "}
                  Prev{" "}
                </button>
                <button
                  className="next"
                  onClick={() => {
                    props.nextStudentView(numStudents);
                  }}
                >
                  {" "}
                  Next{" "}
                </button>
              </div>
            </>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
