<template>
    <a-layout-header class="header">
        <div class="header-content">
            <nuxt-link to="/global">
                <div class="logo">
                </div>
            </nuxt-link>
            <div class="menu-right">
                <a-menu
                        theme="dark"
                        mode="horizontal"
                        :selectedKeys="[SelectedKey]"
                        :defaultSelectedKeys="['1']"
                        :style="{ lineHeight: '64px',maxWidth: '750px' }">
                    <a-menu-item key="1">
                        <nuxt-link to="/global/how-to-buy">
                            <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                                <span class="offside-font">{{$t('header.header_nav_howtobuy')}}</span><span class="item-en offside-font" v-show="!isEnglish">{{$t('header.header_nav_howtobuy')}}</span>
                            </div>
                        </nuxt-link>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <nuxt-link to="/global/properties">
                            <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                                <span class="offside-font">{{$t('header.header_nav_properties')}}</span><span class="item-en offside-font" v-show="!isEnglish">{{$t('header.header_nav_properties')}}</span>
                            </div>
                        </nuxt-link>
                    </a-menu-item>
                    <a-menu-item key="3">
                        <a href="javascript:;" @click="windowopen('https://www.ptex.vip')">
                            <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                                <span class="offside-font">{{$t('header.header_nav_tradepts')}}</span><span class="item-en offside-font" v-show="!isEnglish">{{$t('header.header_nav_tradepts')}}</span>
                            </div>
                        </a>
                    </a-menu-item>
                    <a-menu-item key="4">
                        <a href="javascript:;" @click="redirectOne('/InfoDisclosure')">
                            <div class="item-flex" :class="isEnglish ?  'item-flex-padding' : ''">
                                <span class="offside-font">{{$t('header.header_nav_disclosure')}}</span><span class="item-en offside-font" v-show="!isEnglish">{{$t('header.header_nav_disclosure')}}</span>
                            </div>
                        </a>
                    </a-menu-item>
                </a-menu>
                <a-dropdown class="i18n-dropdown" v-if="showlange">
                    <a class="ant-dropdown-link offside-font" href="javascript:;">
                        {{localeLange}}
                        <a-icon type="down"/>
                    </a>
                    <a-menu slot="overlay" @click="setLocale">
                        <a-menu-item v-for="locale in locales" :key="locale" class="i18n-dropdown-item">
                            <a href="javascript:;" class="offside-font">{{locale}}</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
                <div class="login-active" v-show="flag">
                    <section v-show="!isLogin">
                        <a href="javascript:;" @click="redirectOne('/user/login')">
                            <a-button ghost class="menu-bt" :class="SelectedType === 1 ? 'drawer-title-li-active' :''">
                                <span class="offside-font">{{$t('header.header_login')}}</span>
                            </a-button>
                        </a>
                        <a href="javascript:;" @click="redirectOne('/user/register')">
                            <a-button ghost class="menu-bt register-btn"
                                      :class="SelectedType === 2 ? 'drawer-title-li-active' :''">
                                <span class="offside-font">{{$t('header.header_register')}}</span>
                            </a-button>
                        </a>
                    </section>
                    <section class="head-active-box">
                        <div class="kyc-tooltip"
                             v-if="isLogin && (auditState === 4 || auditState === 3 || auditState === 1)">
                            <a class="offside-font" v-if="auditState === 4" href="javascript:;" @click="redirectOne('/user/UserCenter?getKey=6')">
                                {{$t('MyMessage.myprofile_kyc_status_not')}}
                            </a>
                            <a class="offside-font" v-if="auditState === 3" href="javascript:;" @click="redirectOne('/user/UserCenter?getKey=6')">
                                {{$t('AuthenticationKYC.kyc_update_title')}}
                            </a>
                            <a class="offside-font" v-if="auditState === 1" href="javascript:;" @click="redirectOne('/user/UserCenter?getKey=6')">
                                {{$t('MyMessage.myprofile_kyc_status_fail')}}
                            </a>
                            <span></span>
                        </div>
                        <a-dropdown v-show="isLogin" placement="bottomRight">
                            <div class="head-img">
                                <a-badge :dot="hasUpdated('USERCENTER')" :offset="[-3, 0]">
                                    <div>
                                        <img src="/global/personal_center.png" alt="">
                                        <img src="/global/personal_center_active.png" alt="">
                                    </div>
                                </a-badge>
                            </div>
                            <a-menu slot="overlay">
                                <a-menu-item key="8">
                                    <a href="javascript:;" @click="redirectOne('/user/UserCenter?getKey=7')">
                                        <a-badge :dot="hasUpdated('POSITIONPLAN')" :offset="[3, 0]" class="offside-font">
                                        {{$t('sider.sidebar_name_8')}}
                                        </a-badge>
                                    </a>
                                </a-menu-item>
                                <a-menu-item key="1">
                                    <a href="javascript:;" @click="redirectOne('/order/list/ot0opg1.html')">
                                        <a-badge :dot="hasUpdated('MYPROPERTY')" :offset="[3, 0]" class="offside-font">
                                        {{$t('sider.sidebar_name_2')}}
                                        </a-badge>
                                    </a>
                                </a-menu-item>
                                <a-menu-item key="2">
                                    <a href="javascript:;" @click="redirectOne('/user/UserCenter?getKey=2')">
                                        <a-badge :dot="hasUpdated('MYWALLET')" :offset="[3, 0]" class="offside-font">
                                        {{$t('sider.sidebar_name_3')}}
                                        </a-badge>
                                    </a>
                                </a-menu-item>
                                <a-menu-item key="4">
                                    <a href="javascript:;" @click="redirectOne('/user/UserCenter?getKey=4')">
                                        <a-badge :dot="hasUpdated('TRANSACTIONRECORD')" :offset="[3, 0]" class="offside-font">
                                        {{$t('sider.sidebar_name_5')}}
                                        </a-badge>
                                    </a>
                                </a-menu-item>
                                <a-menu-item key="5">
                                    <a href="javascript:;" @click="redirectOne('/user/UserCenter?getKey=5')">
                                        <a-badge :dot="hasUpdated('MYMESSAGE')" :offset="[3, 0]" class="offside-font">
                                        {{$t('sider.sidebar_name_0')}}
                                        </a-badge>
                                    </a>
                                </a-menu-item>
                                <a-menu-item key="6">
                                    <a href="javascript:;" @click="redirectOne('/user/UserCenter?getKey=6')">
                                        <a-badge :dot="hasUpdated('AUTHENTICATIONKYC')" :offset="[3, 0]" class="offside-font">
                                        {{$t('sider.sidebar_name_7')}}
                                        </a-badge>
                                    </a>
                                </a-menu-item>
                                <a-menu-item class="offside-font" key="7" @click="loginOut">
                                    {{$t('sider.header_title_logout')}}
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </section>
                </div>
            </div>
            <div class="mobile">
                <a-badge :dot="hasUpdated('USERCENTER')" :offset="[4, 2]">
                    <a-button :ghost="true" @click="showDrawer" class="hamb-bt hamburger">
                        <span class="hamb hamb-top"></span>
                        <span class="hamb hamb-middle"></span>
                        <span class="hamb hamb-bottom"></span>
                    </a-button>
                </a-badge>
                <a-drawer
                        placement="left"
                        :closable="false"
                        @close="onClose"
                        :visible="visible"
                        width="85vw">
                    <template slot="title">
                        <ul class="drawer-title">
                            <li :class="SelectedKey === '1' ? 'drawer-title-li-active' : ''" @click="onClose">
                                <nuxt-link to="/global/how-to-buy" class="offside-font">
                                    {{$t('header.header_nav_howtobuy')}}<span class="offside-font" v-show="localeLange !== 'ENGLISH'">{{$t('header.header_nav_howtobuy')}}</span>
                                </nuxt-link>
                            </li>
                            <li :class="SelectedKey === '2' ? 'drawer-title-li-active' : ''" @click="onClose">
                                <a href="javascript:;" @click="redirectOne('/global/properties')" class="offside-font">
                                    {{$t('header.header_nav_properties')}}<span class="offside-font" v-show="localeLange !== 'ENGLISH'">{{$t('header.header_nav_properties')}}</span>
                                </a>
                            </li>
                            <li :class="SelectedKey === '3' ? 'drawer-title-li-active' : ''" @click="onClose">
                                <a href="javascript:;" @click="windowopen('https://www.ptex.vip')" class="offside-font">
                                    {{$t('header.header_nav_tradepts')}}<span class="offside-font" v-show="localeLange !== 'ENGLISH'">{{$t('header.header_nav_tradepts')}}</span>
                                </a>
                            </li>
                            <li :class="SelectedKey === '4' ? 'drawer-title-li-active' : ''" @click="onClose">
                                <a href="javascript:;" @click="redirectOne('/InfoDisclosure')" class="offside-font">
                                    {{$t('header.header_nav_disclosure')}}<span class="offside-font" v-show="localeLange !== 'ENGLISH'">{{$t('header.header_nav_disclosure')}}</span>
                                </a>
                            </li>
                            <li v-show="!isLogin" class="loginbtn link_btn"
                                :class="SelectedType === 1 ? 'drawer-title-li-active' :''"
                                @click="onClose">
                                <a href="javascript:;" @click="redirectOne('/user/login')" class="offside-font">
                                    {{$t('header.header_login')}}
                                </a>
                            </li>
                            <li v-show="!isLogin" class="loginbtn link_btn"
                                :class="SelectedType === 2 ? 'drawer-title-li-active' :''"
                                @click="onClose">
                                <a href="javascript:;" @click="redirectOne('/user/register')" class="offside-font">
                                    {{$t('header.header_register')}}
                                </a>
                            </li>
                            <div class="slide-item" v-show="isLogin">
                                <ul class="drawer-title">
                                    <li class="drawer-title-li langbtn planbtn">
                                        <a-menu mode="inline">
                                            <a-sub-menu key="sub4">
                                                <span slot="title" class="offside-font">
                                                    {{$t('sider.sidebar_name_8')}}
                                                </span>
                                                <a-menu-item key="1">
                                                    <span :class="centerKey === 8 ? 'drawer-title-li-active' : 'drawer-title-li'"
                                                          @click="onClose">
                                                        <a href="javascript:;" @click="redirectOne('/user/UserCenter/PositionPlan')" class="offside-font">
                                                            {{$t('sider.sidebar_name_8_1')}}
                                                        </a>
                                                    </span>
                                                </a-menu-item>
                                                <a-menu-item key="2">
                                                    <span :class="centerKey === 9 ? 'drawer-title-li-active' : 'drawer-title-li'"
                                                          @click="onClose">
                                                        <a href="javascript:;" @click="redirectOne('/user/UserCenter/PositionPlan/RecommendList')">
                                                            <a-badge :dot="hasUpdated('POSITIONPLAN')" :offset="[3, 0]" class="offside-font">
                                                                {{$t('sider.sidebar_name_8_2')}}
                                                            </a-badge>
                                                        </a>
                                                    </span>
                                                </a-menu-item>
                                            </a-sub-menu>
                                        </a-menu>
                                    </li>
                                    <li :class="centerKey === 1 ? 'drawer-title-li-active' : 'drawer-title-li'"
                                        @click="onClose">
                                        <a href="javascript:;" @click="redirectOne('/order/list/ot0opg1.html')">
                                            <a-badge :dot="hasUpdated('MYPROPERTY')" :offset="[3, 0]" class="offside-font">
                                            {{$t('sider.sidebar_name_2')}}
                                            </a-badge>
                                        </a>
                                    </li>
                                    <li :class="centerKey === 2 ? 'drawer-title-li-active' : 'drawer-title-li'"
                                        @click="onClose">
                                        <a href="javascript:;" @click="redirectOne('/user/UserCenter/MyWallet')">
                                            <a-badge :dot="hasUpdated('MYWALLET')" :offset="[3, 0]" class="offside-font">
                                            {{$t('sider.sidebar_name_3')}}
                                            </a-badge>
                                        </a>
                                    </li>
                                    <li :class="centerKey === 4 ? 'drawer-title-li-active' : 'drawer-title-li'"
                                        @click="onClose">
                                        <a href="javascript:;" @click="redirectOne('/user/UserCenter/TransactionRecord')">
                                            <a-badge :dot="hasUpdated('TRANSACTIONRECORD')" :offset="[3, 0]" class="offside-font">
                                            {{$t('sider.sidebar_name_5')}}
                                            </a-badge>
                                        </a>
                                    </li>
                                    <li :class="centerKey === 3 ? 'drawer-title-li-active' : 'drawer-title-li'"
                                        @click="onClose">
                                        <a href="javascript:;" @click="redirectOne('/user/UserCenter/AddressManagement')">
                                            <a-badge :dot="hasUpdated('ADDRESSMANAGEMENT')" :offset="[3, 0]" class="offside-font">
                                            {{$t('sider.sidebar_name_4')}}
                                            </a-badge>
                                        </a>
                                    </li>
                                    <li :class="centerKey === 5 ? 'drawer-title-li-active' : 'drawer-title-li'"
                                        @click="onClose">
                                        <a href="javascript:;" @click="redirectOne('/user/UserCenter/MyMessage')">
                                            <a-badge :dot="hasUpdated('MYMESSAGE')" :offset="[3, 0]" class="offside-font">
                                            {{$t('sider.sidebar_name_0')}}
                                            </a-badge>
                                        </a>
                                    </li>
                                    <li :class="centerKey === 6 ? 'drawer-title-li-active' : 'drawer-title-li'"
                                        @click="onClose">
                                        <a href="javascript:;" @click="redirectOne('/user/UserCenter/AuthenticationKYC')">
                                            <a-badge :dot="hasUpdated('AUTHENTICATIONKYC')" :offset="[3, 0]" class="offside-font">
                                            {{$t('sider.sidebar_name_7')}}
                                            </a-badge>
                                        </a>
                                    </li>
                                    <li :class="centerKey === 7 ? 'drawer-title-li-active' : 'drawer-title-li'"
                                        @click="loginOut" class="login-out offside-font">
                                        {{$t('sider.header_title_logout')}}
                                    </li>
                                </ul>
                            </div>
                            <li class="langbtn link_btn" :class="SelectedType === 2 ? 'drawer-title-li-active' :''">
                                <a-menu
                                        @click="setLocale"
                                        mode="inline">
                                    <a-sub-menu key="sub4">
                                        <span slot="title" class="offside-font">
                                            {{localeLange}}
                                        </span>
                                        <a-menu-item v-for="locale in locales" :key="locale" class="offside-font">
                                            {{locale}}
                                        </a-menu-item>
                                    </a-sub-menu>
                                </a-menu>
                            </li>
                        </ul>
                    </template>
                </a-drawer>
            </div>
        </div>
    </a-layout-header>
</template>

<script>
    import {Bus} from '~/assets/utils/bus'
    import tool from '~/assets/utils/tool'
    import axios from '~/plugins/axios'
    import Cookie from 'js-cookie'

    export default {
        name: 'fshead',
        // 导航下标，登录注册下标
        props: ['SelectedKey', 'SelectedType', 'centerKey'],
        data () {
            return {
                // 显示抽屉
                visible: false,
                // 国际化下拉框
                locales: ['繁體中文', 'ENGLISH', '简体中文'],
                // 默认语言
                localeLange: 'ENGLISH',
                // 国际化为英文，切换显示效果
                isEnglish: true,
                // 是否登录
                isLogin: false,
                // 优化头部滚动
                flag: false,
                // 显示语言栏
                showlange: false,
                // kyc认证状态
                auditState: '',
                // 鼠标是否移入头像
                showMouseEnter: true
            }
        },
        created () {
            if (process.client) {
                this.initData()
                this.getkycinfo()
            }
        },
        mounted () {
            this.showlange = true
            this.flag = true
        },
        methods: {
            /**
             * 修改红点状态
             * @param name 菜单名
             */
            hasUpdated (name) {
                let arr = this.$store.state.hasUpdated
                for (let i in arr) {
                    if (arr[i].name === name) {
                        return arr[i].isShow
                    }
                }
                return false
            },
            /**
             * 初始化header数据
             */
            initData () {
                // 判断是否登录
                Cookie.get('refresh_token') ? this.isLogin = true : this.isLogin = false
                // 如果没有登录，清除所有红点状态
                if (!Cookie.get('refresh_token')) {
                    this.$store.dispatch('updateRedDot', 'logOut')
                }
                // 设置当前国际化
                if (!Cookie.get('language')) {
                    let headerLanguage = (navigator.language || navigator.userLanguage) // 获取浏览器语种
                    let language = headerLanguage.replace('-', '_')
                    language === 'en_US' ? Cookie.set('language', language) : Cookie.set('language', 'en_US')
                }
                // 同步国际化
                switch (Cookie.get('language')) {
                case 'zh_TW' :
                    // 跳转二期繁体
                    Cookie.set('language', 'zh_TW')
                    break
                case 'zh_CN' :
                    // 跳转二期简体
                    Cookie.set('language', 'zh_CN')
                    break
                case 'en_US' :
                    this.isEnglish = true
                    this.localeLange = 'ENGLISH'
                    this.$i18n.locale = 'en_US'
                    this.$store.dispatch('updateLang', 'en_US')
                    break
                }
                if (Cookie.get('language') !== 'en_US') {
                    this.routerPush()
                }
                // 获取kyc认证状态
                Bus.$on('setKycState', () => {
                    this.getkycinfo()
                })
            },
            /**
             * 国际化切换
             * @param item.key 国际化标识
             */
            setLocale (item) {
                let locale = ''
                switch (item.key) {
                case '繁體中文' :
                    // 跳转二期繁体
                    Cookie.set('language', 'zh_TW')
                    locale = 'zh_TW'
                    break
                case '简体中文' :
                    // 跳转二期简体
                    Cookie.set('language', 'zh_CN')
                    locale = 'zh_CN'
                    break
                case 'ENGLISH' :
                    this.isEnglish = true
                    locale = 'en_US'
                    this.$store.dispatch('updateLang', 'en_US')
                    axios.defaults.headers['Accept-Language'] = 'en-US,en;q=0.9'
                    Cookie.set('language', 'en_US')
                    break
                }
                this.localeLange = item.key
                if (Cookie.get('language') !== 'en_US') {
                    this.routerPush()
                }
                this.$i18n.locale = locale
                // 保存用户语种
                // if (this.isLogin) {
                //     this.saveUserLanguage()
                // }
                Bus.$emit('checkLange')
            },
            /**
             * 跳转二期判断
             */
            routerPush () {
                let url = window.location.pathname
                if (url.substr(url.length - 1, 1) === '/') {
                    url = url.substr(0, url.length - 1)
                }
                if (url === '/global') {
                    window.location.href = '/'
                } else if (url === '/global/properties') {
                    window.location.href = '/CertificatePurchase'
                } else if (url.indexOf('/global/properties/info') !== -1) {
                    let start = '/global/properties'.length
                    window.location.href = '/CertificatePurchase' + url.substring(start, url.length)
                } else {
                    window.location.href = '/'
                }
            },
            // 保存用户语种
            saveUserLanguage () {
                axios.post('/user/account/language/save')
            },
            // 触发父组件显示右侧抽屉导航
            showDrawer () {
                this.$emit('openDrawer')
                this.visible = true
            },
            // 触发父组件关闭右侧抽屉导航
            onClose () {
                this.$emit('closeDrawer')
                this.visible = false
            },
            /**
             * 跳转至一期
             */
            redirectOne (url) {
                if (url === '/user/login' || url === '/user/register') {
                    Cookie.set('redirectUrl', window.location.pathname)
                }
                window.location.href = url
            },
            /**
             * 新开页
             */
            windowopen (url) {
                window.open(url)
            },
            /**
             * 退出登录
             */
            loginOut () {
                // 删除Cookie登录Token
                Cookie.remove('token')
                Cookie.remove('authorization')
                Cookie.remove('refresh_token')
                Cookie.remove('redirectUrl')
                axios.defaults.headers['Authorization'] = ''
                // 隐藏用户中心导航
                this.isLogin = false
                this.$store.dispatch('updateRedDot', 'logOut')
                this.$router.push({path: '/global'})
            },
            /**
             * 获取kyc认证信息
             */
            getkycinfo () {
                if (Cookie.get('refresh_token')) {
                    let data = {traceId: tool.UUID()}
                    axios.post('/dc/user/kyc/query/user', data)
                        .then(res => {
                            if (res.data.code.toString() === '0') {
                                if (res.data.data) {
                                    if ((res.data.data.passportEndTime - parseInt(this.getnowtime() / 1000) < 30 * 24 * 60 * 60) && res.data.data.auditState === 2) {
                                        this.auditState = 3
                                    } else {
                                        this.auditState = res.data.data.auditState
                                    }
                                } else {
                                    // 0认证中 1未通过 2已通过 3更新护照 4未认证
                                    this.auditState = 4
                                }
                            } else if (res.data.code.toString() === '404') {
                                this.isLogin = false
                            } else {
                                this.auditState = 4
                                this.$message.error(this.$t(`code.${res.data.code.toString()}`))
                            }
                        })
                        .catch(err => {
                            this.$message.error(this.$t(err.message))
                        })
                }
            },
            /**
             *  获取当前时间戳
             */
            getnowtime () {
                return (new Date()).getTime()
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/styles/variable';

    .drawer-title-li-active {
        color: #2EA9DF !important;
    }

    .item-flex {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 70px;
        line-height: 70px;
        padding-top: 15px;

        span {
            line-height: 20px;
        }

        .item-en {
            font-size: 12px;
        }
    }

    .item-flex-padding {
        padding-top: 25px;
    }

    .i18n-dropdown-item a{
        color: rgba(0, 0, 0, 0.65) !important;
    }

    .header {
        .header-content {
            width: @max-width;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #353942;
            .mobile {
                display: none;
            }
            .logo {
                background-image: url('../static/global/logo.png');
                width: 44px;
                height: 41px;
                float: left;
                margin: 14.5px 0;
                background-repeat: round;
            }
            .menu-right {
                width: calc(@max-width - 64px);
                .ant-menu {
                    font-size: 16px;
                    float: left;
                    .ant-menu-dark {
                        .ant-menu-item {
                            padding: 0 20px !important;
                            a {
                                color: #cecece !important;
                            }
                            &:hover a {
                                color: #7a7a7a;
                            }
                        }
                        .ant-menu-submenu-title {
                            padding: 0 20px !important;
                        }
                    }
                }
                .ant-btn-background-ghost {
                    color: #cecece;
                }
                .i18n-dropdown {
                    float: right;
                    font-size: 16px;
                    margin: 0 20px;
                }
                .ant-dropdown-link {
                    text-decoration: none;
                    color: #cecece;
                }
                .menu-bt {
                    padding: 0 20px;
                    border: none;
                    span {
                        font-size: 16px;
                    }
                }
                .register-btn {
                    /*padding-right: 0;*/
                }
                .login-active {
                    float: right;
                    .head-active-box {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .kyc-tooltip {
                            background: #F04134;
                            font-size: 14px;
                            min-width: 73px;
                            text-align: center;
                            border-radius: 4px;
                            height: 30px;
                            cursor: pointer;
                            box-sizing: border-box;
                            padding: 0 10px;
                            position: relative;
                            margin-right: 10px;
                            a {
                                display: block;
                                color: #fff;
                                line-height: 30px;
                                width: 100%;
                                text-decoration: none;
                            }
                            span {
                                position: absolute;
                                right: -10px;
                                top: 50%;
                                transform: translate(0, -50%);
                                display: block;
                                width: 10px;
                                height: 12px;
                                border: 5px solid transparent;
                                border-left-color: #F04134;
                            }
                        }
                        .head-img {
                            width: 22px;
                            height: 70px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 20px;
                            img {
                                width: 20px;
                                height: 20px;
                            }
                            img:last-child {
                                display: none;
                            }
                            img:first-child {
                                display: block;
                            }
                            &:hover {
                                img:first-child {
                                    display: none;
                                }
                                img:last-child {
                                    display: block;
                                }
                            }
                            /deep/ .ant-badge-dot {
                                box-shadow: none;
                                width: 9px;
                                height: 9px;
                                border: 1px solid #353942;
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: @max-width) {
        .menu-right {
            display: none !important;
        }
        .header {
            height: 0.44rem !important;
            line-height: 0.44rem !important;
            .header-content {
                width: 100%;
                justify-content: center;
                position: relative;
                height: 0.44rem;
                .mobile {
                    display: block !important;
                }
                .logo {
                    width: 0.32rem;
                    height: 0.30rem;
                    margin: 0.07rem 0;
                    background-repeat: round;
                }
                .mobile {
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    .ant-badge {
                        position: absolute;
                        top: 0.08rem;
                        .hamb-bt {
                            background: transparent;
                            border: none;
                            display: block;
                            height: 0.28rem;
                            width: 0.28rem;
                            margin-left: 0.16rem;
                            .hamb {
                                height: 0.02rem;
                                left: 0;
                                position: absolute;
                                width: 100%;
                                background-color: #2EA9DF;
                            }
                            .hamb-top {
                                top: 0.05rem
                            }
                            .hamb-middle {
                                margin-top: -0.01rem;
                                top: 50%;
                            }
                            .hamb-bottom {
                                bottom: 0.05rem;
                            }
                        }
                    }
                    /deep/ .ant-badge-dot {
                        box-shadow: none;
                        width: 9px;
                        height: 9px;
                        border: 1px solid #353942;
                    }
                }
            }
        }

        .ant-drawer-content-wrapper {
            width: 85vw !important;
            /deep/ .ant-badge-dot {
                box-shadow: none;
                width: 9px;
                height: 9px;
                border: 1px solid #fff;
            }
            .ant-drawer-header {
                padding: 0 0.3rem;
                border: 0;
            }
            .ant-drawer-body {
                padding-bottom: 0;
            }
            .ant-drawer-title {
                padding-top: 0.06rem;
            }
            .drawer-title {
                margin-bottom: 0.05rem;
                list-style: none;
                padding: 0;
                > li {
                    height: auto;
                    font-size: 16px;
                    color: #333;
                    padding: 0 0 0 0.1rem;
                    a {
                        display: block;
                        color: #333;
                        line-height: 0.4rem;
                        span {
                            font-size: 16px;
                        }
                    }
                    &.login-out {
                        line-height: 0.4rem;
                        cursor: pointer;
                    }
                    &.langbtn {
                        padding-top: 0;
                        padding-bottom: 0;
                        > .ant-menu {
                            background: transparent;
                            border: 0;
                            > .ant-menu-submenu {
                                .ant-menu-submenu-title {
                                    margin: 0;
                                    color: #333;
                                    padding: 0 !important;
                                    span {
                                        font-size: 16px;
                                        line-height: 0.4rem;
                                    }
                                    .ant-menu-submenu-arrow {
                                        background: #333;
                                        left: 0.8rem;
                                    }
                                    &:active {
                                        background: transparent;
                                    }
                                    &:hover {
                                        color: #333;
                                    }
                                    .ant-menu-submenu-arrow:after, .ant-menu-submenu-arrow:before {
                                        background: #333;
                                    }
                                }
                                .ant-menu {
                                    background: transparent;
                                    li {
                                        padding-left: 0.18rem !important;
                                        color: #333;
                                        margin: 0;
                                        font-size: 16px;
                                        line-height: 0.36rem;
                                        height: 0.36rem;
                                        &.ant-menu-item-selected, &.ant-menu-item-active {
                                            background: transparent;
                                            &:hover {
                                                color: #333;
                                            }
                                            &:after {
                                                display: none;
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                    &.planbtn {
                        .ant-menu-submenu-arrow {
                            background: #333;
                            left: 1.2rem!important;
                        }
                    }
                }
                .drawer-title-li-active {
                    color: #2ea9df !important;
                    a {
                        color: #2ea9df !important;
                    }
                }
                .slide-item {
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-left: none;
                    border-right: none;
                    padding: 0.06rem 0;
                    margin: 0.06rem 0;
                }
            }
        }
    }
</style>
