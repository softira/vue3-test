<template>
  <h1>{{person}}</h1>
  <h1>name:{{person.name}}</h1>
  <h1>type:{{person.job.type}}</h1>
  <h1>salary:{{person.job.salary}}K</h1>
  <button @click="person.name += '~'">name += "~"</button>&nbsp;&nbsp;
  <button @click="person.job.salary++">salary++</button>&nbsp;&nbsp;
  <hr />
  <h1>x.y:{{x.y}}</h1>
  <button @click="x={y:2}">x={y:2}</button>&nbsp;&nbsp;
  <button @click="x.y++">x.y++</button>&nbsp;&nbsp;
</template>

<script>
  import { shallowRef, shallowReactive} from 'vue'

  export default {
    name: 'App',
    setup() {
      
      let person = shallowReactive({
        name: 'ts',
        job:{
          type: '前端',
          salary: 7
        },
      })

      let x = shallowRef({
        y:1
      })

      return {
        person,
        x
      }
    }
  }
</script>

<style>
  
</style>
