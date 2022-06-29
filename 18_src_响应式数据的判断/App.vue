<template>
  <div style="background: lightblue;">
    <h1>这里是App组件</h1>
  </div>
</template>

<script>
  import { ref , reactive , readonly , isRef , isReactive , isReadonly , isProxy } from 'vue'

  export default {
    name: 'App',
    setup() {
      
      let num = ref(0)
      let car = reactive({
        brand:'铃木'
      })
      let car2 = readonly(car)

      console.log(isRef(num));
      console.log(isRef(car));
      console.log(isRef(car2));
      console.log(isReactive(num));
      console.log(isReactive(car));
      console.log(isReactive(car2));
      console.log(isReadonly(car));
      console.log(isReadonly(car2));
      console.log(isProxy(num));
      console.log(isProxy(car));
      console.log(isProxy(car2));

      return {
        
      }
    }
  }
</script>

<style>

</style>
