<template>
  <div>
    <p>姓：</p>
    <input type="text" v-model="person.firstName">
  </div>
  <div>
    <p>名：</p>
    <input type="text" v-model="person.lastName">
  </div>
  <div>
    <p>姓名：</p>
    <input type="text" v-model="person.fullName">
  </div>
  <h1>{{person.fullName}}</h1>
</template>

<script>
  import {reactive,computed} from 'vue'

  export default {
    name: 'App',
    setup() {
      let person = reactive({
        firstName:'',
        lastName:'',
      })
      
      // 计算属性（简写）,没有考虑计算属性被修改的情况
      // person.fullName = computed(() =>{
      //   return person.firstName + '-' + person.lastName
      // })
      // 计算属性完整写法
      person.fullName = computed({
        get(){
          return person.firstName + '-' + person.lastName
        },
        set(val){
          let nameStr = val.split('-')
          person.firstName = nameStr[0]
          person.lastName = nameStr[1]
        }
      })

      return {
        person
      }
    }
  }
</script>

<style>
  
</style>
