<template>
  <div style="background: lightpink;">
    <h1>这里是父组件</h1>
    <Son/>
  </div>
</template>

<script>
  import Son from './Son'

  export default {
    name:'Father',
    components:{Son},
    setup(){

    }
  }
</script>

<style>

</style>
