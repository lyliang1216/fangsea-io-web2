import Tool from '~/assets/utils/tool'

export default ({redirect, req}) => {
    // 服务端渲染时判断客户端类型
    if (process.server) {
        let cookies = Tool.getcookiesInServer(req)
        // 获取语言判断跳转二期页面
        if (cookies.language && cookies.language !== 'en_US') {
            let url = req.url
            // 去除路径最后斜杠(如果有)
            if (url.substr(url.length - 1, 1) === '/') {
                url = url.substr(0, url.length - 1)
            }
            if (url === '/global') {
                redirect('/')
            } else if (url === '/global/properties') {
                redirect('/CertificatePurchase')
            } else if (url.indexOf('/global/properties/info') !== -1) {
                let start = '/global/properties'.length
                redirect('/CertificatePurchase' + url.substring(start, url.length))
            } else {
                redirect('/')
            }
        }
    }
}
