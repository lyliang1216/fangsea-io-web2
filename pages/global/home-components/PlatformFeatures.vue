<template>
    <div class="platform-features">
        <div class="features-content">
            <div class="content-box">
                <p class="content-title offside-font">{{$t('Home.home_features_title')}}</p>
                <div class="content-desc">
                    <p class="desc-item">{{$t('Home.home_features_desc_1')}}</p>
                    <p class="desc-item">{{$t('Home.home_features_desc_2')}}</p>
                    <p class="desc-item">{{$t('Home.home_features_desc_3')}}</p>
                    <p class="desc-item">{{$t('Home.home_features_desc_4')}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/variable.less";

    .platform-features {
        width: @max-width;
        padding: 130px 0 170px;
        background-color: #fff;
        margin: 0 auto;
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
                margin: 20px 70px 20px 20px;
                .content-title {
                    color: #007ac1;
                    font-size: 40px;
                    line-height: 48px;
                    text-align: center;
                    position: relative;
                    margin-bottom: 0;
                    &:after {
                        content: '';
                        display: block;
                        width: 70%;
                        border-top: 1px solid #007ac1;
                        margin: 20px auto;
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
    @media screen and (max-width: @max-width) {
        .platform-features {
            width: 100%;
            padding: 0;
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
                    .content-title {
                        width: 88%;
                        color: #007ac1;
                        font-size: 0.24rem;
                        line-height: 0.3rem;
                        text-align: center;
                        position: relative;
                        margin: 0 auto;
                        &:after {
                            content: '';
                            display: block;
                            width: 70%;
                            border-top: 1px solid #007ac1;
                            margin: 20px auto;
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
    }
</style>
