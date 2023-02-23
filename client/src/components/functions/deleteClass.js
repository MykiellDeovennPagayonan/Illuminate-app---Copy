import Axios from "axios";

export default async function deleteClass(id) {
  Axios.delete("http://localhost:7000/deleteClass/" + id)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
}