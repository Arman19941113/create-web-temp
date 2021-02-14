import { ref, defineComponent } from 'vue'
import './App.css'

export default defineComponent({
  setup() {
    const msg = ref('Hello world')
    return () => (
      <h1>{ msg.value }</h1>
    )
  },
})
