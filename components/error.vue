<template>
    <a-layout id="components-layout-top" class="layout">
        <fs-head :SelectedKey="key" :SelectedType="type"/>
        <section class="container">
            <img src="/global/error_img.jpg" alt="">
            <div class="error-word">
                <h2><span style="font-weight: 600">{{error.statusCode}}</span>{{$t('errorpage.error_statuscode_tip')}}</h2>
                <p>{{returntime}}</p>
                <button @click="back">{{$t('errorpage.error_return_btn')}}</button>
            </div>
        </section>
        <fonter/>
    </a-layout>
</template>
<script>
    import FsHead from '~/components/FangseaHeader'
    import fonter from '~/components/Footer'
    import tool from '~/assets/utils/tool'

    export default {
        props: ['error'],
        data () {
            return {
                key: '1',
                type: 0,
                time: 5,
                setIntervalCD: null,
                returntime: ''
            }
        },
        mounted () {
            let _this = this
            this.setIntervalCD = setInterval(function () {
                if (_this.time !== 0) {
                    _this.time--
                    _this.returntime = tool.intervariable(_this.$t('errorpage.error_prompt_return'), [_this.time])
                } else {
                    window.clearInterval(_this.setIntervalCD)
                    _this.setIntervalCD = null
                    _this.$router.go(-1)
                }
            }, 1000)
        },
        methods: {
            back () {
                this.$router.go(-1)
            }
        },
        beforeDestroy () {
            window.clearInterval(this.setIntervalCD)
            this.setIntervalCD = null
        },
        components: {
            FsHead,
            fonter
        }
    }
</script>

<style scoped lang="less">
    @import '../assets/styles/variable';

    .container {
        width: 1140px;
        height: 710px;
        margin: 20px auto 52px;
        position: relative;
        img {
            display: block;
            width: 100%;
        }
        .error-word {
            position: absolute;
            left: 120px;
            top: 260px;
            h2 {
                font-size: 24px;
                color: #333;
                margin: 0;
                font-weight: 400;
            }
            p {
                font-size: 15px;
                color: #666;
                margin-bottom: 15px;
            }
            button {
                display: block;
                width: 100px;
                height: 38px;
                line-height: 38px;
                color: #fff;
                font-size: 15px;
                background: #2EA9DF;
                border-radius: 19px;
                margin: 0;
                padding: 0;
                border: 0;
                outline: none;
                cursor: pointer;
                text-align: center;
            }
        }
    }
    @media screen and (max-width: @max-width) {
        .container {
            width: 100%;
            .error-word {
                width: 100%;
                left: 0;
                top: 57.78%;
                h2 {
                    font-size: 0.2rem;
                    color: #fff;
                    text-align: center;
                    font-weight: normal;
                }
                p {
                    font-size: 0.12rem;
                    color: #fff;
                    margin-bottom: 0.25rem;
                    text-align: center;
                }
                button {
                    width: 53.33%;
                    height: 0.38rem;
                    font-size: 0.15rem;
                    background: #2EA9DF;
                    border-radius: 0.19rem;
                    margin: 0 auto;
                }
            }
        }
    }
</style>
