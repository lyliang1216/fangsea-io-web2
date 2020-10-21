<template>
    <div class="why-box">
        <div class="why-content">
            <div class="content-title offside-font">{{$t('Home.home_why_title')}}</div>
            <a-row type="flex" justify="space-between" row-flex="space-around" class="content-desc">
                <a-col :span="6" class="desc-item">
                    <img src="/global/home-imgs/icons/icon1.png" alt="" class="item-icon">
                    <span class="item-text offside-font">{{$t('Home.home_why_item_1_title')}}</span>
                </a-col>
                <a-col :span="6" class="desc-item">
                    <img src="/global/home-imgs/icons/icon2.png" alt="" class="item-icon">
                    <span class="item-text offside-font">{{$t('Home.home_why_item_2_title')}}</span>
                </a-col>
                <a-col :span="6" class="desc-item">
                    <img src="/global/home-imgs/icons/icon3.png" alt="" class="item-icon">
                    <span class="item-text offside-font">{{$t('Home.home_why_item_3_title')}}</span>
                </a-col>
                <a-col :span="6" class="desc-item">
                    <img src="/global/home-imgs/icons/icon4.png" alt="" class="item-icon">
                    <span class="item-text offside-font">{{$t('Home.home_why_item_4_title')}}</span>
                </a-col>
            </a-row>
            <div class="content-main">
                <p class="main-subtitle offside-font">{{$t('Home.home_why_subtitle')}}</p>
                <p class="main-text">{{$t('Home.home_why_subtitle_desc_1')}}</p>
                <p class="main-text">{{$t('Home.home_why_subtitle_desc_2')}}</p>
            </div>
        </div>
        <div class="why-content-main">
            <div class="main-item" id="SIMPLE">
                <div class="main-detail">
                    <a-row type="flex" justify="space-between" row-flex="space-around" class="content-desc">
                        <a-col :span="8" class="detail-img">
                            <img :class="simpleIconShow ? 'fade-enter':''" src="/global/home-imgs/icons/icon1.png" alt="" class="item-icon">
                        </a-col>
                        <a-col :span="14" class="detail-text" :class="simpleShow?'slide-left-enter':''">
                            <div class="title-box">
                                <p class="title offside-font">{{$t('Home.home_why_item_1_title')}}</p>
                                <p class="subtitle offside-font">{{$t('Home.home_why_item_1_subtitle')}}</p>
                            </div>
                            <div class="detail-content">
                                <p class="description">{{$t('Home.home_why_item_1_main_title')}}</p>
                                <ul class="items">
                                    <li>{{$t('Home.home_why_item_1_main_item_1')}}</li>
                                    <li>{{$t('Home.home_why_item_1_main_item_2')}}</li>
                                    <li>{{$t('Home.home_why_item_1_main_item_3')}}</li>
                                    <li>{{$t('Home.home_why_item_1_main_item_4')}}</li>
                                    <li>{{$t('Home.home_why_item_1_main_item_5')}}</li>
                                    <li>{{$t('Home.home_why_item_1_main_item_6')}}</li>
                                </ul>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="main-item" id="SAVEMONEY">
                <div class="main-detail">
                    <a-row type="flex" justify="space-between" row-flex="space-around" class="content-desc">
                        <a-col :span="8" class="detail-img" >
                            <img :class="savemoneyIconShow ? 'fade-enter':''" src="/global/home-imgs/icons/icon2.png" alt="" class="item-icon">
                        </a-col>
                        <a-col :span="14" class="detail-text" :class="savemoneyShow?'slide-right-enter':''">
                            <div class="title-box">
                                <p class="title offside-font">{{$t('Home.home_why_item_2_title')}}</p>
                                <p class="subtitle offside-font">{{$t('Home.home_why_item_2_subtitle')}}</p>
                            </div>
                            <div class="detail-content">
                                <p class="description">{{$t('Home.home_why_item_2_main_title')}}</p>
                                <ul class="items">
                                    <li>{{$t('Home.home_why_item_2_main_item_1')}}</li>
                                    <li>{{$t('Home.home_why_item_2_main_item_2')}}</li>
                                    <li>{{$t('Home.home_why_item_2_main_item_3')}}</li>
                                    <li>{{$t('Home.home_why_item_2_main_item_4')}}</li>
                                    <li>{{$t('Home.home_why_item_2_main_item_5')}}</li>
                                </ul>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="main-item" id="SECURE">
                <div class="main-detail">
                    <a-row type="flex" justify="space-between" row-flex="space-around" class="content-desc">
                        <a-col :span="8" class="detail-img">
                            <img :class="secureIconShow ? 'fade-enter':''" src="/global/home-imgs/icons/icon3.png" alt="" class="item-icon">
                        </a-col>
                        <a-col :span="14" class="detail-text" :class="secureShow ? 'slide-left-enter':''">
                            <div class="title-box">
                                <p class="title offside-font">{{$t('Home.home_why_item_3_title')}}</p>
                                <p class="subtitle offside-font">{{$t('Home.home_why_item_3_subtitle')}}</p>
                            </div>
                            <div class="detail-content">
                                <p class="description">{{$t('Home.home_why_item_3_main_title')}}</p>
                                <ul class="items">
                                    <li>{{$t('Home.home_why_item_3_main_item_1')}}</li>
                                    <li>{{$t('Home.home_why_item_3_main_item_2')}}</li>
                                    <li>{{$t('Home.home_why_item_3_main_item_3')}}</li>
                                    <li>{{$t('Home.home_why_item_3_main_item_4')}}</li>
                                </ul>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="main-item" id="SPEEDY">
                <div class="main-detail">
                    <a-row type="flex" justify="space-between" row-flex="space-around" class="content-desc">
                        <a-col :span="8" class="detail-img">
                            <img :class="speedyIconShow ? 'fade-enter':''" src="/global/home-imgs/icons/icon4.png" alt="" class="item-icon">
                        </a-col>
                        <a-col :span="14" class="detail-text" :class="speedyShow ? 'slide-right-enter':''">
                            <div class="title-box">
                                <p class="title offside-font">{{$t('Home.home_why_item_4_title')}}</p>
                                <p class="subtitle offside-font">{{$t('Home.home_why_item_4_subtitle')}}</p>
                            </div>
                            <div class="detail-content">
                                <p class="description">{{$t('Home.home_why_item_4_main_title')}}</p>
                                <ul class="items">
                                    <li>{{$t('Home.home_why_item_4_main_item_1')}}</li>
                                    <li>{{$t('Home.home_why_item_4_main_item_2')}}</li>
                                    <li>{{$t('Home.home_why_item_4_main_item_3')}}</li>
                                </ul>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                simpleShow: false,
                simpleIconShow: false,
                savemoneyShow: false,
                savemoneyIconShow: false,
                secureShow: false,
                secureIconShow: false,
                speedyShow: false,
                speedyIconShow: false
            }
        },
        mounted () {
            this.handleScroll()
            window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
            /**
             * 页面滚动监听
             */
            handleScroll () {
                let scrollTop = window.pageYOffset
                let windowHeight = document.body.clientHeight
                let windowWidth = document.body.clientWidth
                let simpleTop = document.getElementById('SIMPLE').offsetTop
                let savemoneyTop = document.getElementById('SAVEMONEY').offsetTop
                let secureTop = document.getElementById('SECURE').offsetTop
                let speedyTop = document.getElementById('SPEEDY').offsetTop
                if (windowWidth >= 1200) {
                    if (scrollTop + windowHeight - 150 > simpleTop) {
                        this.simpleShow = true
                    }
                    if (scrollTop + windowHeight - 350 > simpleTop) {
                        this.simpleIconShow = true
                    }
                    if (scrollTop + windowHeight - 150 > savemoneyTop) {
                        this.savemoneyShow = true
                    }
                    if (scrollTop + windowHeight - 350 > savemoneyTop) {
                        this.savemoneyIconShow = true
                    }
                    if (scrollTop + windowHeight - 150 > secureTop) {
                        this.secureShow = true
                    }
                    if (scrollTop + windowHeight - 350 > secureTop) {
                        this.secureIconShow = true
                    }
                    if (scrollTop + windowHeight - 150 > speedyTop) {
                        this.speedyShow = true
                    }
                    if (scrollTop + windowHeight - 350 > speedyTop) {
                        this.speedyIconShow = true
                    }
                } else {
                    if (scrollTop + windowHeight - 200 > simpleTop) {
                        this.simpleShow = true
                    }
                    if (scrollTop + windowHeight - 80 > simpleTop) {
                        this.simpleIconShow = true
                    }
                    if (scrollTop + windowHeight - 200 > savemoneyTop) {
                        this.savemoneyShow = true
                    }
                    if (scrollTop + windowHeight - 80 > savemoneyTop) {
                        this.savemoneyIconShow = true
                    }
                    if (scrollTop + windowHeight - 200 > secureTop) {
                        this.secureShow = true
                    }
                    if (scrollTop + windowHeight - 80 > secureTop) {
                        this.secureIconShow = true
                    }
                    if (scrollTop + windowHeight - 200 > speedyTop) {
                        this.speedyShow = true
                    }
                    if (scrollTop + windowHeight - 80 > speedyTop) {
                        this.speedyIconShow = true
                    }
                }
            }
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/variable.less";

    .why-box {
        width: 100%;
        padding: 80px 0;
        .why-content {
            max-width: 800px;
            margin: 0 auto;
            .content-title {
                text-align: center;
                color: #007ac1;
                font-size: 40px;
                line-height: 52px;
            }
            .content-desc {
                width: 100%;
                margin-top: 40px;
                .desc-item {
                    text-align: center;
                    .item-icon {
                        vertical-align: sub;
                        width: 18px;
                    }
                    .item-text {
                        font-size: 20px;
                        line-height: 1.5;
                    }
                }
            }
            .content-main {
                margin: 20px;
                padding-bottom: 80px;
                .main-subtitle {
                    margin: 60px 0 20px;
                    text-align: center;
                    font-size: 18px;
                    line-height: 1.6;
                    color: rgb(58, 58, 58);
                }
                .main-text {
                    font-size: 14px;
                    line-height: 1.85;
                    color: rgb(78, 80, 82);
                    margin-bottom: 0;
                }
            }
        }
        .why-content-main {
            padding: 0;
            .main-item {
                background-color: rgb(247, 247, 247);
                &:nth-child(even) {
                    background-color: #ffffff;
                }
                &:nth-child(odd) {
                    .content-desc {
                        flex-direction: row-reverse;
                    }
                }
                .main-detail {
                    width: @max-width;
                    margin: 0 auto;
                    .detail-text {
                        width: 560px;
                        padding: 100px 0 50px;
                        opacity: 0;
                        .title-box {
                            position: relative;
                            padding: 0 0 20px;
                            .title {
                                color: #007ac1;
                                font-size: 80px;
                                line-height: 96px;
                                margin-bottom: 0;
                                text-transform: uppercase;
                            }
                            .subtitle {
                                color: #3a3a3a;
                                font-size: 25px;
                                line-height: 35px;
                                margin: 0 auto;
                                padding: 20px 0 10px;
                            }
                            &:after {
                                content: '';
                                display: inline-block;
                                width: 70%;
                                position: absolute;
                                bottom: -1px;
                                left: 0;
                                border-top: 1px solid #007ac1;
                            }
                        }
                        .detail-content {
                            margin-top: 20px;
                            font-size: 15px;
                            line-height: 1.85;
                            .description {
                                margin-bottom: 0;
                            }
                            .items {
                                padding-left: 18px;
                            }
                        }

                    }
                    .detail-img {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 560px;
                        .item-icon {
                            width: 200px;
                            opacity: 0;
                        }
                    }
                }
            }
        }
    }
    .fade-enter{
        animation: fade 2s ease-out forwards;
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
            transform: translateX(-100px);
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
            transform: translateX(100px);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @media screen and (max-width: @max-width) {
        .why-box {
            width: 100%;
            padding: .4rem 0;
            .why-content {
                max-width: 800px;
                margin: 0 auto;
                .content-title {
                    text-align: center;
                    color: #007ac1;
                    font-size: .2rem;
                    line-height: 1.4;
                }
                .content-desc {
                    width: 100%;
                    margin-top: 40px;
                    .desc-item {
                        width: 100%;
                        text-align: center;
                        margin-bottom: .4rem;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .item-icon {
                            vertical-align: sub;
                            width: 18px;
                        }
                        .item-text {
                            font-size: 20px;
                            line-height: 1.5;
                        }
                    }
                }
                .content-main {
                    margin: 20px;
                    padding-bottom: 80px;
                    .main-subtitle {
                        margin: .4rem 0 .2rem;
                        text-align: center;
                        font-size: 18px;
                        line-height: 1.6;
                        color: rgb(58, 58, 58);
                    }
                    .main-text {
                        font-size: 14px;
                        line-height: 1.85;
                        color: rgb(78, 80, 82);
                        margin-bottom: 0;
                    }
                }
            }
            .why-content-main {
                padding: 0;
                .main-item {
                    background-color: rgb(247, 247, 247);
                    &:nth-child(even) {
                        background-color: #ffffff;
                    }
                    &:nth-child(odd) {
                        .content-desc {
                            flex-direction: row;
                        }
                    }
                    .main-detail {
                        width: 100%;
                        margin: 0 auto;
                        .content-desc {
                            display: inline-block;
                            width: 100%;
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
                                    .subtitle {
                                        color: #3a3a3a;
                                        font-size: .2rem;
                                        line-height: .3rem;
                                        text-align: center;
                                        margin: 0 auto;
                                        padding: 20px 0 10px;
                                    }
                                    &:after {
                                        content: '';
                                        display: inline-block;
                                        width: 70%;
                                        position: absolute;
                                        bottom: -1px;
                                        left: 15%;
                                        border-top: 1px solid #007ac1;
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
    }
</style>
