<template>
  <div style="background: lightblue;">
    <h1>这里是App组件</h1>
    <Demo1></Demo1>
  </div>
</template>

<script>
  import Demo1 from './components/Demo1.vue'

  export default {
    name: 'App',
    components:{Demo1},
    setup() {

      return {
        
      }
    }
  }
</script>

<style>

</style>
