<template>
    <a-layout id="components-layout-top" class="layout" :class="drawer">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer"
                 @closeDrawer="closeDrawer" style="margin-bottom: 0;"/>
        <section class="container">
            <a-layout-content>
                <div class="banner-box">
                    <div class="banner-text">
                        <p class="banner-title offside-font">{{$t('PropTech.PropTech_title')}}</p>
                    </div>
                </div>
                <div class="platform-features">
                    <div class="features-content">
                        <div class="content-box">
                            <div class="content-title-box">
                                <p class="content-title offside-font">{{$t('PropTech.PropTech_title')}}</p>
                                <p class="content-subtitle offside-font">{{$t('PropTech.PropTech_subtitle')}}</p>
                            </div>
                            <div class="content-desc">
                                <p class="desc-item">{{$t('PropTech.PropTech_desc_1')}}</p>
                                <p class="desc-item">{{$t('PropTech.PropTech_desc_2')}}</p>
                                <p class="desc-item">{{$t('PropTech.PropTech_desc_3')}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="why-content-main">
                    <div class="main-item" id="INTERNET">
                        <div class="main-detail">
                            <a-row type="flex" justify="space-between" row-flex="space-around" class="content-desc">
                                <a-col :span="8" class="detail-img">
                                    <img :class="internetIconShow ? 'fade-enter':''" src="/global/proptech/icon1.png" alt="" class="item-icon">
                                </a-col>
                                <a-col :span="14" class="detail-text" :class="internetShow?'slide-right-enter':''">
                                    <div class="title-box">
                                        <p class="title offside-font">{{$t('PropTech.PropTech_item_1_title')}}</p>
                                    </div>
                                    <div class="detail-content">
                                        <ul class="items">
                                            <li>{{$t('PropTech.PropTech_item_1_desc_1')}}</li>
                                            <li>{{$t('PropTech.PropTech_item_1_desc_2')}}</li>
                                            <li>{{$t('PropTech.PropTech_item_1_desc_3')}}</li>
                                            <li>{{$t('PropTech.PropTech_item_1_desc_4')}}</li>
                                        </ul>
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                    <div class="main-item" id="PROPERTY">
                        <div class="main-detail">
                            <a-row type="flex" justify="space-between" row-flex="space-around" class="content-desc">
                                <a-col :span="8" class="detail-img" >
                                    <img :class="propertyIconShow ? 'fade-enter':''" src="/global/proptech/icon2.png" alt="" class="item-icon">
                                </a-col>
                                <a-col :span="14" class="detail-text" :class="propertyShow?'slide-left-enter':''">
                                    <div class="title-box">
                                        <p class="title offside-font">{{$t('PropTech.PropTech_item_2_title')}}</p>
                                    </div>
                                    <div class="detail-content">
                                        <ul class="items">
                                            <li>{{$t('PropTech.PropTech_item_2_desc_1')}}</li>
                                            <li>{{$t('PropTech.PropTech_item_2_desc_2')}}</li>
                                            <li>{{$t('PropTech.PropTech_item_2_desc_3')}}</li>
                                            <li>{{$t('PropTech.PropTech_item_2_desc_4')}}</li>
                                        </ul>
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                    <div class="main-item" id="PROPTECH">
                        <div class="main-detail">
                            <a-row type="flex" justify="space-between" row-flex="space-around" class="content-desc">
                                <a-col :span="8" class="detail-img">
                                    <img :class="proptechIconShow ? 'fade-enter':''" src="/global/proptech/icon3.png" alt="" class="item-icon">
                                </a-col>
                                <a-col :span="14" class="detail-text" :class="proptechShow ? 'slide-right-enter':''">
                                    <div class="title-box">
                                        <p class="title offside-font">{{$t('PropTech.PropTech_item_3_title')}}</p>
                                    </div>
                                    <div class="detail-content">
                                        <ul class="items">
                                            <li>{{$t('PropTech.PropTech_item_3_desc_1')}}</li>
                                        </ul>
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </div>
            </a-layout-content>
        </section>
        <fonter/>
    </a-layout>
</template>

<script>
    import FsHead from '~/components/FangseaHeader'
    import fonter from '~/components/Footer'

    export default {
        data () {
            return {
                key: 0,
                type: 0,
                centerKey: 0,
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false},
                internetShow: false,
                internetIconShow: false,
                propertyShow: false,
                propertyIconShow: false,
                proptechShow: false,
                proptechIconShow: false
            }
        },
        mounted () {
            this.handleScroll()
            window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
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
            },
            /**
             * 页面滚动监听
             */
            handleScroll () {
                let scrollTop = window.pageYOffset
                let windowHeight = document.body.clientHeight
                let windowWidth = document.body.clientWidth
                let internetTop = document.getElementById('INTERNET').offsetTop
                let propertyTop = document.getElementById('PROPERTY').offsetTop
                let proptechTop = document.getElementById('PROPTECH').offsetTop
                if (windowWidth >= 1200) {
                    if (scrollTop + windowHeight - 150 > internetTop) {
                        this.internetShow = true
                    }
                    if (scrollTop + windowHeight - 350 > internetTop) {
                        this.internetIconShow = true
                    }
                    if (scrollTop + windowHeight - 150 > propertyTop) {
                        this.propertyShow = true
                    }
                    if (scrollTop + windowHeight - 350 > propertyTop) {
                        this.propertyIconShow = true
                    }
                    if (scrollTop + windowHeight - 50 > proptechTop) {
                        this.proptechShow = true
                    }
                    if (scrollTop + windowHeight - 50 > proptechTop) {
                        this.proptechIconShow = true
                    }
                } else {
                    if (scrollTop + windowHeight - 200 > internetTop) {
                        this.internetShow = true
                    }
                    if (scrollTop + windowHeight - 80 > internetTop) {
                        this.internetIconShow = true
                    }
                    if (scrollTop + windowHeight - 200 > propertyTop) {
                        this.propertyShow = true
                    }
                    if (scrollTop + windowHeight - 80 > propertyTop) {
                        this.propertyIconShow = true
                    }
                    if (scrollTop + windowHeight - 200 > proptechTop) {
                        this.proptechShow = true
                    }
                    if (scrollTop + windowHeight - 80 > proptechTop) {
                        this.proptechIconShow = true
                    }
                }
            }
        },
        components: {
            FsHead,
            fonter
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/variable.less";

    .banner-box {
        width: 100%;
        height: 750px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: url("/global/how-to-buy/head-banner-bg.jpg");
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

    .platform-features {
        width: 100%;
        padding: 130px 0 170px;
        background-color: #fff;
        background-image: url("/global/how-to-buy/content-bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-attachment: scroll;
        background-color: rgba(255, 255, 255, 0.8);
        background-blend-mode: color-burn;
        .features-content {
            width: @max-width;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 7px 0 rgba(168, 168, 168, .5);
            .content-box {
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                flex-shrink: 1;
                margin: 20px;
                .content-title-box{
                    position: relative;
                    &:after {
                        content: '';
                        display: block;
                        width: 70%;
                        border-top: 1px solid #007ac1;
                        margin: 20px auto;
                    }
                    .content-title {
                        color: #007ac1;
                        font-size: 40px;
                        line-height: 48px;
                        text-align: center;
                        margin-bottom: 0;
                    }
                    .content-subtitle{
                        margin: 10px auto;
                        font-size: 18px;
                        line-height: 28px;
                        text-align: center;
                    }
                }
                .content-desc {
                    margin-top: 30px;
                    .desc-item {
                        font-size: 15px;
                        line-height: 1.85;
                        margin-bottom: 25px;
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }

    .why-content-main {
        padding: 0;
        .main-item {
            background-color: rgb(247, 247, 247);
            &:nth-child(even) {
                .content-desc {
                    flex-direction: row-reverse;
                }
            }
            &:nth-child(odd) {
                background-color: #ffffff;
            }
            .main-detail {
                width: @max-width;
                margin: 0 auto;
                .detail-text {
                    width: 620px;
                    padding: 100px 0 50px;
                    opacity: 0;
                    .title-box {
                        position: relative;
                        padding: 0 0 20px;
                        .title {
                            color: #007ac1;
                            font-size: 50px;
                            line-height: 65px;
                            text-align: center;
                            margin-bottom: 0;
                            text-transform: uppercase;
                        }
                    }
                    .detail-content {
                        margin-top: 20px;
                        font-size: 15px;
                        line-height: 1.85;
                        .description {
                            margin-bottom: 0;
                        }
                        .items{
                            list-style: none;
                            padding-left: 0;
                            li{
                                margin-bottom: 24px;
                            }
                        }
                    }

                }
                .detail-img {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 560px;
                    .item-icon {
                        width: 300px;
                        opacity: 0;
                    }
                }
            }
        }
    }


    .fade-enter{
        animation: fade 1s ease forwards;
    }
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .slide-left-enter{
        animation: slide-left 1s ease forwards;
    }
    @keyframes slide-left {
        0% {
            transform: translateX(-50px);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    .slide-right-enter{
        animation: slide-right 1s ease forwards;
    }
    @keyframes slide-right {
        0% {
            transform: translateX(50px);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
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

        .platform-features {
            width: 100%;
            padding: 40px 0 80px;
            .features-content {
                width: 100%;
                margin: 0 auto;
                padding: 20px;
                box-shadow: 0 0 7px 0 rgba(168, 168, 168, .5);
                .content-box {
                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    -webkit-flex-direction: column;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    flex-shrink: 1;
                    margin: 20px;
                    .content-title-box{
                        position: relative;
                        &:after {
                            content: '';
                            display: block;
                            width: 70%;
                            border-top: 1px solid #007ac1;
                            margin: 20px auto;
                        }
                        .content-title {
                            color: #007ac1;
                            font-size: 40px;
                            line-height: 48px;
                            text-align: center;
                            margin-bottom: 0;
                        }
                        .content-subtitle{
                            margin: 10px auto;
                            font-size: 18px;
                            line-height: 28px;
                            text-align: center;
                        }
                    }
                    .content-desc {
                        margin-top: 30px;
                        .desc-item {
                            font-size: .14rem;
                            line-height: 1.85;
                            margin-bottom: 25px;
                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
            }
        }

        .why-content-main {
            padding: 0;
            .main-item {
                background-color: rgb(247, 247, 247);
                &:nth-child(even) {
                    .content-desc {
                        flex-direction: row-reverse;
                    }
                }
                &:nth-child(odd) {
                    background-color: #ffffff;
                }
                .main-detail {
                    width: 100%;
                    margin: 0 auto;
                    .content-desc {
                        display: inline-block;
                        .detail-text {
                            width: 100%;
                            padding: .38rem 5% .5rem;
                            .title-box {
                                position: relative;
                                padding: 0 0 20px;
                                .title {
                                    color: #007ac1;
                                    font-size: .4rem;
                                    line-height: 1.6;
                                    text-align: center;
                                    margin-bottom: 0;
                                }
                            }
                            .detail-content {
                                margin-top: 20px;
                                font-size: .14rem;
                                line-height: 1.85;
                                .description {
                                    margin-bottom: 0;
                                }
                            }

                        }
                        .detail-img {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            margin-top: .3rem;
                            .item-icon {
                                width: 1.8rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
