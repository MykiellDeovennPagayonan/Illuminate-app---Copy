import Axios from "axios";

const newClass = {
  name: "New Class",
  studentsList: [{
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
    }
  }],
  edit: true
}

export default async function createClass() {
  Axios.post("http://localhost:7000/createClass", newClass)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}