<template>
    <div>
        <!--<a-carousel autoplay>
            <section v-for="item in bannerUrls">
                <a v-if="item.jumpUrl !== ''" :href="item.jumpUrl" target="_blank">
                    <div class="bannerBox" :style="{backgroundImage: 'url(' + item.imgUrl + ')'}"></div>
                </a>
                <a v-else>
                    <div class="bannerBox" :style="{backgroundImage: 'url(' + item.imgUrl + ')'}"></div>
                </a>
            </section>
        </a-carousel>-->
        <div class="banner-box">
            <div class="banner-text">
                <p class="banner-title offside-font">{{$t('Home.home_banner_title')}}</p>
                <p class="banner-content">{{$t('Home.home_banner_subtitle')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/variable.less";

    .banner-box {
        width: 100%;
        height: 750px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: url("/global/home-imgs/banner/banner-background.jpg");
        display: flex;
        justify-content: center;
        align-items: center;
        .banner-text {
            width: 100%;
            color: #ffffff;
            flex: 1 1 auto;
            text-align: center;
            .banner-title {
                font-size: 100px;
                line-height: 100px;
                font-weight: 700;
                padding-bottom: 25px;
                margin-bottom: 0;
                position: relative;
                &:after{
                    content: '';
                    width: 318px;
                    height: 2px;
                    display: block;
                    position: absolute;
                    background-color: #fff;
                    left: 50%;
                    bottom: -2px;
                    margin-left: -159px;
                }
            }
            .banner-content{
                margin-top: 15px;
                font-size: 30px;
                margin-bottom: 0;
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
                    &:after{
                        content: '';
                        width: 30%;
                        height: 1px;
                        left: 35%;
                        margin-left: 0;
                    }
                }
                .banner-content{
                    margin-top: .14rem;
                    font-size: 14px;
                    margin-bottom: 0;
                }
            }
        }
    }

    /deep/ .slick-dots {
        bottom: 16px;
        height: 5px;
        li {
            button {
                width: 35px;
                height: 5px;
                border-radius: 8px;
            }
            &.slick-active {
                button {
                    width: 40px;
                }
            }
        }
    }
</style>
