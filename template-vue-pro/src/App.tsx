import { defineComponent } from 'vue'
import appStyles from './App.module.css'
import Header from '@/components/Header'

export default defineComponent({
  setup() {
    return () => (
      <>
        <Header />
        <main class={ appStyles.mainWrapper }>
          <router-view />
        </main>
      </>
    )
  },
})
