import { defineStore } from 'pinia'
import myaxios from '../api/myaxios'
const nodeStore = defineStore('nodeStore', {
  state: () => {
    return {
      name: 'zs',
      age: 100
    }
  },

  actions: {
    getNodePage(params) {
      return new Promise((resolve, reject) => {
        myaxios
          .post('/node/list', params)
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

    addNode(params){
      return new Promise((resolve, reject) => {
        myaxios
        .post('/node/add', params)
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

    updateNode(params){
      return new Promise((resolve, reject) => {
        myaxios
          .put('/node/update', params)
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
    deleteNode(id){
      return new Promise((resolve, reject) => {
        myaxios.delete('/node/del',{params:{id:id}}).then(function (response) {

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

export default nodeStore
