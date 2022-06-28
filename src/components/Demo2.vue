<template>
  <h2>鼠标点击的位置为x：{{point.x}},y：{{point.y}}</h2>
</template>

<script>
  import usePoint from '../hooks/usePoint'
  
  export default {
    name:'Demo2',
    setup(){
      let point = usePoint()

      return {
        point
      }
    },
  }
</script>

<style>

</style>