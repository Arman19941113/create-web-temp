<template>
  <div id="app">
    <h1 ref="root" class="hello-world">{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Hello world!',
      }
    },
    mounted() {
      this.$refs.root.addEventListener('click', () => {
        this.msg = 'Good Luck!'
      }, {
        once: true,
      })
    },
  }
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
