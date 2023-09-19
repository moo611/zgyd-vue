
import axios from "axios";

// let myaxios = axios.create({
//   baseURL: 'http://localhost:5173/api',
//   timeout: 3000,
// });
let myaxios = axios.create({
  baseURL: 'http://8.130.95.118/api',
  timeout: 3000,
})

export default myaxios