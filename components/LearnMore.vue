<template>
    <div class="learn-more">
        <div class="left-word">
            <h3 class="offside-font">REFERRAL REWARDS</h3>
            <p>Grand Kata VIP Phase II Project.</p>
            <p>Cash Reward Up To 5%</p>
        </div>
        <div class="right-btn">
            <a-button @click="toMore">{{$t('properties.properties_btn_learnmore')}}</a-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LearnMore',
        methods: {
            toMore () {
                window.location.href = 'https://support.ptohome.com/hc/en-us/articles/360034196392-Grand-Kata-VIP-Phase-II-Referral-Award-Deadline-30-November-2019-'
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/styles/variable';

    .learn-more {
        width: 100%;
        height: 185px;
        background: url('/global/project-list/learn_more.jpg');
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: scroll;
        display: flex;
        justify-content: center;
        align-items: center;
        .left-word {
            width: 50%;
            text-align: right;
            margin-right: 20px;
            h3 {
                font-size: 24px;
                line-height: 31px;
                margin-bottom: 10px;
                font-weight: 400;
                color: #fff;
            }
            p {
                font-size: 15px;
                color: #fff;
                line-height: 27px;
                margin: 0;
            }
        }
        .right-btn {
            width: 50%;
            margin-left: 20px;
            button {
                width: 168px;
                font-size: 16px;
                line-height: 40px;
                height: 40px;
                color: #fff;
                background: #d62839;
                border: 0;
                border-radius: 2px;
                span {
                    line-height: 40px;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .learn-more {
            display: block;
            position: relative;
            height: 2.58rem;
            .left-word {
                width: 3.6rem;
                margin: 0 auto 0.4rem;
                padding-top: 0.4rem;
                h3 {
                    font-size: 22px;
                    line-height: 0.28rem;
                    margin-bottom: 0.1rem;
                    text-align: center;
                }
                p {
                    font-size: 13px;
                    line-height: 0.25rem;
                    text-align: center;
                }
            }
            .right-btn {
                width: 3.6rem;
                margin: 0 auto;
                text-align: center;
                button {
                    width: 1.68rem;
                    line-height: 0.4rem;
                    height: 0.4rem;
                    span {
                        line-height: 0.4rem;
                    }
                }
            }
        }
    }
</style>