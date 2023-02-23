import "./classes.css";
import { useState, useEffect } from "react";

import deleteClass from "../functions/deleteClass";
import createClass from "../functions/createClass";
import editClass from "../functions/editClass";
import getClasses from "../functions/getClasses";

export default function Classes() {
  const [classes, setClasses] = useState([]);

  const [editEnable, setEditEnable] = useState(false);
  const [classBeingEdited, setClassBeingEdited] = useState(null);

  const [editTitle, setEditTitle] = useState();

  async function refresh() {
    console.log("refresh");
    const response = await getClasses();
    setClasses(response);
  }

  useEffect(() => {
    refresh();
  }, [editEnable]);

  return (
    <div className="component-holder">
      <div className="classes-holder">
        {classes.map((classItem) => {
          return (
            <button
              className="classes"
              style={
                classBeingEdited?._id === classItem._id
                  ? { backgroundColor: "#9ad08d" }
                  : null
              }
              key={classItem._id}
            >
              <button className="classes-info-name"> {classItem.name} </button>
              <div className="line"></div>
              <button className="classes-info-number">
                {" "}
                Number of Students: {classItem.studentsList.length}{" "}
              </button>
              {!editEnable ? (
                <button
                  className="edit"
                  onClick={() => {
                    setClassBeingEdited(classItem);
                    setEditEnable(true);
                  }}
                ></button>
              ) : null}
            </button>
          );
        })}
        {classes.length < 10 && !editEnable ? (
          <button
            className="add-classes"
            onClick={async () => {
              await createClass();
              refresh();
            }}
          >
            {" "}
            + Create New Class +{" "}
          </button>
        ) : null}
      </div>
      <div className="right-tab">
        {classes.map((classItem) => {
          if (classBeingEdited?._id === classItem._id) {
            return (
              <div>
                <h3 style={{ color: "white" }}> Class Name </h3>
                <input
                  className="class-name"
                  type="text"
                  placeholder={classItem.name}
                  onChange={(e) => setEditTitle(e.target.value)}
                ></input>
                <div className="save-delete">
                  <button
                    className="save"
                    onClick={async () => {
                      let newClass = classItem;

                      if (editTitle != undefined) {
                        newClass.name = editTitle;
                      }

                      setClassBeingEdited(null);

                      await editClass(classItem._id, newClass);
                      setEditEnable(false);
                    }}
                  >
                    {" "}
                    {editTitle === undefined ? "Cancel" : "Save"}{" "}
                  </button>
                  <button
                    className="delete"
                    onClick={async () => {
                      await deleteClass(classItem._id);
                      setEditEnable(false);
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
