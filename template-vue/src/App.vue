<template>
  <h1 ref="root" class="hello-world">{{ msg }}</h1>
</template>

<script>
  import { defineComponent, ref, onMounted } from 'vue'

  export default defineComponent({
    setup() {
      const msg = ref('Hello world!')
      const root = ref(null)

      onMounted(() => {
        root.value.addEventListener('click', () => {
          msg.value = 'Good Luck!'
        }, {
          once: true,
        })
      })

      return {
        msg,
        root,
      }
    },
  })
</script>

<style>
  @import "~@/css/reset.css";
  @import "~@/css/variable.css";

  #app {
    display: flex;
    justify-content: center;
    align-content: center;
    color: $fontColor;
    .hello-world {
      color: $mainColor;
    }
  }
</style>
