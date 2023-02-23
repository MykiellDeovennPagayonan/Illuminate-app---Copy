import Axios from "axios";

export default async function getClasses() {
  return Axios.get("http://localhost:7000/getClasses").then((response) => {
    return response.data;
  });
}