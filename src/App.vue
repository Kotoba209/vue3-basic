<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1 v-if="loading">Loading...</h1>
  <div>
    <!-- <img v-if="loaded && resp" :src="resp.message" style="width: 400px;" /> -->
    <img v-if="loaded && resp" :src="resp[0].url" style="width: 400px;" />
  </div>
  <div>{{ count }}</div>
  <h1>X: {{x}}, Y: {{y}}</h1>
  <button @click="increase">增加</button>
  <button @click="updateGreeting">update</button>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  <button @click="openModal">open</button>
  <Modal :isOpen="isOpenModal" @close-modal="closeModal">content</Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onUpdated, watch, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Modal from './components/Modal.vue'
import {useMousePosition} from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'

// interface DogResp {
//   message: string;
//   status: string;
// }

interface CatResp {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Modal
  },
  setup() {
    onMounted(() => {
      console.log('mounted')
      // document.addEventListener('click', updateMouse)
    })
    onUpdated(() => {
      console.log('update')
    })

    let greetings = ref('')
    const data = reactive({
      count: 23313,
      increase: () => { data.count += 1 },
      updateGreeting: () => greetings.value += 'hello'
    })

    // const x = ref(0)
    // const y = ref(0)
    // const updateMouse = (e: MouseEvent) => {
    //   x.value = e.pageX
    //   y.value = e.pageY
    // }
    const { x, y } = useMousePosition()
    // const { resp, loading, loaded, error } = useURLLoader<DogResp>('https://dog.ceo/api/breeds/image/random')
    const { resp, loading, loaded, error } = useURLLoader<CatResp[]>('https://api.thecatapi.com/v1/images/search?limit=1')

    const isOpenModal = ref(false)
    console.log('isOpenModal', isOpenModal.value)

    const openModal = () => {
      isOpenModal.value = true
    }

    const closeModal = () => {
      isOpenModal.value = false
    }

    watch([greetings, () => data.count], (n, o) => {
      console.log('n, o', n, o)
    })
    // 把数据转化为响应式对象，如果return那里直接返回 展开的data就会失去响应式更新的效果
    const refData = toRefs(data)
    return {
      ...refData,
      x,
      y,
      resp,
      loading,
      loaded,
      error,
      isOpenModal,
      openModal,
      closeModal,
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
