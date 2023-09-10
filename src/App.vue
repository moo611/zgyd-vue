<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from 'vue-router'

const hello = () => {
  console.log('hello')
}

</script>



<style scoped>
#app {
  margin: 0 0;
  height: 100vh;
  padding: 0 0;


}
</style>
