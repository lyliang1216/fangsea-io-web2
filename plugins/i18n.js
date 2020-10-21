import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'

Vue.use(VueI18n)

export default ({ app, store }) => {
    let data = {}
    let Locale = store.state.locales
    for (let i = 0; i < Locale.length; i++) {
        data[Locale[i]] = require(`~/locales/${Locale[i]}.json`)
    }
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        locale: Cookie.get('language') || store.state.locale,
        fallbackLocale: Cookie.get('language') || store.state.locale,
        messages: data
    })
    // 自定义页面跳转方法
    app.i18n.path = (link) => {
        return `/${app.i18n.locale}/${link}`
    }
}
