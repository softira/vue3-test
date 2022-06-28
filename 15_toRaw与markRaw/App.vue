<template>
  <h1>{{person}}</h1>
  <h1>name:{{name}}</h1>
  <h1>type:{{job.type}}</h1>
  <h1>salary:{{job.salary}}K</h1>
  <h1 v-show="person.car">{{person.car}}</h1>
  <button @click="name += '~'">name += "~"</button>&nbsp;&nbsp;
  <button @click="job.salary++">salary++</button>&nbsp;&nbsp;
  <button @click="showRaw">toRaw</button>&nbsp;&nbsp;
  <button @click="addCar">addCar</button>&nbsp;&nbsp;
  <button @click="changeCar" v-show="person.car">changeCar</button>&nbsp;&nbsp;
</template>

<script>
  import { markRaw, reactive, toRaw, toRefs } from 'vue'

  export default {
    name: 'App',
    setup() {
      
      let person = reactive({
        name: 'ts',
        job:{
          type: '前端',
          salary: 7
        },
      })

      function showRaw(){
        let p = toRaw(person)
        console.log(person);
        console.log(p);
      }

      function addCar(){
        person.car = markRaw({brand:'铃木'})
      }

      function changeCar(){
        person.car.brand = '川崎',
        console.log(person.car);
      }
      
      return {
        person,
        ...toRefs(person),
        showRaw,
        addCar,
        changeCar
      }
    }
  }
</script>

<style>
  
</style>
