<template>
    <div class="success-card">
        <p class="title">{{$t('unsubscribe.unsubscribe_title')}}</p>
        <div class="success-content">
            <p>{{$t('unsubscribe.unsubscribe_text_description1')}}</p>
            <p>{{$t('unsubscribe.unsubscribe_text_description2')}}</p>
            <p>{{$t('unsubscribe.unsubscribe_text_description3')}}</p>
            <p><nuxt-link to="/global/feedback">{{$t('unsubscribe.unsubscribe_feedback_btn')}}</nuxt-link> or <a href="javascript:;" @click="subscribeAgain">{{$t('unsubscribe.unsubscribe_subscribeagain_btn')}}</a></p>
        </div>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
        name: 'unsubscribe',
        methods: {
            /**
             * 再次订阅
             */
            subscribeAgain () {
                if (this.$route.query.id) {
                    axios.get(`/user/email/subscribe/again?id=${this.$route.query.id}`).then((res) => {
                        if (res.data.code.toString() === '0') {
                            this.$message.success(this.$t('subscribe.subscribe_submit_success'))
                        } else {
                            this.$message.error(this.$t(`code.${res.data.code.toString()}`))
                        }
                    })
                        .catch(err => {
                            this.$message.error(this.$t(err.message))
                        })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/styles/variable';

    .success-card {
        border: 1px solid #d2d6de;
        margin: 50px 10px 0;
        padding: 0 0 50px 20px;
        border-right: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        .title {
            font-size: 16px;
            line-height: 1;
            padding: 40px 0 18px;
            border-bottom: 1px solid #eeeeee;
            margin-bottom: 20px;
            color: #444;
        }
        .success-content {
            border-left: 6px solid #0097bc;
            background: #ebf6f8;
            padding: 20px;
            p {
                font-size: 14px;
                line-height: 2;
                margin: 0;
                color: #008cb0;
                a {
                    color: #008ca9;
                    text-decoration: underline;
                    font-weight: bold;
                    &:hover {
                        color: #008ca9;
                    }
                }
                &:nth-child(2) {
                    margin-bottom: 20px;
                }
            }
        }
    }

    @media screen and (max-width: @max-width) {
        .success-card {
            margin: 0.5rem 0.1rem 0;
            padding: 0 0 0.5rem 0.2rem;
            .title {
                padding: 0.4rem 0 0.18rem;
                margin-bottom: 0.2rem;
            }
            .success-content {
                padding: 0.2rem;
                p {
                    font-size: 14px;
                    &:nth-child(2) {
                        margin-bottom: 0.2rem;
                    }
                }
            }
        }
    }
</style>