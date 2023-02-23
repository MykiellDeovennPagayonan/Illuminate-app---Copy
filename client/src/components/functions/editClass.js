import Axios from "axios";

export default async function editClass(id, updatedClass) {
  Axios.put("http://localhost:7000/updateClass/" + id, updatedClass)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}