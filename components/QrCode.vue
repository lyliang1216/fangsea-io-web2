<template>
    <qriously :value="value" :size="size" :backgroundAlpha="backgroundAlpha"/>
</template>

<script>
    export default {
        name: 'qrcode',
        props: ['value', 'size'],
        data () {
            return {
                // 透明度
                backgroundAlpha: 1
            }
        }
    }
</script>