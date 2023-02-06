import axios from "axios";

async function getData(url: string) {
  return axios.get(url)
  .then((res) => res.data);
}

export default getData;
