<template>
    <div style="background-color: #f7f7f7;">
        <div class="top-arrow">
            <svg class="uasvg-big-triangle" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" opacity="1" width="100"
                 height="60" viewBox="0 0 100 102" preserveAspectRatio="none">
                <path d="M0 0 L50 100 L100 0 Z"></path>
            </svg>
        </div>
        <div class="owners-content">
            <p class="title offside-font">{{$t('Home.home_owners_title')}}</p>
            <a-carousel class="carousel-box">
                <div class="carousel-item">
                    <div class="head-img" style="background-image: url('/global/home-imgs/happy-owner1.png')"></div>
                    <p class="owners-name offside-font">John D.</p>
                    <p class="owners-desc">If you are looking for a great place to invest your cryptocurrency, this is the place! I highly recommend it!</p>
                </div>
                <div class="carousel-item">
                    <div class="head-img" style="background-image: url('/global/home-imgs/happy-owner2.png')"></div>
                    <p class="owners-name offside-font">Adrea Q.</p>
                    <p class="owners-desc">Since I bought properties with PTOHome, I've seen my investments increase in value!</p>
                </div>
                <div class="carousel-item">
                    <div class="head-img" style="background-image: url('/global/home-imgs/happy-owner3.png')"></div>
                    <p class="owners-name offside-font">Manuel M.</p>
                    <p class="owners-desc">Thank you PTOHome for making property investments painless, pleasant and most of all hassle free! I love PTOHome!</p>
                </div>
            </a-carousel>
        </div>
    </div>
</template>

<script>
</script>

<style lang="less" scoped>
    @import "../../../assets/styles/variable.less";

    .top-arrow{
        background-color: #f7f7f7;
        svg{
            width: 100%;
        }
    }
    .owners-content{
        padding: 120px 0 80px;
        .title{
            color: #007ac1;
            font-size: 25px;
            line-height: 35px;
            text-align: center;
        }
        .carousel-box{
            width: 760px;
            margin: 0 auto;
            padding: 20px 0 50px;
            .carousel-item{
                width: 760px;
                text-align: center;
                margin: 0 auto;
                padding-bottom: 20px;
                .head-img{
                    width: 75px;
                    height: 75px;
                    margin: 0 auto 20px;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                    /*background-image: url('http://test67.zeitguysmedia.com/wp-content/uploads/bb-plugin/cache/Testimonial-3-square.jpg');*/
                }
                .owners-name{
                    font-size: 25px;
                    line-height: 35px;
                    color: #3a3a3a;
                    margin-bottom: 30px;
                }
                .owners-desc{
                    font-size: 15px;
                    line-height: 1.85;
                    margin-bottom: 0;
                }
            }
        }
    }
    @media screen and (max-width: @max-width) {
        .top-arrow{
            background-color: #f7f7f7;
            position: relative;
            svg{
                position: absolute;
                width: 180%;
                left: -40%;
            }
        }
        .owners-content{
            padding: .8rem 0;
            .title{
                color: #007ac1;
                font-size: 25px;
                line-height: 35px;
                text-align: center;
            }
            .carousel-box{
                width: 100%;
                margin: 0 auto;
                padding: .2rem 0 .3rem;
                .carousel-item{
                    width: 760px;
                    text-align: center;
                    margin: 0 auto;
                    padding-bottom: 20px;
                    .head-img{
                        width: 75px;
                        height: 75px;
                        margin: 0 auto 20px;
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center center;
                        background-image: url('http://test67.zeitguysmedia.com/wp-content/uploads/bb-plugin/cache/Testimonial-3-square.jpg');
                    }
                    .owners-name{
                        font-size: 25px;
                        line-height: 35px;
                        color: #3a3a3a;
                        margin-bottom: 30px;
                    }
                    .owners-desc{
                        font-size: 15px;
                        line-height: 1.85;
                        margin-bottom: 0;
                    }
                }
            }
        }
    }

    /deep/ .slick-dots {
        bottom: 10px;
        height: 5px;
        li {
            button {
                width: 10px;
                height: 10px;
                border-radius: 8px;
                background: #0274be;
                opacity: .2!important;
                margin: 0 5px;
            }
            &.slick-active {
                button {
                    width: 10px;
                    height: 10px;
                    background: #0274be;
                    opacity: 1!important;
                }
            }
        }
    }
</style>
