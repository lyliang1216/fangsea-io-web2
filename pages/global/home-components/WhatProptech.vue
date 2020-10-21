<template>
    <div class="what-proptech">
        <div class="proptech-content">
            <div class="content-img"></div>
            <div class="content-main">
                <p class="main-title offside-font">{{$t('Home.home_proptech_title')}}</p>
                <nuxt-link to="/global/proptech" class="main-btn">{{$t('Home.home_proptech_btn')}}</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/variable.less";

    .what-proptech {
        width: @max-width;
        padding: 20px 0;
        margin: 0 auto;
        .proptech-content{
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content-img{
                width: 440px;
                height: 290px;
                background-image: url('/global/home-imgs/proptech.jpg');
                background-repeat: no-repeat;
                background-position: center center;
                background-attachment: scroll;
                background-size: cover;
            }
            .content-main{
                width: calc(~'100% - 440px');
                text-align: center;
                .main-title{
                    font-size: 25px;
                    line-height: 1.4;
                    color: #3a3a3a;
                    margin-bottom: 10px;
                }
                .main-btn{
                    width: 250px;
                    height: 45px;
                    font-size: 16px;
                    line-height: 45px;
                    color: #ffffff;
                    background-color: #007ac1;
                    display: inline-block;
                    &:focus{
                        text-decoration: none;
                    }
                }
            }
        }
    }
    @media screen and (max-width: @max-width) {
        .what-proptech {
            width: 100%;
            padding: .2rem 0;
            .proptech-content{
                width: 100%;
                margin: 0 auto;
                display: inline-block;
                .content-img{
                    width: 3.5rem;
                    height: 2.3rem;
                    margin: 0 auto .3rem;
                }
                .content-main{
                    width: 90%;
                    text-align: center;
                    margin: 0 auto;
                    .main-title{
                        font-size: .2rem;
                        line-height: 1.2;
                        color: #3a3a3a;
                        margin-bottom: .15rem;
                    }
                }
            }
        }
    }
</style>
