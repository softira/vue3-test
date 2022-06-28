<template>
  <h1>num:{{num}}</h1>
  <h1>msg:{{msg}}</h1>
  <button @click="num++">num++</button>&nbsp;&nbsp;
  <button @click="msg += '!'">msg += "!"</button>&nbsp;&nbsp;
  <hr />
  <h1>name:{{person.name}}</h1>
  <h1>type:{{person.job.type}}</h1>
  <h1>salary:{{person.job.salary}}K</h1>
  <button @click="person.name += '~'">name += "~"</button>&nbsp;&nbsp;
  <button @click="person.job.salary++">salary++</button>&nbsp;&nbsp;
</template>

<script>
  import { ref, reactive, watch } from 'vue'

  export default {
    name: 'App',
    setup() {
      let num = ref(0)
      let msg = ref('hello')
      let person = reactive({
        name: 'ts',
        job:{
          type: '前端',
          salary: 7
        },
      })

      //第一种情况，监视ref定义的一个响应式数据
      // watch(num,(newValue,oldValue)=>{
      //   console.log('num数据改变了',newValue,oldValue);
      // })
      // 第二种情况，监视ref定义的多个响应式数据
      // watch([num,msg],(newValue,oldValue)=>{
      //   console.log('num和msg数据改变了',newValue,oldValue);
      // })
      /* 
       * 第三种情况，监视reactive定义的一个响应式数据，
       * 注意：此处无法正确的获取oldValue；强制开启了深度监视（deep配置项无效）
       */
      // watch(person,(newValue,oldValue)=>{
      //   console.log('person的数据改变了',newValue,oldValue)
      // },{immediate:true,deep:false})
      // 第四种情况，监视reactive定义的一个数据中的某个属性
      // watch(() => person.name,(newValue,oldValue)=>{
      //   console.log('person.name的数据改变了',newValue,oldValue)
      // },{immediate:true})
      // 第四种情况，监视reactive定义的一个数据中的多个个属性
      // watch([() => person.name,() => person.job],(newValue,oldValue)=>{
      //   console.log('person.name的数据改变了',newValue,oldValue)
      // },{immediate:true})

      // 特殊情况，监视reactive定义的一个数据中的对象，deep配置有效
      watch(() => person.job,(newValue,oldValue)=>{
        console.log('person.job的数据改变了',newValue,oldValue)
      },{immediate:true,deep:true})

      return {
        num,
        msg,
        person
      }
    }
  }
</script>

<style>
  
</style>
