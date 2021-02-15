import { ref, defineComponent } from 'vue'
import appStyles from '@/App.module.css'
import styles from './HelloWorld.module.css'

export default defineComponent({
  setup() {
    const msg = ref('Hello world')
    return () => (
      <h1 class={ `${ appStyles.overflowText } ${ styles.helloWorld }` }>{ msg.value }</h1>
    )
  },
})
