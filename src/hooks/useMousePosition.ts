import { ref, onMounted, onUnmounted, reactive, toRefs } from "vue"

export const useMousePosition = () => {
  // const x = ref(0)
  // const y = ref(0)

  const data = reactive({
    x: 0,
    y: 0,
  })

  // const updateMouse = (e: MouseEvent) => {
  //   x.value = e.pageX
  //   y.value = e.pageY
  // }

  const updateMouse = (e: MouseEvent) => {
    data.x = e.pageX
    data.y = e.pageY
  }
  
  onMounted(() => {
    console.log('mounted')
    document.addEventListener('click', updateMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })

  const refData = toRefs(data)

  return { ...refData }
}