<template>
    <h1>{{ msg }}</h1>
</template>

<script>
    import { ref } from 'vue'

    export default {
        setup () {
            return {
                msg: ref('Hello world')
            }
        }
    }
</script>

<style>
    @import "~@/css/reset.css";
    @import "~@/css/variable.css";
    #app {
        color: $fontColor;
        padding-top: 100px;
        text-align: center;
    }
</style>
