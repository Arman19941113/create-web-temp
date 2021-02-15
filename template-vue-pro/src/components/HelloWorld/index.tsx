import { ref, defineComponent } from 'vue'
import styles from './HelloWorld.module.css'

export default defineComponent({
  setup() {
    const msg = ref('Hello world!')
    document.addEventListener('click', () => {
      msg.value = 'Good Luck!'
    }, {
      once: true,
    })
    return () => (
      <h1 class={styles.helloWorld}>{ msg.value }</h1>
    )
  },
})
