<template>
  <h1>{{name}}</h1>
  <h1>{{age}}</h1>
  <h1>b:{{b}}</h1>
  <button @click="showInfo1">showInfo1</button>
  <button @click="showInfo2">showInfo2</button>
  <button @click="showInfo3">showInfo3</button>
</template>

<script>
  // import {h} from 'vue'

  export default {
    name: 'App',
    data() {
      return {
        a:1,
        b:2
      }
    },
    methods: {
      showInfo1(){
        console.log(this.a+'@@@@'+this.name+'@@@@'+this.b);
      },
    },
    // 此处只是测试一下setup，暂时不考虑响应式的问题
    setup() {
      let name = 'ts',
        age = 24,
        b = 22
      function showInfo2(){
        console.log(`name:${name}+age:${age}`);
      }
      function showInfo3(){
        console.log(this.a);
      }

      // 返回一个对象（常用）
      return {
        name,
        age,
        b,
        showInfo2,
        showInfo3
      }
      
      // 返回一个函数（渲染函数）
      // return () => h('h1' , 'ts')
    }
  }
</script>

<style>
  
</style>
