import { ref } from "vue";
import axios from "axios";

function useURLLoader <T>(url: string) {
  const resp = ref<T | null>(null)
  const loading =ref(true)
  const loaded = ref(false)
  const error = ref(null)

  axios.get(url)
  .then((res) => {
    loading.value = false
    loaded.value = true
    resp.value = res.data
  })
  .catch((e) => {
    error.value = e
    loading.value = false
  })
  return {
    resp,
    loaded,
    loading,
    error
  }
}

export default useURLLoader