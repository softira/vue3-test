<template>
  <h1>{{person}}</h1>
  <h1>name:{{name}}</h1>
  <h1>type:{{job.type}}</h1>
  <h1>salary:{{salary}}K</h1>
  <button @click="name += '~'">name += "~"</button>&nbsp;&nbsp;
  <button @click="salary++">salary++</button>&nbsp;&nbsp;
</template>

<script>
  import { reactive, toRef, toRefs } from 'vue'

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

      // let salary = toRef(person.job,'salary')
      // let persons = toRefs(person)
      // console.log(persons);

      return {
        person,
        salary:toRef(person.job,'salary'),
        ...toRefs(person)
      }
    }
  }
</script>

<style>
  
</style>
