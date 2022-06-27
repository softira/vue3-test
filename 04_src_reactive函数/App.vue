<template>
  <h1>{{person.name}}</h1>
  <h1>{{person.age}}</h1>
  <h2>{{person.job.type}}</h2>
  <h2>{{person.job.salary}}</h2>
  <h3 v-for="h in person.hobby" :key="h.index">{{h}}</h3>
  <button @click="changeInfo">changeInfo</button>
</template>

<script>
  import {reactive} from 'vue'

  export default {
    name: 'App',
    setup() {
      let person = reactive({
        name: 'ts',
        age: 24,
        job:{
          type:'前端',
          salary:'7k',
          a:{
            b:{
              c:1
            }
          }
        },
        hobby:['抽烟','喝酒','烫头']
      })
      function changeInfo(){
        person.name = 'hxr';
        person.age = '25';
        person.job.type = '后端';
        person.job.salary = '10k';
        console.log(person.job.a.b.c);
        person.hobby[0] = '学习'
      }

      // 返回一个对象（常用）
      return {
        person,
        changeInfo,
      }
    }
  }
</script>

<style>
  
</style>
