<template>
    <a-layout id="components-layout-top" class="layout" :class="drawer">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer" @closeDrawer="closeDrawer" style="margin-bottom: 0;"/>
        <section class="container">
            <a-layout-content>
                <banner/>
                <page-desc/>
                <page-separate/>
                <platform-features />
                <what-proptech />
                <why-ptohome />
                <happy-owners />
                <learn-more></learn-more>
                <div class="project-list-box">
                    <project-list :showTitle="showTitle" :pagSize="pagSize" :showPagination="showPagination"></project-list>
                </div>
            </a-layout-content>
        </section>
        <fonter/>
    </a-layout>
</template>

<script>
    import PlatformFeatures from '~/pages/global/home-components/PlatformFeatures'
    import WhatProptech from '~/pages/global/home-components/WhatProptech'
    import HappyOwners from '~/pages/global/home-components/HappyOwners'
    import WhyPtohome from '~/pages/global/home-components/WhyPtohome'
    import PageSeparate from './components/PageSeparate'
    import PageDesc from './components/PageDescription'
    import ProjectList from '~/components/ProjectList'
    import FsHead from '~/components/FangseaHeader'
    import LearnMore from '~/components/LearnMore'
    import banner from './components/EarnBanner'
    import fonter from '~/components/Footer'
    import {Bus} from '~/assets/utils/bus'

    export default {
        data () {
            return {
                key: '',
                type: 0,
                centerKey: 0,
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false},
                // 显示标题文字
                showTitle: true,
                // 每页数量
                pagSize: 3,
                // 显示标题文字
                showPagination: false
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
        beforeDestroy () {
            Bus.$off('checkLange')
        },
        components: {
            FsHead,
            fonter,
            banner,
            PageDesc,
            PageSeparate,
            PlatformFeatures,
            WhatProptech,
            WhyPtohome,
            HappyOwners,
            LearnMore,
            ProjectList
        },
        head () {
            return {
                title: this.$t('PageTitle.house_index_pagetitle')
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/styles/variable';

    #components-layout-top {
        background: #ffffff;
    }

    .project-list-box {
        width: @max-width;
        margin: 40px auto 60px;
        .project-list {
            width: 100%;
            margin: 0 auto;
        }
    }
    /deep/ .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    /deep/ .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }


    @media screen and (max-width: @max-width) {
        .project-list-box {
            width: 100%;
            margin: 0.2rem auto 0.6rem;
            .project-list {
                width: 100%;
            }
        }
    }
</style>
