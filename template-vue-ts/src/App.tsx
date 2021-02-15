import { defineComponent } from 'vue'
import appStyles from './App.module.css'
import HelloWorld from '@/components/HelloWorld'

export default defineComponent({
  setup() {
    return () => (
      <main class={ appStyles.mainWrapper }>
        <HelloWorld />
      </main>
    )
  },
})
