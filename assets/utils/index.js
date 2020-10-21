/* eslint-disable */
import Cookie from 'js-cookie'

/**
 * Parse the time to string
 * @param {(Object|string|number)} timek
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return timeStr
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length
    for (let i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i)
        if (code > 0x7f && code <= 0x7ff) s++
        else if (code > 0x7ff && code <= 0xffff) s += 2
        if (code >= 0xDC00 && code <= 0xDFFF) i--
    }
    return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
    if (!json) return ''
    return cleanArray(
        Object.keys(json).map(key => {
            if (json[key] === undefined) return ''
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
        })
    ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
        '"}'
    )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length)
    }
    element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
        return new Date(new Date().toDateString())
    }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
    return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

/**
 * 将时间戳转换成天或小时或分钟
 */
export function toTime(val) {
    let endTime = ''
    let newDate = new Date()
    let times = val - newDate.getTime()
    let days = Math.floor(times / (24 * 3600 * 1000))
    let hours = Math.floor(times / (3600 * 1000))
    let minutes = Math.floor(times / (60 * 1000))
    if (days >= 1) {
        endTime = `${days}天`
    }
    if (hours < 24) {
        endTime = `${hours}小时`
    }
    if (minutes < 60) {
        endTime = `${minutes}分钟`
    }
    return endTime
}

/**
 * 将时间戳转换成剩余天数小时分钟
 */
export function toCountDown(val) {
    val = val * 1000
    let checkTime = function checkTime(i){
        if (i < 10) {
            i = "0" + i
        }
        return i
    }
    let newDate = new Date()
    let leftTime
    if (val > newDate.getTime() ) {
        leftTime = val - newDate.getTime()
    } else {
        return `00,00,00,00`
    }
    let dd = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
    let hh = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
    let mm = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟数
    let ss = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
    dd = checkTime(dd);
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);//小于10的话加0
    return dd + `,` + hh + `,` + mm + `,` + ss
}

/**
 * 将字符串“，”转换为“-”
 */
export function toRegionsName(val) {
    return val.replace(/,/g, '-')
}

/**
 * 处理JS小数精度问题
 */
export function formatNumberDecimal(val, exchangeRate) {
    exchangeRate += ''
    let x = exchangeRate.split('.')
    if (x.length > 1) {
        let pow = Math.pow(10, x[1].length)
        val = val * parseInt(x[0] + x[1]) / pow
    } else {
        val = val * exchangeRate
    }
    return val
}

/**
 * 美化数字3位数添加“,”
 */
export function formatNumber(val) {
    val += ''
    let x = val.split('.')
    let x1 = x[0]
    let x2 = x.length > 1 ? '.' + x[1] : ''
    let rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
}

/**
 * 美化数字3位数添加“,” 动态保留小数位
 */
export function formatNumberAuto(val, length) {
    let m = val.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    val = val.toFixed(Math.max(0, (m[1] || '').length - m[2]));
    val += ''
    let x = val.split('.')
    let x1 = x[0]
    let x2
    if (x.length > 1) {
        x2 = '.' + x[1]
        if (x[1].length > length) {
            x2 = '.' + x[1].substring(0, length)
        }
    } else {
        x2 = ''
    }
    let rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
}
/**
 * 币种动态保留小数位(不足部分加+ 0)
 */
export function formatNumberCurrency(val, length) {
    val += ''
    let x = val.split('.')
    if( x[0]!== ''){
        let x1 = parseInt(x[0], 10)
        let x2 = ''
        if (x.length > 1) {
            x2 = '.' + x[1]
            if (x[1].length > length) {
                if (length !== 0) {
                    x2 = '.' + x[1].substring(0, length)
                } else {
                    x2 = ''
                }
            }
            if(x[1].length < length){
                let data = length - x[1].length
                let arr = ''
                for( let i = 0; i < data; i++ ){
                    arr += '0'
                }
                x[1] += arr
                if(arr.length > 0){
                    x2 = '.' + x[1]
                }else {
                    x2 = ''
                }
            }
        } else {
            let data = length
            let arr = ''
            for( let i = 0; i < data; i++ ){
                arr += '0'
            }
            x[1] = arr
            if(arr.length > 0){
                x2 = '.' + x[1]
            }else {
                x2 = ''
            }
        }
        return x1 + x2
    }
}

/**
 * 减法
 */
export function dcmAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    return (accMul(arg1,m)-accMul(arg2,m))/m;
}

/**
 * 乘法
 */
export function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
/**
 * PT 的数据处理
 */
export function multiplicateAndRectifyUpwards(val, arr, length){
    val = ( val === '' ? 0 : val)
    let data= accMul(val, arr).toString()
    let x = data.split('.')
    if( x[0]!== ''){
        let x1 = parseInt(x[0], 10)
        let x2 = ''
        if (x.length > 1) {
            x2 = '.' + x[1]
            if (x[1].length > length) {
                if (length !== 0) {
                    x2 = '.' + x[1].substring(0, length)
                } else {
                    x2 = ''
                }
            }
        }
        return x1 + x2
    }
}

/**
 * 处理输入框只能输入整数
 */
export function parseintFun(val, userMaxAmount) {
    let maxDate = userMaxAmount * 10
    if( val > maxDate ) {
        val+=''
        val =  val.substring(0, val.length - 1)

    }
    if(val){
        val += ''
        // // 以 . 开头的数值直接返回空,小数去掉末尾
        if(val.startsWith('.')){
            val = ''
        } else {
            // 处理以 0 开头的数值
            val =  parseInt(val, 10)
        }
    }
    return val
}

/**
 * 验证 输入的数值是否超过14位数
 */
export function maxLengthCheck(val) {
    let isPass = true
    val += ''
    let x = val.split('.')
    if( x[0]!== '' && x[1] !== undefined){
        if(x[1].length > 14){
            isPass = false
        }
    }
    return isPass
}

/**
 *  过滤计时器为 0  的时候
 */
export function filteZeroFun (val) {
    return val =  ( val === 0 ? 1 : val)
}

/**
 *  判断域名配置websocket地址
 */
export function getWsUri () {
    if (process.client) {
        switch (window.location.host) {
            case 'www.ptohome.com':
                return 'wss://www.ptohome.com/message'
                break
            case 'ptohome.com':
                return 'wss://www.ptohome.com/message'
                break
            case 'stg.ptohome.com':
                return 'wss://stg.ptohome.com/message'
                break
            case '192.168.91.200':
                return 'ws://192.168.91.200:18095/ws'
                break
            case '192.168.91.183':
                return 'ws://192.168.91.183:18095/ws'
                break
            default:
                return 'ws://192.168.91.200:18095/ws'
                break
        }
    }
}

/**
 *  去除path首位斜杠
 */
export function removeSlash (val) {
    let value = val.toString()
    if (value[0] === '/') {
        return value.substring(1, value.length)
    } else {
        return value
    }
}