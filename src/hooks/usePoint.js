import { onBeforeUnmount, onMounted, reactive } from "vue"

export default function(){
  let point = reactive({
    x:0,
    y:0
  })

  function getPoint(e){
    point.x = e.pageX
    point.y = e.pageY
  }

  onMounted(()=>{
    window.addEventListener('click', getPoint)
  })

  onBeforeUnmount(()=>
    window.removeEventListener('click', getPoint)
  )

  return point
}