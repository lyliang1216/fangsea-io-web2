<template>
    <div>
        <!--订阅-->
        <div class="subscribe-box">
            <div class="subscribe-content">
                <p class="subscribe-title offside-font">{{$t('subscribe.subscribe_title')}}</p>
                <a-form :form="subscribeForm" @submit="handleSubmit" class="main-content" layout="inline">
                    <a-form-item class="input-box">
                        <a-input :placeholder="$t('contact.contact_form_email_placeholder')"
                                 @focus="setFields('email')"
                                 v-decorator="[
                                              'email',
                                              {
                                              validateTrigger: 'blur',
                                              rules: [{ validator:checkForm }]
                                              }]"
                        />
                    </a-form-item>
                    <a-form-item class="subbtn-box">
                        <a-button @click="handleSubmit" type="primary" :loading="loadingSubscribe" html-type="submit" class="sub-contact">
                            {{$t('subscribe.subscribe_submit_btn_text')}}
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <footer>
            <div class="footer-items">
                <div class="item-box">
                    <div class="item">
                        <h3 class="offside-font">{{$t('footer.footer_nav_helpcenter')}}</h3>
                        <span></span>
                        <p><a href="https://support.ptohome.com/hc/en-us/sections/360006865972-FAQ">{{$t('footer.footer_nav_faq')}}</a>
                        </p>
                        <p>
                            <nuxt-link to="/global/feedback">{{$t('footer.footer_nav_feedback')}}</nuxt-link>
                        </p>
                    </div>
                    <div class="item">
                        <h3 class="offside-font">{{$t('footer.footer_nav_aboutus')}}</h3>
                        <span></span>
                        <p class="">
                            <nuxt-link to="/global/our-team">{{$t('footer.footer_nav_ourteam')}}</nuxt-link>
                        </p>
                        <p class="">
                            <nuxt-link to="/global/contact">{{$t('footer.footer_nav_contactus')}}</nuxt-link>
                        </p>
                        <p><a href="https://support.ptohome.com/hc/en-us/categories/360002188031-Media">{{$t('footer.footer_nav_media')}}</a>
                        </p>
                    </div>
                </div>
                <div class="item">
                    <h3 class="offside-font">{{$t('footer.footer_nav_termsconditions')}}</h3>
                    <span></span>
                    <p class="disabled"><a href="javascript:;">{{$t('footer.footer_nav_privacypolicy')}}</a></p>
                    <p class="disabled"><a href="javascript:;">{{$t('footer.footer_nav_termsofuse')}}</a></p>
                </div>
                <div class="item">
                    <h3 class="offside-font">{{$t('footer.footer_nav_socialmedia')}}</h3>
                    <span></span>
                    <p><a href="https://t.me/PTOHome">{{$t('footer.footer_nav_telegram')}}</a></p>
                    <p><a href="https://www.facebook.com/ptohome"
                          target="_blank">{{$t('footer.footer_nav_facebook')}}</a></p>
                    <p><a href="https://twitter.com/pto_home" target="_blank">{{$t('footer.footer_nav_twitter')}}</a>
                    </p>
                </div>
            </div>
            <p class="copyright">{{$t('footer.footer_copyright')}}</p>
        </footer>
    </div>
</template>

<script>
    import {removeSpaces} from '~/assets/utils/rules'
    import validate from '~/assets/utils/validate'
    import tool from '~/assets/utils/tool'
    import axios from '~/plugins/axios'

    export default {
        data () {
            return {
                // 按钮提交禁用
                loadingSubscribe: false
            }
        },
        // 初始化form
        beforeCreate () {
            this.subscribeForm = this.$form.createForm(this)
        },
        methods: {
            // 表单校验
            checkForm (rule, value, callback) {
                value = removeSpaces(value)
                switch (rule.fullField) {
                case 'email':
                    if (!validate.required(value)) {
                        callback(this.$t('contact.contact_form_email_error_empty'))
                    } else if (!validate.subscribeEmail(value)) {
                        callback(this.$t('contact.contact_form_email_error_empty'))
                    } else {
                        callback()
                    }
                    break
                default:
                    callback()
                }
            },
            // 提交表单
            handleSubmit (e) {
                e.preventDefault()
                this.subscribeForm.validateFields((err, values) => {
                    if (!err) {
                        // 确认后添加按钮loading
                        this.loadingSubscribe = true
                        let data = {
                            traceId: tool.UUID(),
                            data: {
                                emailAddress: values.email
                            }
                        }
                        axios.post('/user/email/subscribe', data,
                            {
                                headers: {
                                    'need-check': 'false'
                                }
                            })
                            .then(res => {
                                this.loadingSubscribe = false
                                if (res.data.code.toString() === '0') {
                                    this.$message.success(this.$t('subscribe.subscribe_submit_success'))
                                    this.subscribeForm.resetFields()
                                } else {
                                    this.$message.success(this.$t('subscribe.subscribe_submit_success'))
                                    this.subscribeForm.resetFields()
                                }
                            })
                            .catch(err => {
                                this.loadingSubscribe = false
                                this.$message.error(this.$t(err.message))
                            })
                    }
                })
            },
            // 设置手机注册获取焦点状态
            setFields (field) {
                let fieldsValue = this.subscribeForm.getFieldsValue([field])
                this.subscribeForm.resetFields([field])
                this.subscribeForm.setFieldsValue(fieldsValue)
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/styles/variable';

    .subscribe-box {
        background-color: #444444;
        padding: 20px;
        .subscribe-content {
            width: 760px;
            display: flex;
            padding: 20px;
            flex-wrap: wrap;
            margin: 0 auto;
            .subscribe-title {
                color: #ffffff;
                font-size: 26px;
                text-align: center;
                width: 100%;
                margin-bottom: 10px;
            }
            .main-content {
                width: 100%;
                text-align: center;
                .input-box {
                    width: 50%;
                    margin-bottom: 0;
                    .ant-form-item-control-wrapper {
                        width: 100%;
                        .ant-form-item-control {
                            display: flex;
                            flex-direction: column-reverse;
                            position: relative;
                            width: 100%;
                            padding-top: 27px;
                            .ant-form-explain {
                                padding-bottom: 8px;
                                position: absolute;
                                top: 0;
                                font-size: 14px;
                                color: #fa0009;
                            }
                        }
                    }
                    .ant-input {
                        color: #fff;
                        background: #c6c6c6;
                        border-radius: unset;
                        &::-webkit-input-placeholder {
                            color: #ffffff;
                        }
                        &:-moz-placeholder {
                            color: #ffffff;
                        }
                        &:-ms-input-placeholder {
                            color: #ffffff;
                        }
                        &:focus {
                            border-color: #c6c6c6;
                            box-shadow: 0 0 0 2px rgba(46, 169, 223, 0.2);
                        }
                    }
                    .has-error .ant-input, .has-error .ant-input:hover {
                        border-color: #fa0009;
                    }
                }
                .sub-contact {
                    width: 200px;
                    font-size: 16px;
                    line-height: 40px;
                    text-align: center;
                    height: 40px;
                    background-color: #d62839;
                    border-color: #d62839;
                    margin-top: 27px;
                    border-radius: unset;
                }
            }
        }
    }

    footer {
        background: #353942!important;
        padding-top: 100px;
        .footer-items {
            width: @max-width;
            margin: 0 auto;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            .item {
                width: 33%;
                height: 147px;
                color: #fff;
                padding-bottom: 10px;
                h3 {
                    font-size: 24px;
                    line-height: 35px;
                    font-weight: 400;
                    color: #fff;
                    margin-bottom: 10px;
                }
                span {
                    display: block;
                    width: 100px;
                    border-top: 1px solid #007ac1;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 15px;
                    line-height: 27px;
                    margin-bottom: 0;
                    a {
                        color: #fff;
                        text-decoration: none;
                    }
                }
                .disabled a {
                    color: #999;
                    cursor: default;
                }
            }
            .item-box {
                width: 33%;
                .item {
                    width: 100%;
                }
            }

        }
        .copyright {
            text-align: center;
            font-size: 16px;
            padding-bottom: 26px;
            padding-top: 56px;
            margin: 0;
            color: #fff;
            line-height: 28px;
        }
    }

    @media screen and (max-width: @max-width) {
        .subscribe-box {
            background-color: #444444;
            padding: 20px;
            .subscribe-content {
                width: 100%;
                display: flex;
                padding: 20px 0;
                flex-wrap: wrap;
                margin: 0 auto;
                .subscribe-title {
                    color: #ffffff;
                    font-size: 20px;
                    text-align: center;
                    width: 100%;
                    margin-bottom: 10px;
                }
                .main-content {
                    width: 100%;
                    text-align: center;
                    .input-box {
                        width: 100%;
                        margin-bottom: 0;
                        .ant-form-item-control-wrapper {
                            width: 100%;
                        }
                        .ant-input {
                            color: #71767a;
                            background: #ffffff;
                            &::-webkit-input-placeholder {
                                color: #71767a;
                            }
                            &:-moz-placeholder {
                                color: #71767a;
                            }
                            &:-ms-input-placeholder {
                                color: #71767a;
                            }
                            &:focus {
                                border-color: #c6c6c6;
                                box-shadow: 0 0 0 2px rgba(46, 169, 223, 0.2);
                            }
                        }
                        .has-error .ant-input, .has-error .ant-input:hover {
                            border-color: #fa0009;
                        }
                        /deep/.ant-form-item-control {
                            display: flex;
                            flex-direction: column-reverse;
                            position: relative;
                            width: 100%;
                            padding-top: 27px;
                            .ant-form-explain {
                                padding-bottom: 8px;
                                position: absolute;
                                top: 0;
                                font-size: 14px;
                                color: #fa0009;
                            }
                        }
                    }
                    .subbtn-box{
                        margin-right: 0;
                        .sub-contact {
                            width: 200px;
                            font-size: 16px;
                            line-height: 40px;
                            text-align: center;
                            height: 40px;
                            background-color: #d62839;
                            border-color: #d62839;
                            margin: 26px auto 0!important;
                        }
                    }
                }
            }
        }

        footer {
            padding-top: 0.8rem;
            .footer-items {
                padding-left: 0.2rem;
                display: block;
                .item {
                    width: 100%;
                    height: auto;
                    padding-bottom: 0.4rem;
                    h3 {
                        font-size: 20px;
                        line-height: 0.28rem;
                        margin-bottom: 0.1rem;
                    }
                    span {
                        width: 1rem;
                        margin-bottom: 0.2rem;
                    }
                    p {
                        font-size: 14px;
                        line-height: 0.25rem;
                    }
                }
                .item-box {
                    width: 100%;
                }
            }
            .copyright {
                font-size: 14px;
                padding: 0 0.2rem 0.26rem;
                line-height: 0.28rem;
            }
        }
    }
</style>

