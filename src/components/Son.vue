
<template>
  <div style="background: lightcoral;">
    <h1>这里是子组件</h1>
    <h1>{{car}}</h1>
    <button @click="car+='~'">acr++</button>
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
  export default {
    name:'Son',
    setup(){
      let car = inject('car')

      return {
        car
      }
    }
  }
</script>

<style>

</style>