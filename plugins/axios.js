/* eslint-disable */
import * as axios from 'axios'
import Cookie from 'js-cookie'

let devBaseUrl = "http://192.168.91.86:8080" // 开发环境 http://192.168.91.203
let testBaseUrl = '/api/v2' // 测试环境 http://192.168.91.183
let preBaseUrl = '' // 预上线环境
let proBaseUrl = '' // 上线环境
let options = {
    baseURL: testBaseUrl,
    timeout: 30000 // 请求超时时间5分钟
}

// 创建axios实例
let services = axios.create(options)

if (process.client) {
    // 设置默认消息头
    if (Cookie.get('refresh_token')) {
        axios.defaults.headers['Authorization'] = 'bearer' + ' ' + Cookie.get('token')
    }
    // 初始国际化
    switch (Cookie.get('language')) {
        case 'zh_TW' :
            axios.defaults.headers['Accept-Language'] = 'zh-TW,zh;q=0.9'
            break
        case 'zh_CN' :
            axios.defaults.headers['Accept-Language'] = 'zh-CN,zh;q=0.9'
            break
        case 'en_US' :
            axios.defaults.headers['Accept-Language'] = 'en-US,en;q=0.9'
            break
        default:
            axios.defaults.headers['Accept-Language'] = 'zh-TW,zh;q=0.9'
    }
}

// 全局拦截请求
// services.interceptors.request.use()

// 全局拦截响应
services.interceptors.response.use(
    response => {
        if (process.client) {
            let url = ''
            url = window.location.href
            // 判断请求AToken是否过期
            if (response.data.code.toString() === '7000') {
                return new Promise(resolve => {
                    let formdata = new FormData()
                    formdata.append('grant_type', 'refresh_token')
                    formdata.append('client', 'user')
                    formdata.append('refresh_token', Cookie.get('refresh_token'))
                    services.post('/oauth/refreshToken', formdata, {
                        headers: {'Authorization': Cookie.get('authorization')}
                    })
                        .then(res => {
                            // 刷新成功
                            if (res.data.code.toString() === '0') {
                                // 用于登录权限拦截
                                Cookie.set('token', res.data.access_token)
                                Cookie.set('refresh_token', res.data.refresh_token, {expires: res.data.refresh_token_expires_in / 60 / 60 / 24})
                                // 用于后端校验登录状态
                                services.defaults.headers['Authorization'] = 'bearer' + ' ' + res.data.access_token
                                // 请求参数
                                let params = response.config.data
                                // 请求参数地址
                                let url = response.config.url.slice(services.defaults.baseURL.length)
                                // 发送用户操作请求
                                let data = async function () {
                                    let data = await services.post(url, JSON.parse(params))
                                    resolve(data)
                                }
                                data()
                            } else {
                                // 账号在其他处登录
                                if (Cookie.get('refresh_token') && (response.config.url === '/api/v2/user/info/query' || response.config.url === '/api/v2/dc/user/kyc/query/user')) {
                                    Cookie.remove('token')
                                    Cookie.remove('authorization')
                                    Cookie.remove('refresh_token')
                                    res.data.code = '404'
                                    resolve(res)
                                } else {
                                    // 不需要跳转登录的用户请求
                                    // 请求参数
                                    let params = typeof response.config.data === 'string' ? response.config.data : JSON.stringify(response.config.data)
                                    // 请求参数地址
                                    let url = response.config.url.slice(services.defaults.baseURL.length)
                                    services.defaults.headers['need-check'] = 'true'
                                    // 发送用户操作请求
                                    let data = async function () {
                                        let data = await services.post(url, JSON.parse(params))
                                        services.defaults.headers['need-check'] = 'false'
                                        resolve(data)
                                    }
                                    data()
                                }
                            }
                        })
                })
            } else if (response.data.code.toString() === '7001') {
                let flag = false
                // 跳转登录黑名单
                let blacklist = ['/properties/info/']
                blacklist.forEach((item, index) => {
                    if (url.indexOf(item) !== -1) {
                        flag = true
                    }
                })
                if (flag) {
                    // r_token刷新失败，重新登录
                    Cookie.remove('token')
                    Cookie.remove('authorization')
                    Cookie.remove('refresh_token')
                    Cookie.set('redirectUrl', url)
                    window.location.href = '/user/login'
                } else {
                    return response
                }
            } else {
                return response
            }
        } else {
            return response
        }
    },
    error => {
        if (error.message.includes('timeout')) {
            error.message = 'error.0001'
        }
        if (error.message.includes('Network')) {
            error.message = 'error.0002'
        }
        if (error.message.includes('404')) {
            error.message = 'error.0003'
        }
        return Promise.reject(error)
    }
)

export default services
