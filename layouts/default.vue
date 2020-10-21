<template>
    <div>
        <a-locale-provider :locale="localeLange">
            <nuxt/>
        </a-locale-provider>
    </div>
</template>

<script>
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
    import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
    import enUS from 'ant-design-vue/lib/locale-provider/en_US'
    import {getWsUri} from '~/assets/utils/index'
    import {Bus} from '~/assets/utils/bus'
    import tool from '~/assets/utils/tool'
    import axios from '~/plugins/axios'
    import Cookie from 'js-cookie'
    import 'babel-polyfill'

    export default {
        data () {
            return {
                // 语言
                localeLange: zhTW,
                // websocket
                websock: '',
                // websocketId
                businessId: '',
                // 重连计时器
                socketTimer: null,
                // 倒计时
                timer: 0,
                // 在线客服已加载
                onlineOnReady: false
            }
        },
        created () {
            if (process.client && Cookie.get('refresh_token')) {
                this.getbusinessId()
            }
            this.changelang()
        },
        mounted () {
            this.initData()
            // 异步加载谷歌统计，在线客服(优化首屏加载体验)
            this.$nextTick(() => {
                setTimeout(() => {
                    this.loadOnline()
                    this.loadScript()
                }, 5000)
            })
        },
        methods: {
            // 初始数据
            initData () {
                // 添加Dom渲染后的加载效果
                this.$nextTick(() => {
                    this.$nuxt.$loading.start()
                    setTimeout(() => {
                        this.$nuxt.$loading.finish()
                    }, 300)
                })
                // 设置同时出现消息个数
                this.$message.config({
                    maxCount: 1
                })
            },
            changelang () {
                // 监听国际化变化，改变在线客服；
                Bus.$on('checkLange', () => {
                    if (this.onlineOnReady) {
                        this.openOnline()
                    }
                })
                // 监听小红点变化，同步后端
                Bus.$on('publicEvent', (name) => {
                    if (this.websock.readyState === 1) {
                        let arr = this.$store.state.hasUpdated
                        for (let i in arr) {
                            if (arr[i].name === name && arr[i].isShow) {
                                this.websocketsend('', 8202, arr[i].name)
                                break
                            }
                        }
                    }
                })
            },
            /**
             * 获取userId（建立通道时使用）
             */
            getbusinessId () {
                let data = {traceId: tool.UUID()}
                axios.post('/user/info/query', data)
                    .then(res => {
                        if (res.data.code.toString() === '0') {
                            if (res.data.data) {
                                this.businessId = res.data.data.userCode
                                this.ConnectWebsocket()
                            }
                        }
                    })
            },
            // 连接websocket
            ConnectWebsocket () {
                const wsuri = getWsUri()
                this.websock = new WebSocket(wsuri)
                this.websock.onopen = this.websocketonopen
                this.websock.onmessage = this.websocketonmessage
                this.websock.onerror = this.websocketonerror
                this.websock.onclose = this.websocketclose
            },
            // 连接成功
            websocketonopen () {
                this.websocketsend('', 8200)
            },
            // 数据接收
            websocketonmessage (e) {
                let data = JSON.parse(e.data)
                if (data.action === 8201) {
                    if (JSON.stringify(data.data).indexOf('AUTHENTICATIONKYC') !== -1) {
                        // 更新kyc认证状态
                        Bus.$emit('setKycState')
                    }
                    this.$store.dispatch('updateRedDot', data)
                } else if (data.action === 8203) {
                    this.$store.dispatch('updateRedDot', data)
                } else if (data.action === 8108) {
                    this.websock.close()
                }
            },
            // 连接失败
            websocketonerror () {
                if (this.websock !== '') {
                    if (this.timer === 0) {
                        clearInterval(this.socketTimer)
                        this.socketTimer = null
                        this.setTimer()
                    }
                    if (this.timer > 30) {
                        clearInterval(this.socketTimer)
                        this.socketTimer = null
                        this.websock.close()
                        this.websock = ''
                        this.timer = 0
                    } else if (this.socketTimer !== null) {
                        this.ConnectWebsocket()
                    }
                } else {
                    clearInterval(this.socketTimer)
                    this.socketTimer = null
                }
            },
            // 设置定时器
            setTimer () {
                this.socketTimer = setInterval(() => {
                    this.timer++
                }, 1000)
            },
            // 关闭通道
            websocketclose () {
                if (this.websock !== '') {
                    if (this.timer === 0) {
                        clearInterval(this.socketTimer)
                        this.socketTimer = null
                        this.setTimer()
                    }
                    if (this.timer > 30) {
                        clearInterval(this.socketTimer)
                        this.socketTimer = null
                        this.websock.close()
                        this.websock = ''
                        this.timer = 0
                    } else if (this.socketTimer !== null) {
                        this.ConnectWebsocket()
                    }
                } else {
                    clearInterval(this.socketTimer)
                    this.socketTimer = null
                }
            },
            /**
             * 数据发送
             * @param msg 发送的数据
             * @param action 操作码
             * @param id 菜单id
             */
            websocketsend (msg, action, id) {
                let data = {
                    businessId: this.businessId,
                    data: msg,
                    action: action
                }
                if (id) {
                    data.dataId = id
                }
                this.websock.send(JSON.stringify(data))
            },
            gtag () {
                window.dataLayer.push(arguments)
            },
            // 流量统计
            googleCode () {
                window.dataLayer = window.dataLayer || []
                this.gtag('js', new Date())
                this.gtag('config', 'UA-143051576-1')
            },
            // 加载在线客服JS
            loadOnline () {
                let script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = 'https://static.zdassets.com/ekr/snippet.js?key=feb75ef2-3071-46a0-b1ab-47e2e8373393'
                script.id = 'ze-snippet'
                if (script.readyState) {
                    // IE
                    script.onreadystatechange = () => {
                        if (script.readyState === 'loaded' || script.readyState === 'complete') {
                            this.onlineOnReady = true
                            this.openOnline()
                            script.onreadystatechange = null
                        }
                    }
                } else {
                    // FF, Chrome, Opera, ...
                    script.onload = () => {
                        this.onlineOnReady = true
                        this.openOnline()
                    }
                }
                document.getElementsByTagName('head')[0].appendChild(script)
            },
            // 开启在线客服
            openOnline () {
                let kefulang = ''
                let conciergeName = ''
                switch (Cookie.get('language')) {
                case 'zh_CN':
                    kefulang = 'zh-cn'
                    conciergeName = '在线交谈'
                    this.localeLange = zhCN
                    break
                case 'zh_TW':
                    kefulang = 'zh-tw'
                    conciergeName = '在線交談'
                    this.localeLange = zhTW
                    break
                case 'en_US':
                    kefulang = 'en-US'
                    conciergeName = 'Online Chat'
                    this.localeLange = enUS
                    break
                }
                /*eslint-disable*/
                zE(function () {
                    zE.setLocale(kefulang)
                })
                window.zESettings = {
                    webWidget: {
                        launcher: {
                            chatLabel: {
                                'zh-cn': '在线客服',
                                'zh-tw': '在線客服',
                                'en-US': 'Chat'
                            }
                        },
                        chat: {
                            title: {
                                'zh-cn': '客服',
                                'zh-tw': '客服',
                                'en-US': 'Customer Service'
                            },
                            concierge: {
                                name: conciergeName,
                                title: {
                                    'zh-cn': '询问我们任何问题',
                                    'zh-tw': '詢問我們任何問題',
                                    'en-US': 'Ask us any questions'
                                }
                            }
                        }
                    }
                }
            },
            loadScript () {
                let script = document.createElement('script')
                let code = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K597J4T');`
                try {
                    script.appendChild(document.createTextNode(code))
                } catch (ex) {
                    script.text = code
                }
                document.getElementsByTagName('head')[0].appendChild(script)

                let noscript = document.createElement('noscript')
                let iframe = document.createElement('iframe')
                iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-K597J4T'
                iframe.height = '0'
                iframe.width = '0'
                iframe.style.display = 'none'
                iframe.style.visibility = 'hidden'
                document.getElementsByTagName('body')[0].appendChild(noscript)
                document.getElementsByTagName('noscript')[0].appendChild(iframe)
            }
        }
    }
</script>
