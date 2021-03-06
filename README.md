# 笔记

## 常用Composition API

1. 拉开序幕的setup

   1. 理解：Vue3中的一个新的配置项，值为一个函数。
   2. setup是所有Composition API （组合API）“表演的舞台”
   3. 组件中所用到的：数据、方法等等，均要配置在setup中。
   4. setup函数的两种返回值：
   5. **若返回一个对象，则对象中的属性、方法，在模板中均可直接使用**
   6. 若返回一个渲染函数，则可以自定义渲染内容
      5. 注意点：
   7. 尽量不要与Vue2.x配置混用

   - Vue2.x配置（data、methods、computed...）中可以访问到setup中的属性、方法
   - 但在setup中不能访问到Vue2.x配置（data、methods、computed...）
   - 如果有重名，setup优先

   2. setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）
2. ref函数

   - 作用：定义一个响应式的数据
   - 语法：`const xxx = ref(initValue)`

   + 创建一个包含响应式数据的**引用对象（reference对象）**
   + JS中操作数据：`xxx.value`
   + 模板中读取数据：不需要.value，直接：`<div>{{xxx}}</div>`
     - 备注：
   + 接收的数据可以是：基本类型、也可以是对象类型。
   + 基本类型的数据：响应式依然是靠 `Object.defineProperty()`的 `get`与 `set`完成的
   + 对象类型的数据：内部“求助”了Vue3.0中的一个新函数——`reactive`函数
3. reactive函数

   - 作用：定义一个对象类型的响应式数据（基本类型不要用它，要用 `ref`函数）
   - 语法：`const [代理对象] = reactive(源对象)`接收一个对象（或数组），返回一个代理对象（Proxy的实例对象，简称proxy对象）
   - reactive定义的响应式数据是“深层次的”
   - 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据进行操作
4. Vue3.0中的响应式原理
   Vue2.x的响应式

   - 实现原理：
     + 对象类型：通过 `Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）
     + 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。
       ```
       Object.defineProperty(data, 'count', {
         get(){},
         set(){}
       })
       ```
   - 存在问题：
     + 新增属性、删除属性，界面不会更新
     + 直接通过下标修改数组，界面不会主动更新
       Vue3.0的响应式
       - 实现原理：

   + 通过Proxy（代理）：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等
     + 通过Reflect（反射）：对被代理对象的属性进行操作。
       ```javascript
       new Proxy(data,{
         // 拦截读取属性值
         get(target, prop) {
           return Reflect.get(target, prop)
         }
         // 拦截设置属性值或添加新属性
         set(target, prop, value) {
           return Reflect.get(target, prop, value)
         }
         // 拦截删除属性值
         deleteProperty(target, prop) {
           return Reflect.get(target, prop)
         }
       })
       ```
5. reactive对比ref
  - 从定义数据角度对比：
    + ref用来定义：基本类型数据
    + reactive用来定义：对象（或数组）类型数据
    + 备注：ref也可以用来定义对象（或数组）类型数据，它内部会自动通过`reactive`转为代理对象
  - 从原理角度对比：
    + ref通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）
    + reactive通过使用**Proxy**来实现响应式（数据劫持），并通过**Reflect**操作源对象内部的数据
  - 从使用角度对比：
    + ref定义的数据：操作数据需要`.value`，读取数据时模板中直接读取不需要`.value`
    + reactive定义的数据：操作数据与读取数据均不需要`.value`
6. setup的两个注意点
  - setup执行的时机
    + 在beforeCreate之前执行一次，this是`undefined`
  - setup的参数
    + props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性
    + context：上下文对象
      + sttrs：值为对象，包含：组件外部传递过来，但没有在props配置中生命的属性，相当于`this.$attrs`
      + slots：收到的插槽内容，相当于`this.$slots`
      + emit：分发自定义事件的函数，相当于`this.$emit`
7. 计算属性与监视
  1. computed函数
    - 与Vue2.x中computed配置功能一致
    - 写法
      ```
        import { computed } from 'vue'

        setup(){
          ...
          // 计算属性——简写
          let xxx = computed(()=>{
            retrue ...
          })
          // 计算属性——完整
          let xxx = computed({
            get(){
              retrue ...
            }
            set(val){
              ... = val
            }
          })
        }
      ```
  2. watch函数
    - 与Vue2.x中watch配置功能一致
    - 两个小坑：
      + 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置项失效）。
      + 监视reactive定义的响应式数据中某个属性时：deep配置有效
    ```
      // 情况一
      watch(xxx,(newValue,oldValue)=>{
        xxx
      },(immediate:true))
      // 情况二
      watch([xxx,yyy],(n,o)=>{
        ...
      })
      //情况三
      watch(() => xxx.aaa,(n,o) => {
        ...
      })
    ```
  3. watchEffect函数
    - watch的套路是：既要指明监视的属性，也要指明监视的回调
    - watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，就监视哪个属性
    - watchEffect有点儿像computed：
      + 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值
      + 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值
    ```
      // watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调
      watchEffect(()=>{
        let x = xxx.value
        ... 
      })
    ```
8. 生命周期
  - Vue3.0中可以继续使用Vue.x中的生命周期钩子，但有两个被更名：
    + `beforeDestroy`改名为`beforeUnmount`
    + `destroyed`改名为`unmounted`
  - Vue3.0也提供了Composition API形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
    + `beforeCreate` ===> `setup()`
    + `created` ===> `setup()`
    + `beforeMount` ===> `onBeforeMount`
    + `mounted` ===> `onMounted`
    + `beforeUpdate` ===> `onBeforeUpdate`
    + `updated` ===> `onUpdated`
    + `beforeUnmount` ===> `onBeforeUnmount`
    + `unmounted` ===> `onUnmounted`
9. 自定义hook函数
  - 什么是hook？——本质是一个函数，吧setup函数中使用的Composition API进行了封装。
  - 类使于Vue2.x中的mixin
  - 自定义hook的优势：复用代码，让setup中的逻辑更清除易懂
10. toRef
  - 作用：创建一个ref对象，其value值指向另一个对象中的某个属性。
  - 语法：`const name = roRef(person,'name')`
  - 应用：要将响应式对象中的某个属性单独提供给外部使用时
  - 扩展：`roRefs`与`roRef`功能一致，但可以批量创建多个ref对象，语法：`roRefs(person)`

## 其他 Compositon API
1. shallowReactive 与 shallowRef
  - shallowReactive：只处理对象最外层属性的响应式
  - shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理
  - 什么时候使用？
    + 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ===> shallowReactive
    + 如果有一个对象数据，后续功能不会修改该对象中的属性，而是用新的对象来替换 ===> shallowRef
2. readonly 与 shallowReadonly
  - readonly：让一个响应式数据变为只读（深只读）
  - shallowReadonly：让一个响应式数据变为只读（浅只读）
  - 应用场景：不希望数据被修改时
3. toRaw 与 markRaw
  - toRaw：
    + 作用：将一个由`reactive`生成的响应式对象转为普通对象
    + 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新
  - markRaw：
    + 作用：标记一个对象，使其永远不会再成为响应式对象
    + 使用场景：
      1. 有些值不应该被设置为响应式的，例如复杂的第三方类库
      2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能
4. customRef
  - 作用：创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显示控制。
  - 实现防抖效果：
    ```
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
    ```
5. provide 与 inject
  - 作用：实现祖孙组件间通信
  - 套路：父组件有一个`provide`选项来提供数据，子组件有一个`inject`选项来开始使用这些数据
  - 具体写法：
    1. 祖组件中
      ```
        setup(){
          let xxx = ...
          provide('xxx',xxx)
        }
      ```
    2. 后代组件中：
      ```
        setuo(){
          let xxx = inject('xxx')
        }
      ```
6. 响应式数据的判断
  - isRef：检查一个值是否为一个ref对象
  - isReactive：检查一个值是否由`reactive`创建的响应式代理
  - isReadonly：检查一个对象是否由`readonly`创建的只读代理
  - isProxy：检查一个对象是否是由`reactive`或`readonly`创建的代理
 
## Compositon API 的优势
1. Options API存在的问题
  使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在打她，methods，computed里修改
2. Composition API的优势
  我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起

## 新的组件
1. fragment
  - 在vue2中：组件必须有一个根标签
  - 在Vue3中：组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中
  - 好处：减少标签层级，减小内存占用
2. Teleport
  - Teleport是一种能够将我们的组件html结构移动到指定位置的技术
    ```
      <Teleport to='位置'>
        ...
      </Teleport>
    ```
3. Suspense
  - 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
  - 使用步骤：
    + 异步引入组件
      ```
        import {defineAsyncComponent} from 'vue'
        const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
      ```
    +使用`Suspense`包裹组件，并配置好`default`与`fallback`
      ```
        <template>
          <div>
            <h3>123</h3>
            <Suspense>
              <template v-slot:default>
                <Child></Child>
              </template>
              <template v-slot:fallback>
                <h3>loading...</h3>
              </template>
            </Suspense>
          </div>
        </template>
      ```