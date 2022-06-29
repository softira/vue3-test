<template>
  <div style="background: lightblue;">
    <h1>这里是祖组件</h1>
    <button @click="car+='~'">acr++</button>
    <Father></Father>
  </div>
</template>

<script>
  import { ref , provide } from 'vue'
  import Father from './components/Father'

  export default {
    name: 'App',
    components:{Father},
    setup() {
      
      let car = ref('铃木')

      provide ('car',car)

      return {
        car
      }
    }
  }
</script>

<style>

</style>
