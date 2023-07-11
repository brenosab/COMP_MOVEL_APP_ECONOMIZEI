import axios from "axios";

export default axios.create({
  baseURL: "https://api-economizei-4lmmzmqb4a-rj.a.run.app",
  headers: {
    "Content-type": "application/json",
  },
});