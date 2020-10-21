<template>
    <a-layout id="components-layout-top" class="layout" :class="drawer">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer"
                 @closeDrawer="closeDrawer" style="margin-bottom: 0;"/>
        <section class="container">
            <a-layout-content>
                <div class="banner-box">
                    <div class="banner-text">
                        <p class="banner-title offside-font">{{$t("contact.contact_title")}}</p>
                    </div>
                </div>
                <div class="contact-box">
                    <div class="box-main">
                        <div class="content-text">
                            <p class="text-item" v-html="$t('contact.contact_content_text')"></p>
                        </div>
                            <a-form :form="contactForm" @submit="handleSubmit" class="main-content">
                                <a-form-item class="content-item-box input-box">
                                    <a-input :placeholder="$t('contact.contact_form_name_placeholder')"
                                             @focus="setFields('name')"
                                             v-decorator="[
                                              'name',
                                              {
                                              validateTrigger: 'blur',
                                              rules: [{ validator:checkForm }]
                                              }]"/>
                                </a-form-item>
                                <a-form-item class="content-item-box input-box">
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
                                <a-form-item class="content-item-box">
                                    <a-textarea :placeholder="$t('contact.contact_form_message_placeholder')"
                                                :rows="4"
                                                style="height: auto;"
                                                maxlength="600"
                                                @focus="setFields('message')"
                                                v-decorator="[
                                              'message',
                                              {
                                              validateTrigger: 'blur',
                                              rules: [{ validator:checkForm }]
                                              }]"
                                    />
                                </a-form-item>
                                <a-form-item class="content-item-box">
                                    <a-button @click="handleSubmit" type="primary" :loading="loading"
                                              html-type="submit" class="sub-contact">
                                        {{$t("contact.contact_form_btn_submit_text")}}
                                    </a-button>
                                </a-form-item>
                            </a-form>
                    </div>
                </div>
                <div class="project-list-box">
                    <project-list :showTitle="showTitle" :pagSize="pagSize"
                                  :showPagination="showPagination"></project-list>
                </div>
            </a-layout-content>
        </section>
        <fonter/>
    </a-layout>
</template>

<script>
    import ProjectList from '~/components/ProjectList'
    import {removeSpaces} from '~/assets/utils/rules'
    import FsHead from '~/components/FangseaHeader'
    import validate from '~/assets/utils/validate'
    import fonter from '~/components/Footer'
    import tool from '~/assets/utils/tool'
    import axios from '~/plugins/axios'

    export default {
        data () {
            return {
                key: 1,
                type: 0,
                centerKey: 0,
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false},
                // 每页数量
                pagSize: 3,
                // 显示分页
                showPagination: false,
                // 显示标题文字
                showTitle: true,
                // 按钮提交禁用
                loading: false
            }
        },
        // 初始化form
        beforeCreate () {
            this.contactForm = this.$form.createForm(this)
        },
        methods: {
            // 表单校验
            checkForm (rule, value, callback) {
                value = removeSpaces(value)
                switch (rule.fullField) {
                case 'name':
                    if (!validate.required(value)) {
                        callback(this.$t('contact.contact_form_name_error_empty'))
                    } else if (!validate.maxlength(value, 68)) {
                        callback(this.$t('contact.contact_form_name_error_toolong'))
                    } else {
                        callback()
                    }
                    break
                case 'email':
                    if (!validate.required(value)) {
                        callback(this.$t('contact.contact_form_email_error_empty'))
                    } else if (!validate.subscribeEmail(value)) {
                        callback(this.$t('contact.contact_form_email_error_empty'))
                    } else {
                        callback()
                    }
                    break
                case 'message':
                    if (!validate.required(value)) {
                        callback(this.$t('contact.contact_form_message_error_empty'))
                    } else if (!validate.minlength(value, 6)) {
                        callback(this.$t('contact.contact_form_message_error_tooshort'))
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
                this.contactForm.validateFields((err, values) => {
                    if (!err) {
                        // 确认后添加按钮loading
                        this.loading = true
                        let data = {
                            traceId: tool.UUID(),
                            data: {
                                name: values.name,
                                email: values.email,
                                message: values.message
                            }
                        }
                        axios.post('/user/email/feedback', data,
                            {
                                headers: {
                                    'need-check': 'false'
                                }
                            })
                            .then(res => {
                                this.loading = false
                                if (res.data.code.toString() === '0') {
                                    this.$message.success(this.$t('contact.contact_form_submit_success'))
                                    this.contactForm.resetFields()
                                } else if (res.data.code.toString() === '1037') {
                                    this.$message.error(this.$t('contact.contact_form_message_error_time'))
                                } else {
                                    this.$message.error(this.$t(`code.${res.data.code.toString()}`))
                                }
                            })
                            .catch(err => {
                                this.loading = false
                                this.$message.error(this.$t(err.message))
                            })
                    }
                })
            },
            // 设置手机注册获取焦点状态
            setFields (field) {
                let fieldsValue = this.contactForm.getFieldsValue([field])
                this.contactForm.resetFields([field])
                this.contactForm.setFieldsValue(fieldsValue)
            },

            // 开启右侧抽屉导航
            openDrawer () {
                this.drawer = {'drawer-containel-left': true, 'drawer-containel-right': false}
            },
            // 关闭右侧抽屉导航
            closeDrawer () {
                this.drawer = {'drawer-containel-left': false, 'drawer-containel-right': true}
                let _this = this
                setTimeout(function () {
                    _this.drawer = {'drawer-containel-left': false, 'drawer-containel-right': false}
                }, 200)
            }
        },
        components: {
            FsHead,
            fonter,
            ProjectList
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/variable.less";
    .layout{
        background-color: #fff;
    }
    .banner-box {
        width: 100%;
        height: 300px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: url("/global/home-imgs/banner/banner-background.jpg");
        display: flex;
        justify-content: center;
        align-items: center;
        .banner-text {
            width: 760px;
            color: #ffffff;
            flex: 0 0 auto;
            text-align: center;
            .banner-title {
                font-size: 100px;
                line-height: 116px;
                font-weight: 700;
                padding-bottom: 25px;
                margin-bottom: 0;
                position: relative;
            }
        }
    }

    .contact-box {
        width: 100%;
        padding: 130px 0;
        background-image: url("/global/how-to-buy/content-bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-attachment: scroll;
        background-color: rgba(255, 255, 255, 0.8);
        background-blend-mode: color-burn;
        .box-main {
            width: @max-width;
            padding: 20px 20px 80px;
            background-color: #ffffff;
            box-shadow: 0 0 7px 0 rgba(168, 168, 168, 0.5);
            margin: 0 auto;
            .content-text {
                width: 960px;
                margin: 50px auto 0;
                text-align: center;
                .text-item {
                    margin-bottom: 0;
                    font-size: 15px;
                    line-height: 1.85;
                    padding-bottom: 10px;
                    color: #000;
                    /deep/a {
                        color: #2EA9DF !important;
                    }
                }
            }
            .main-content {
                padding: 20px 200px 50px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .content-item-box {
                    padding: 4px 10px;
                    width: 100%;
                    margin-bottom: 0;
                    &.input-box{
                        width: 50%;
                    }
                    /deep/.ant-form-item-control{
                        display: flex;
                        flex-direction: column-reverse;
                        position: relative;
                        width: 100%;
                        padding-top: 27px;
                        .ant-form-explain{
                            padding-bottom: 8px;
                            position: absolute;
                            top: 0;
                            font-size: 14px;
                            color: #d62839;
                        }
                    }
                    /deep/textarea{
                        height: auto!important;
                    }
                    .sub-contact{
                        width: 100%;
                        font-size: 16px;
                        line-height: 48px;
                        text-align: center;
                        height: 48px;
                        background-color: #0274be;
                        border-radius: unset;
                    }
                }
            }
        }
    }

    .project-list-box {
        width: @max-width;
        margin: 40px auto 60px;
        .project-list-title {
            padding: 45px 5%;
            text-align: center;
            color: #007ac1;
            font-size: 25px;
            line-height: 25px;
        }
        .project-list {
            width: 100%;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: @max-width) {
        .banner-box {
            height: 2rem;
            .banner-text {
                width: 50%;
                color: #ffffff;
                flex: 0 0 auto;
                text-align: center;
                .banner-title {
                    font-size: .3rem;
                    line-height: .34rem;
                    padding-bottom: .14rem;
                }
            }
        }

        .contact-box {
            width: 100%;
            padding: 50px 0 80px;
            .box-main {
                width: 100%;
                padding: 20px 0 0;
                background-color: #ffffff;
                box-shadow: 0 0 7px 0 rgba(168, 168, 168, 0.5);
                margin: 0 auto;
                .content-text {
                    width: 90%;
                    margin: 50px auto 20px;
                    text-align: left;
                    .text-item {
                        margin-bottom: 0;
                        font-size: .15rem;
                        line-height: 1.85;
                        padding-bottom: 10px;
                        &:first-child {
                            margin-bottom: 24px;
                        }
                    }
                }
                .main-content {
                    padding: 0 0 40px;
                    .content-item-box {
                        padding: 4px 10px;
                        width: 100%;
                        margin-bottom: 0;
                        &.input-box{
                            width: 100%;
                        }
                        /deep/.ant-form-item-control{
                            display: flex;
                            flex-direction: column-reverse;
                            position: relative;
                            width: 100%;
                            padding-top: 27px;
                            .ant-form-explain{
                                padding-bottom: 8px;
                                position: absolute;
                                top: 0;
                                font-size: 14px;
                                color: #d62839;
                            }
                        }
                        /deep/textarea{
                            height: auto!important;
                        }
                        .sub-contact{
                            width: 100%;
                            font-size: 16px;
                            line-height: 48px;
                            text-align: center;
                            height: 48px;
                            background-color: #0274be;
                        }
                    }
                }
            }
        }

        .project-list-box {
            width: 100%;
            margin: 0.2rem auto 0.6rem;
            .project-list {
                width: 100%;
            }
        }
    }
</style>
