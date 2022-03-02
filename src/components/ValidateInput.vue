<template>
  <div class="validate-input-conttainer pb-3">
    <input
     class="form-control"
     :class="{'is-invalid': inputRef.error}"
     @blur="validateInput"
     v-model="inputRef.val"
     v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, PropType, onMounted, computed } from 'vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export interface RuleProps {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}

export type RulesProps = RuleProps[]
export type TagType = 'input' | 'textarea' | 'custom'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProps>,
    modelValue: String
  },
  // 禁止 attribute 继承(避免传入为用到的组件属性作用到根元素上)
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'custom':
              passed = passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    // 将事件发射出去，其实就是把验证函数发射出去
    onMounted(() => {
      // emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style scoped>

</style>