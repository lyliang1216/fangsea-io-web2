<template>
    <div>
        <error-pc :error="error"></error-pc>
    </div>
</template>
<script>
    import ErrorPc from '~/components/error'

    export default {
        props: ['error'],
        components: {
            ErrorPc
        }
    }
</script>
