<template>
  <form class="validate-form-container">
    <!-- 默认插槽 -->
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <!-- 具名插槽 -->
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'], // 接收自定义事件名称
  setup (_, context) {
    const submitForm = (): void => {
      // 触发父组件传来的通信事件并把值传递到父组件
      context.emit('form-submit', 233)
    }
    return {
      submitForm
    }
  }
})

</script>

<style scoped>

</style>
