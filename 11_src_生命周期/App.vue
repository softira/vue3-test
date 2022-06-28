<template>
  <button @click="isShow = !isShow">show or hdie</button>
  <Demo v-if='isShow'></Demo>
</template>

<script>
  import { ref } from 'vue'
  import Demo from './components/Demo'

  export default {
    name: 'App',
    components:{Demo},
    setup() {
      let isShow = ref(true)
      
      return {
        isShow
      }
    }
  }
</script>

<style>
  
</style>
