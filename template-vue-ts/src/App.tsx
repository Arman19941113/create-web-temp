import { defineComponent } from 'vue'
import './App.module.css'
import HelloWorld from '@/components/HelloWorld'

export default defineComponent({
  setup() {
    return () => (
      <HelloWorld />
    )
  },
})
