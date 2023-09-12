import { defineStore } from 'pinia'
import myaxios from '../api/myaxios'
const edgeStore = defineStore('edgeStore', {
  state: () => {
    return {
      name: 'zssss',
      age: 100,
    }
  },
  actions: {
    getEdgePage(params) {
      return new Promise((resolve, reject) => {
        myaxios
          .post('/edge/list', params)
          .then(function (response) {

            console.log(response)
            let data = response.data  
            if(data.code === 200){
              resolve(data.data)
            } else{
              reject(data.msg)
            } 
           
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },

    addEdge(params){
      return new Promise((resolve, reject) => {
        myaxios
        .post('/edge/add', params)
        .then(function (response) {

          console.log(response)
          let data = response.data  
          if(data.code === 200){
            resolve(data.data)
          } else{
            reject(data.msg)
          } 
         
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })

      })

    },

    updateEdge(params){
      return new Promise((resolve, reject) => {
        myaxios
          .put('/edge/update', params)
          .then(function (response) {

            console.log(response)
            let data = response.data  
            if(data.code === 200){
              resolve(data.data)
            } else{
              reject(data.msg)
            } 
           
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },
    deleteEdge(id){
      return new Promise((resolve, reject) => {
        myaxios.delete('/edge/del',{params:{id:id}}).then(function (response) {

          console.log(response)
          let data = response.data  
          if(data.code === 200){
            resolve(data.data)
          } else{
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

export default edgeStore
