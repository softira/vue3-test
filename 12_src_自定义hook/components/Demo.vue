<template>
  <h1>num:{{num}}</h1>
  <button @click="num++">num++</button>
  <h2>鼠标点击的位置为x：{{point.x}},y：{{point.y}}</h2>
</template>

<script>
  import { ref } from 'vue';
  import usePoint from '../hooks/usePoint'
  
  export default {
    name:'Demo',
    setup(){
      let num = ref(0);
      let point = usePoint()

      return {
        num,
        point
      }
    },
  }
</script>

<style>

</style>