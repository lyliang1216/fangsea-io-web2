<template>
    <div>
        <div class="banner-box">
            <div class="banner-text">
                <p class="banner-title offside-font">{{$t('EarnReturns.EarnReturns_title')}}</p>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style lang="less" scoped>
    @import "../../../../assets/styles/variable.less";

    .banner-box {
        width: 100%;
        height: 800px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: url("/global/earn-returns-on-your-cryptocurrency/Cryptocurrency-Image.jpg");
        display: flex;
        justify-content: center;
        align-items: center;
        .banner-text {
            width: 100%;
            color: #ffffff;
            flex: 1 1 auto;
            text-align: center;
            .banner-title {
                font-size: 90px;
                line-height: 108px;
                display: inline-block;
                width: 760px;
                font-weight: 700;
                padding-bottom: 25px;
                margin-bottom: 0;
            }
        }
    }
    @media screen and (max-width: @max-width) {
        .banner-box {
            height: 2rem;
            .banner-text {
                width: 60%;
                color: #ffffff;
                flex: 0 0 auto;
                text-align: center;
                .banner-title {
                    width: auto;
                    font-size: .3rem;
                    line-height: .34rem;
                    padding-bottom: .14rem;
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
