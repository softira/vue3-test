<template>
  <h1>{{data.name}}</h1>
  <h1>{{data.age}}</h1>
  <button>changeInfo</button>
  <hr />
  <Demo :school="data.school" @hello="showMsg">
    <span>12</span>
    <template v-slot:qwd>
      <span>32</span>
    </template>
  </Demo>
</template>

<script>
  import {reactive} from 'vue'
  import Demo from './components/Demo'

  export default {
    name: 'App',
    components:{Demo},
    setup() {
      let data = reactive({
        name:'ts',
        age:24,
        school:'cqnu'
      })

      function showMsg(val){
        console.log(val)
      }

      return {
        data,
        showMsg
      }
    }
  }
</script>

<style>
  
</style>
