<template>
    <div class="page-separate">
        <div class="title-box">
            <p class="separate-title offside-font">{{$t('EarnReturns.EarnReturns_separate_title')}}</p>
            <p class="separate-subtitle">{{$t('EarnReturns.EarnReturns_separate_subtitle')}}</p>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less" scoped>
    @import "../../../../assets/styles/variable.less";

    .page-separate {
        width: 100%;
        height: 350px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-image: url("/global/home-imgs/banner/banner-background.jpg");
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &:after{
            content: '';
            position: absolute;
            background-color: rgba(255,255,255,.15);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .title-box{
            text-align: center;
            z-index: 2;
            .separate-title{
                position: relative;
                width: 100%;
                color: #ffffff;
                font-size: 100px;
                line-height: 120px;
                font-weight: 700;
                margin-bottom: 0;
                padding-bottom: 8px;
                &:after{
                    content: '';
                    display: inline-block;
                    width: 56%;
                    height: 1px;
                    background-color: #fff;
                    position: absolute;
                    bottom: 0;
                    left: 22%;
                }
            }
            .separate-subtitle{
                width: 100%;
                color: #f22e2e;
                font-size: 30px;
                line-height: 1.85;
                margin-bottom: 0;
                margin-top: 15px;
            }
        }
    }
    @media screen and (max-width: @max-width) {
        .page-separate {
            width: 100%;
            height: 250px;
            .title-box{
                text-align: center;
                z-index: 2;
                .separate-title{
                    position: relative;
                    width: 100%;
                    color: #ffffff;
                    font-size: .6rem;
                    line-height: .7rem;
                    font-weight: 700;
                    margin-bottom: 0;
                    padding-bottom: 8px;
                    &:after{
                        content: '';
                        display: inline-block;
                        width: 56%;
                        height: 1px;
                        background-color: #fff;
                        position: absolute;
                        bottom: 0;
                        left: 22%;
                    }
                }
                .separate-subtitle{
                    width: 100%;
                    color: #f22e2e;
                    font-size: .18rem;
                    line-height: 1.85;
                    margin-bottom: 0;
                    margin-top: 15px;
                }
            }
        }
    }
</style>
