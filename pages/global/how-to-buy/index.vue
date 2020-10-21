<template>
    <a-layout id="components-layout-top" class="layout" :class="drawer">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer"
                 @closeDrawer="closeDrawer" style="margin-bottom: 0;"/>
        <section class="container">
            <a-layout-content>
                <div class="banner-box">
                    <div class="banner-text">
                        <p class="banner-title offside-font">{{$t('HowToBuy.HowToBuy_title')}}</p>
                    </div>
                </div>
                <div class="how-to-buy-box">
                    <div class="box-main">
                        <p class="main-title offside-font">{{$t('HowToBuy.HowToBuy_content_title')}}</p>
                        <a-row type="flex" justify="space-between" row-flex="space-around" class="main-content">
                            <a-col :span="8" class="content-item">
                                <span class="item-text">{{$t('HowToBuy.HowToBuy_content_item_1_text')}}</span>
                                <img src="/global/how-to-buy/content-icon1.png" alt="" class="item-icon">
                            </a-col>
                            <a-col :span="8" class="content-item">
                                <span class="item-text" v-html="$t('HowToBuy.HowToBuy_content_item_2_text')"></span>
                                <img src="/global/how-to-buy/content-icon2.png" alt="" class="item-icon">
                            </a-col>
                            <a-col :span="8" class="content-item">
                                <span class="item-text">{{$t('HowToBuy.HowToBuy_content_item_3_text')}}</span>
                                <img src="/global/how-to-buy/content-icon3.png" alt="" class="item-icon">
                            </a-col>
                        </a-row>
                        <nuxt-link to="/global/properties" class="main-btn">{{$t('HowToBuy.HowToBuy_content_btn_text')}}</nuxt-link>
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
                key: '1',
                type: 0,
                centerKey: 0,
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false}
            }
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
            }
        },
        components: {
            FsHead,
            fonter
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
    .how-to-buy-box{
        width: 100%;
        padding: 130px 0;
        background-image: url("/global/how-to-buy/content-bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-attachment: scroll;
        min-height: 800px;
        background-color: rgba(255,255,255,0.8);
        background-blend-mode: color-burn;
        .box-main{
            width: @max-width;
            padding-bottom: 80px;
            background-color: #ffffff;
            box-shadow: 0 0 7px 0 rgba(168,168,168,0.5);
            margin: 0 auto;
            text-align: center;
            .main-title{
                color: #007ac1;
                font-size: 40px;
                line-height: 1.2;
                padding: 20px;
                text-align: center;
                margin-bottom: 0;
            }
            .main-content{
                counter-reset:sectioncounter;
                .content-item{
                    padding: 50px 50px 250px 60px;
                    display: inline-block;
                    max-width: 100%;
                    position: relative;
                    text-align: left;
                    &:before{
                        content: counter(sectioncounter) ".";
                        counter-increment:sectioncounter;
                        position: absolute;
                        left: 40px;
                        top: 52px;
                    }
                    .item-text{
                        font-size: 15px;
                        line-height: 1.85;
                        /deep/a{
                            color: #007ac1;
                        }
                    }
                    .item-icon{
                        position: absolute;
                        bottom: 20px;
                        left: 50%;
                        margin-left: -75px;
                    }
                }
            }
            .main-btn{
                width: 400px;
                height: 58px;
                font-size: 16px;
                line-height: 58px;
                color: #ffffff;
                background-color: rgb(46, 169, 223);
                display: inline-block;
                margin-top: 20px;
                &:focus{
                    text-decoration: none;
                }
            }
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
        .how-to-buy-box{
            width: 100%;
            padding: 60px 0;
            background-size: 500%;
            background-position: bottom;
            .box-main{
                width: 100%;
                padding-bottom: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 7px 0 rgba(168,168,168,0.5);
                margin: 0 auto;
                text-align: center;
                .main-title{
                    color: #007ac1;
                    font-size: 26px;
                    line-height: 1.2;
                    padding: 20px;
                    text-align: center;
                    margin-bottom: 0;
                }
                .main-content{
                    counter-reset:sectioncounter;
                    .content-item{
                        padding: 230px 50px 50px 60px;
                        width: 100%;
                        &:before{
                            content: counter(sectioncounter) ".";
                            counter-increment:sectioncounter;
                            position: absolute;
                            left: 40px;
                            top: 232px;
                        }
                        .item-text{
                            font-size: 15px;
                            line-height: 1.85;
                        }
                        .item-icon{
                            position: absolute;
                            top: 50px;
                            left: 50%;
                            margin-left: -75px;
                        }
                    }
                }
                .main-btn{
                    width: 95%;
                    height: 58px;
                    font-size: 16px;
                    line-height: 58px;
                    color: #ffffff;
                    background-color: rgb(46, 169, 223);
                    display: inline-block;
                    margin: 20px auto 0;
                    &:focus{
                        text-decoration: none;
                    }
                }
            }
        }
    }
</style>
