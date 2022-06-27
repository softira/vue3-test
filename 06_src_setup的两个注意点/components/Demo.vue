<template>
  <h1>{{school}}</h1>
  <button @click="sendData">sendData</button>
  <hr />
  <slot></slot>
  <hr />
  <slot name="qwd"></slot>
</template>

<script>
  export default {
    name: 'Demo',
    props:['school'],
    emits:['hello'],
    beforeCreate(){
      console.log("beforeCreate");
    },
    setup(props,context){
      // console.log(this);
      // console.log(props)
      // console.log(context.attrs) // 相当于Vue2中的$attrs
      // console.log(context.emit) // 触发自定义事件
      console.log(context.slots) // 插槽
      function sendData(){
        context.emit('hello',666)
      }

      return {
        sendData
      }
    },
  }
</script>

<style>

</style>