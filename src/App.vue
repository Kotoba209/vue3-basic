<template>
  <div style="width: 800px; margin: 0 auto">
  <h1 v-if="loading">Loading...</h1>
  <div>
    <!-- <img v-if="loaded && resp" :src="resp.message" style="width: 400px;" /> -->
    <img v-if="loaded && resp" :src="resp[0].url" style="width: 400px;height: 400px" />
  </div>
  <div>{{ count }}</div>
  <h1>X: {{x}}, Y: {{y}}</h1>
  <button @click="increase">增加</button>
  <button @click="updateGreeting">update</button>
  <button @click="openModal">open</button>
  <Modal :isOpen="isOpenModal" @close-modal="closeModal">content</Modal>
  <div style="height: 50px"></div>
  <!-- @form-submit="onFormSubmit" 传递自定义事件 -->
  <validate-form @form-submit="onFormSubmit">
    <!-- 默认插槽内容 -->
    <validate-input
     type="text"
     placeholder="请输入邮箱地址"
     :rules="emailRules"
     v-model="emailVal"
     />
     {{emailVal}}
    <!-- 具名插槽内容 -->
    <template #submit>
      <button class="btn btn-primary btn-large">确认</button>
    </template>
  </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onUpdated, watch, ref } from 'vue';
import Modal from './components/Modal.vue'
import {useMousePosition} from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import ValidateInput,  { RulesProps } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
import 'bootstrap/dist/css/bootstrap.min.css';

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
    Modal,
    ValidateInput,
    ValidateForm
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
    const emailVal =ref('')
    const emailRules: RulesProps = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    console.log('isOpenModal', isOpenModal.value)

    const openModal = () => {
      isOpenModal.value = true
    }

    const closeModal = () => {
      isOpenModal.value = false
    }

    const onFormSubmit = (result: boolean) => {
      // 参数 result 是子组件传来的值
      console.log('result', result)
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
      emailVal,
      emailRules,
      onFormSubmit
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
