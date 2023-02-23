import "./students.css";
import { useState, useEffect } from "react";

import editClass from "../functions/editClass";
import getClasses from "../functions/getClasses";

export default function Students(props) {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [editName, setEditName] = useState();
  const [editEnable, setEditEnable] = useState(false);
  const [numClasses, setNumClasses] = useState(0);

  async function refresh() {
    const classesIni = await getClasses();
    let studentsInitial = [];
    for (
      let i = 0;
      i < classesIni[props.classViewing].studentsList.length;
      i++
    ) {
      studentsInitial.push(classesIni[props.classViewing].studentsList[i]);
    }
    setNumClasses(classesIni.length);
    setStudents(studentsInitial);
    setClasses(classesIni);
  }

  useEffect(() => {
    refresh();
  }, [props.studentViewing, props.classViewing]);

  async function addStudent() {
    let newClass = classes[props.classViewing];
    let studentsListArray = [...classes[props.classViewing].studentsList];
    studentsListArray.push({
      name: "",
      stats: {
        wordSearch: [],
        sequenceMemorization: [],
        letterRescramble: [],
        lineDrawing: [0, 0],
        freeDrawing: [],
        letterRecognition: [0, 0],
        syllableRecognition: [0, 0],
        wordRecognition: [0, 0]
      },
    });
    newClass.studentsList = studentsListArray;
    editClass(classes[props.classViewing]._id, newClass);
    refresh();
  }

  async function deleteStudent() {
    let newClass = classes[props.classViewing];
    let studentsListArray = [...classes[props.classViewing].studentsList];
    if (studentsListArray.length > 1) {
      studentsListArray.splice(props.studentViewing, 1);
      newClass.studentsList = studentsListArray;
      editClass(classes[props.classViewing]._id, newClass);

      if (props.studentViewing === studentsListArray.length - 0) {
        props.setStudentViewing((prev) => prev - 1);
      }
    }
    refresh();
  }

  return (
    <div className="component-holder">
      <div className="students-holder">
        <h2 className="students-title"> Students </h2>
        <div className="students-holder-inner">
          {students.map((student, index) => {
            return (
              <button
                className="students"
                onClick={() => {
                  props.setStudentViewing(index);
                  refresh();
                }}
                style={
                  props.studentViewing === index
                    ? { backgroundColor: "#9ad08d" }
                    : null
                }
              >
                {" "}
                {student.name}{" "}
              </button>
            );
          })}
          {students.length < 45 ? (
            <button className="add-student" onClick={async () => addStudent()}>
              {" "}
              + Add Student + {" "}
            </button>
          ) : null}
        </div>
      </div>
      <div className="right-tab">
        <div className="class-title"> Class Selected </div>
        {classes.map((classItem, index) => {
          if (props.classViewing === index) {
            return (
              <>
                <button className="class-selected"> {classItem.name} </button>
                <div className="button-container">
                  <button
                    className="prev"
                    onClick={() => {
                      props.prevClassView(numClasses);
                      props.setStudentViewing(0);
                    }}
                  >
                    {" "}
                    Prev
                  </button>
                  <button
                    className="next"
                    onClick={() => {
                      props.nextClassView(numClasses);
                      props.setStudentViewing(0);
                    }}
                  >
                    {" "}
                    Next{" "}
                  </button>
                </div>
                {editEnable ? (
                  <>
                    <div className="class-title"> Student Name </div>
                    <input
                      className="student-name"
                      type="text"
                      placeholder={
                        classItem.studentsList[props.studentViewing].name
                      }
                      onChange={(e) => setEditName(e.target.value)}
                    ></input>
                    <div className="button-container">
                      <button
                        className="save"
                        onClick={async () => {
                          let newClass = classItem;
                          if (editName !== undefined) {
                            newClass.studentsList[props.studentViewing].name =
                              editName;
                            await editClass(classItem._id, newClass);
                          }
                          setEditEnable(false);
                          setEditName(undefined);
                          refresh();
                        }}
                      >
                        {" "}
                        {editName === undefined ? "Cancel" : "Save"}{" "}
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          deleteStudent(classItem._id);
                        }}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="class-title"> Student Name </div>
                    <button className="student-name">
                      {" "}
                      {classItem.studentsList[props.studentViewing]?.name}{" "}
                    </button>
                    <button
                      className="edit-student"
                      onClick={() => {
                        setEditEnable(true);
                      }}
                    >
                      {" "}
                      Edit
                    </button>
                  </>
                )}
              </>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
