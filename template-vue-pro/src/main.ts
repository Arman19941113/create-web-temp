import {createApp} from 'vue'
import {router} from './router'
import '@/css/main.css'
import App from '@/App'

const app = createApp(App)

app.use(router)

router.isReady().then(() => app.mount('#app'))

if (module.hot) {
    module.hot.accept(
        err => {
            console.error(err)
        },
    )
}
