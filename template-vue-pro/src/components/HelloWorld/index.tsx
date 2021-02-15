import { defineComponent, ref, onMounted } from 'vue'
import styles from './HelloWorld.module.css'

export default defineComponent({
  setup() {
    const msg = ref('Hello world!')
    const root = ref(null)

    onMounted(() => {
      (root.value as unknown as HTMLElement).addEventListener('click', () => {
        msg.value = 'Good Luck!'
      }, {
        once: true,
      })
    })

    return () => (
      <h1 ref={ root } class={ styles.helloWorld }>{ msg.value }</h1>
    )
  },
})
