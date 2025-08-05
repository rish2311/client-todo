import axios from "axios";

const instance = axios.create({
  baseURL:  "https://server-todo-six.vercel.app/api",
});

export default instance;
