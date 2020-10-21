/**
 * 空数字转中划线
 * @param number 数字值
 */
export function nullToLine (number) {
    if (typeof number === 'number') {
        number = number.toString()
    }
    let bool = number && number.length > 0
    return bool ? number : '-'
}

/**
 * 去除字符串头尾空格
 * @param val 数据源
 */
export function removeSpaces (val) {
    if (val) {
        val += ''
        return val.replace(/(^\s*)|(\s*$)/g, '')
    } else {
        return val
    }
}
