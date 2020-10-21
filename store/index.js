import Locale from '~/locales'

/**
 * 全局变量
 * @returns {{locales, locale: *}}
 */
export const state = () => ({
    locales: Locale(),
    locale: Locale()[0],
    hasUpdated: [
        {
            name: 'USERCENTER',
            isShow: false
        },
        {
            name: 'POSITIONPLAN',
            isShow: false
        },
        {
            name: 'MYPROPERTY',
            isShow: false
        },
        {
            name: 'MYWALLET',
            isShow: false
        },
        {
            name: 'TRANSACTIONRECORD',
            isShow: false
        },
        {
            name: 'ADDRESSMANAGEMENT',
            isShow: false
        },
        {
            name: 'MYMESSAGE',
            isShow: false
        },
        {
            name: 'AUTHENTICATIONKYC',
            isShow: false
        },
        {
            name: 'RECHARGERECORD',
            isShow: false
        },
        {
            name: 'WITHDRAWALSRECORD',
            isShow: false
        },
        {
            name: 'PURCHASERECORD',
            isShow: false
        },
        {
            name: 'PTPURCHASERECORD',
            isShow: false
        },
        {
            name: 'TRANSFERRECORD',
            isShow: false
        }
    ]
})

export const mutations = {
    /**
     * @param locale 当前选中的国际化标识
     * @constructor
     */
    SET_LANG (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    },
    /**
     * @param val 要修改红点的数据源
     */
    SET_RedDot (state, val) {
        // 第一次接收有红点
        if (val.action === 8201) {
            for (let i in val.data) {
                for (let j in state.hasUpdated) {
                    if (val.data[i].name === state.hasUpdated[j].name) {
                        state.hasUpdated[j].isShow = true
                    }
                }
            }
            // 接收清除红点信息
        } else if (val.action === 8203) {
            for (let i in state.hasUpdated) {
                if (val.dataId === state.hasUpdated[i].name) {
                    state.hasUpdated[i].isShow = false
                }
            }
        }
        // 根据子级设置父级红点，个人中心/交易记录
        for (let i in state.hasUpdated) {
            if (state.hasUpdated[i].name === 'TRANSACTIONRECORD') {
                let arr = ['RECHARGERECORD', 'WITHDRAWALSRECORD', 'PURCHASERECORD', 'PTPURCHASERECORD', 'TRANSFERRECORD']
                for (let j in state.hasUpdated) {
                    if (arr.indexOf(state.hasUpdated[j].name) !== -1 && state.hasUpdated[j].isShow) {
                        state.hasUpdated[i].isShow = true
                        break
                    }
                    state.hasUpdated[i].isShow = false
                }
                break
            }
        }
        for (let i in state.hasUpdated) {
            if (state.hasUpdated[i].name === 'USERCENTER') {
                for (let j in state.hasUpdated) {
                    if (state.hasUpdated[j].name !== 'USERCENTER' && state.hasUpdated[j].isShow) {
                        state.hasUpdated[i].isShow = true
                        break
                    }
                    state.hasUpdated[i].isShow = false
                }
                break
            }
        }
        // 如果退出登录，清除所有红点状态
        if (val === 'logOut') {
            for (let i in state.hasUpdated) {
                state.hasUpdated[i].isShow = false
            }
        }
    }
}

export const actions = {
    /**
     * @param commit 国际化修改
     * @param val 国际化标识
     */
    updateLang ({commit}, val) {
        commit('SET_LANG', val)
    },
    /**
     * @param commit 数据更新提示红点修改
     * @param val 修改的数据源
     */
    updateRedDot ({commit}, val) {
        commit('SET_RedDot', val)
    }
}
