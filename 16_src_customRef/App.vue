<template>
  <input type="text" v-model="keyWord">
  <br>
  <h1>{{keyWord}}</h1>
</template>

<script>
  import { customRef } from 'vue'

  export default {
    name: 'App',
    setup() {
      
      // 自定义的ref
      function myValueRef(value){
        let timer
        return customRef((track,trigger) => {
          return {
            get(){
              console.log('getter被调用')
              track() // 通知Vue追踪value的变化
              return value
            },
            set(newValue){
              clearTimeout(timer)
              console.log('setter被调用')
              value = newValue
              timer = setTimeout(()=>{
                trigger() // 通知Vue去重新解析模板
              },1000)
            }
          }
        })
      }
      let keyWord = myValueRef('')
      
      return {
        keyWord
      }
    }
  }
</script>

<style>
  
</style>
