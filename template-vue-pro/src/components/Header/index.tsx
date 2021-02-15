import { defineComponent } from 'vue'
import styles from './Header.module.css'

export default defineComponent({
  setup() {
    return () => (
      <div class={ styles.headerWrapper }>
        <router-link to="/home">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
    )
  },
})
