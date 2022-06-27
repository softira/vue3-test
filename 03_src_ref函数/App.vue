<template>
  <h1>{{name}}</h1>
  <h1>{{age}}</h1>
  <h2>{{job.type}}</h2>
  <h2>{{job.salary}}</h2>
  <button @click="changeInfo">changeInfo</button>
  <button @click="changeJob">changeInfo</button>
</template>

<script>
  import {ref} from 'vue'

  export default {
    name: 'App',
    setup() {
      let name = ref('ts'),
        age = ref(24),
        job = ref({
          type:'前端',
          salary:'7k'
        });
      function changeInfo(){
        name.value = 'hxr';
        age.value = '25';
      }
      function changeJob(){
        // job.value.type.value = '后端';
        // job.value.salary.value = '10k';
        job.value.type = '后端';
        job.value.salary = '10k';
      }

      // 返回一个对象（常用）
      return {
        name,
        age,
        job,
        changeInfo,
        changeJob
      }
    }
  }
</script>

<style>
  
</style>
