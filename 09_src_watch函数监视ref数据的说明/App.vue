<template>
  <h1>num:{{num}}</h1>
  <h1>msg:{{msg}}</h1>
  <button @click="num++">num++</button>&nbsp;&nbsp;
  <button @click="msg += '!'">msg += "!"</button>&nbsp;&nbsp;
  <hr />
  <h1>name:{{person.name}}</h1>
  <h1>type:{{person.job.type}}</h1>
  <h1>salary:{{person.job.salary}}K</h1>
  <button @click="person.name += '~'">name += "~"</button>&nbsp;&nbsp;
  <button @click="person.job.salary++">salary++</button>&nbsp;&nbsp;
</template>

<script>
  import { ref, reactive, watch } from 'vue'

  export default {
    name: 'App',
    setup() {
      let num = ref(0)
      let msg = ref('hello')
      let person = ref({
        name: 'ts',
        job:{
          type: '前端',
          salary: 7
        },
      })

      watch(num,(newValue,oldValue)=>{
        console.log('num的值变了',newValue,oldValue)
      })
      watch(num.value,(newValue,oldValue)=>{
        console.log('num.value的值变了',newValue,oldValue)
      })
      watch(() => num.value,(newValue,oldValue)=>{
        console.log('() => num.value的值变了',newValue,oldValue)
      })

      watch(person,(newValue,oldValue)=>{
        console.log('person的值变了',newValue,oldValue)
      })
      watch(person.value,(newValue,oldValue)=>{
        console.log('person.value的值变了',newValue,oldValue)
      })
      watch(()=>person.value,(newValue,oldValue)=>{
        console.log('()=>person.value的值变了',newValue,oldValue)
      })

      
      return {
        num,
        msg,
        person
      }
    }
  }
</script>

<style>
  
</style>
