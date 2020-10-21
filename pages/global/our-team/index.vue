<template>
    <a-layout id="components-layout-top" class="layout" :class="drawer" style="background-color: #fff;">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer"
                 @closeDrawer="closeDrawer" style="margin-bottom: 0;"/>
        <section class="container">
            <a-layout-content>
                <div class="banner-box">
                    <div class="banner-text">
                        <p class="banner-title offside-font">{{$t('OurTeam.OurTeam_title')}}</p>
                    </div>
                </div>
                <div class="our-team-box">
                    <div class="box-main">
                        <a-row type="flex" justify="space-between" row-flex="space-around" class="main-content">
                            <a-col :span="8" class="content-item-box">
                                <div class="content-item">
                                    <div class="item-title-box">
                                        <p class="item-title offside-font">{{$t('OurTeam.OurTeam_content_item_1_title')}}</p>
                                        <p class="item-subtitle">{{$t('OurTeam.OurTeam_content_item_1_subtitle')}}</p>
                                    </div>
                                    <ul class="item-desc">
                                        <li>{{$t('OurTeam.OurTeam_content_item_1_desc_1')}}</li>
                                        <li>{{$t('OurTeam.OurTeam_content_item_1_desc_2')}}</li>
                                        <li>{{$t('OurTeam.OurTeam_content_item_1_desc_3')}}</li>
                                        <li>{{$t('OurTeam.OurTeam_content_item_1_desc_4')}}</li>
                                    </ul>
                                </div>
                            </a-col>
                            <a-col :span="8" class="content-item-box">
                                <div class="content-item">
                                    <div class="item-title-box">
                                        <p class="item-title offside-font">{{$t('OurTeam.OurTeam_content_item_2_title')}}</p>
                                        <p class="item-subtitle">{{$t('OurTeam.OurTeam_content_item_2_subtitle')}}</p>
                                    </div>
                                    <ul class="item-desc">
                                        <li>{{$t('OurTeam.OurTeam_content_item_2_desc_1')}}</li>
                                        <li>{{$t('OurTeam.OurTeam_content_item_2_desc_2')}}</li>
                                        <li>{{$t('OurTeam.OurTeam_content_item_2_desc_3')}}</li>
                                        <li>{{$t('OurTeam.OurTeam_content_item_2_desc_4')}}</li>
                                    </ul>
                                </div>
                            </a-col>
                            <a-col :span="8" class="content-item-box">
                                <div class="content-item">
                                    <div class="item-title-box">
                                        <p class="item-title offside-font">{{$t('OurTeam.OurTeam_content_item_3_title')}}</p>
                                        <p class="item-subtitle">{{$t('OurTeam.OurTeam_content_item_3_subtitle')}}</p>
                                    </div>
                                    <ul class="item-desc">
                                        <li>{{$t('OurTeam.OurTeam_content_item_3_desc_1')}}</li>
                                        <li>{{$t('OurTeam.OurTeam_content_item_3_desc_2')}}</li>
                                        <li>{{$t('OurTeam.OurTeam_content_item_3_desc_3')}}</li>
                                    </ul>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
                <div class="project-list-box">
                    <project-list :showTitle="showTitle" :pagSize="pagSize" :showPagination="showPagination"></project-list>
                </div>
            </a-layout-content>
        </section>
        <fonter/>
    </a-layout>
</template>

<script>
    import ProjectList from '~/components/ProjectList'
    import FsHead from '~/components/FangseaHeader'
    import fonter from '~/components/Footer'

    export default {
        data () {
            return {
                key: 1,
                type: 0,
                centerKey: 0,
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false},
                // 骨架屏显示
                loading: true,
                // 正在进行列表数据
                listData: [],
                // 每页数量
                pagSize: 3,
                // 显示分页
                showPagination: false,
                // 显示标题文字
                showTitle: true
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
            fonter,
            ProjectList
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/variable.less";

    .banner-box {
        width: 100%;
        height: 300px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: url("/global/home-imgs/banner/banner-background.jpg");
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
    .our-team-box{
        width: 100%;
        padding: 130px 0;
        background-image: url("/global/how-to-buy/content-bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-attachment: scroll;
        background-color: rgba(255,255,255,0.8);
        background-blend-mode: color-burn;
        .box-main{
            width: @max-width;
            padding: 20px 20px 80px;
            background-color: #ffffff;
            box-shadow: 0 0 7px 0 rgba(168,168,168,0.5);
            margin: 0 auto;
            .content-text{
                width: 960px;
                margin: 50px auto 20px;
                text-align: left;
                .text-item{
                    margin-bottom: 0;
                    font-size: 15px;
                    line-height: 1.85;
                    padding-bottom: 10px;
                    &:first-child{
                        margin-bottom: 24px;
                    }
                }
            }
            .main-content{
                padding: 50px 30px;
                .content-item-box{
                    padding: 20px 10px;
                    .content-item{
                        background-color: #f9f9f9;
                        border: 1px solid #d6d6d6;
                        padding: 20px 10px 80px;
                        height: 100%;
                        .item-title-box{
                            position: relative;
                            padding-bottom: 50px;
                            &:after{
                                content: '';
                                display: block;
                                position: absolute;
                                width: 30%;
                                bottom: 25px;
                                left: 35%;
                                border: 1px solid #007ac1;
                            }
                            .item-title{
                                font-size: 25px;
                                line-height: 35px;
                                text-align: center;
                                margin-bottom: 0;
                            }
                            .item-subtitle{
                                font-size: 15px;
                                line-height: 1.85;
                                text-align: center;
                                margin-bottom: 0;
                            }
                        }
                        .item-desc{
                            font-size: 15px;
                            line-height: 1.85;
                        }
                    }
                }
            }
        }
    }
    .project-list-box {
        width: @max-width;
        margin: 40px auto 60px;
        .project-list-title{
            padding: 45px 5%;
            text-align: center;
            color: #007ac1;
            font-size: 25px;
            line-height: 25px;
        }
        .project-list {
            width: 100%;
            margin: 0 auto;
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
        .project-list-box {
            width: 100%;
            margin: 0.2rem auto 0.6rem;
            .project-list {
                width: 100%;
            }
        }
        .our-team-box{
            width: 100%;
            padding: 50px 0 80px;
            .box-main{
                width: 100%;
                padding: 20px 0 0;
                background-color: #ffffff;
                box-shadow: 0 0 7px 0 rgba(168,168,168,0.5);
                margin: 0 auto;
                .content-text{
                    width: 90%;
                    margin: 50px auto 20px;
                    text-align: left;
                    .text-item{
                        margin-bottom: 0;
                        font-size: .15rem;
                        line-height: 1.85;
                        padding-bottom: 10px;
                        &:first-child{
                            margin-bottom: 24px;
                        }
                    }
                }
                .main-content{
                    padding: 50px 0 0;
                    .content-item-box{
                        padding: 0;
                        width: 100%;
                        .content-item{
                            background-color: #f9f9f9;
                            border: 1px solid #d6d6d6;
                            padding: 20px 10px 80px;
                            height: 100%;
                            .item-title-box{
                                position: relative;
                                padding-bottom: 50px;
                                &:after{
                                    content: '';
                                    display: block;
                                    position: absolute;
                                    width: 30%;
                                    bottom: 25px;
                                    left: 35%;
                                    border: 1px solid #007ac1;
                                }
                                .item-title{
                                    font-size: 25px;
                                    line-height: 35px;
                                    text-align: center;
                                    margin-bottom: 0;
                                }
                                .item-subtitle{
                                    font-size: 15px;
                                    line-height: 1.85;
                                    text-align: center;
                                    margin-bottom: 0;
                                }
                            }
                            .item-desc{
                                font-size: 15px;
                                line-height: 1.85;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
