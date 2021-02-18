import axios from "axios"

const dev_mode = process.env.NODE_ENV === 'development' ? 1 : 0

const customAxios = axios.create({
  baseURL: dev_mode ? 'http://localhost:3000/' : '/ui/vending/'
})

export default customAxios
