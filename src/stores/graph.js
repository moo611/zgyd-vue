import { defineStore } from 'pinia'
import myaxios from '../api/myaxios'
const graphStore = defineStore('graphStore', {
  state: () => {
    return {
      name: 'zssssxxx',
      age: 100
    }
  },

  actions: {
    getGraphs(params) {
      return new Promise((resolve, reject) => {
        myaxios
          .get('/graph/list', { params })
          .then(function (response) {
            console.log(response)
            let data = response.data
            if (data.code === 200) {
              resolve(data.data)
            } else {
              reject(data.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    }
  }
})

export default graphStore
