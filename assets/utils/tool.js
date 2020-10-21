import Cookie from 'js-cookie'

/**
 * 常用工具
 */
export default class Tool {
    /**
     * 存储localStorage
     */
    static setStore (name, content) {
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
    }

    /**
     * 获取localStorage
     */
    static getStore (name) {
        if (!name) return
        return window.localStorage.getItem(name)
    }

    /**
     * 删除localStorage
     */
    static removeStore (name) {
        if (!name) return
        window.localStorage.removeItem(name)
    }

    /**
     * 生成唯一ID
     */
    static UUID () {
        return Number(Math.random().toString().substr(3, Math.floor(Math.random() * 10 + 1)) + Date.now()).toString(36)
    }

    /**
     *  获取服务端cookie
     */
    static getcookiesInServer (req) {
        let serviceCookie = {}
        req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
            let parts = val.split('=')
            serviceCookie[parts[0].trim()] = (parts[1] || '').trim()
        })
        return serviceCookie
    }

    /**
     *  获取客户端cookie
     */
    static getcookiesInClient (key) {
        return Cookie.get(key) ? Cookie.get(key) : ''
    }

    /**
     * 国际化变量参数
     * @param val 国际化内容
     * @param params 变量数组
     */
    static intervariable (val, params) {
        if (params) {
            params.forEach((item, index) => {
                val = val.replace(new RegExp('\\{' + index + '\\}', 'g'), item)
            })
        }
        return val
    }

    /**
     * 服务端请求地址
     * @param req
     * @returns {string}
     */
    static getAddress (req) {
        let _http = (req.headers.host.indexOf('stg') > -1 || req.headers.host.indexOf('ptohome') > -1) ? 'https://' : 'http://'
        let address = `${_http}${req.headers.host}/api/v2`
        return address
    }
}
