<template>
    <a-layout id="components-layout-top" class="layout" :class="drawer">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer" @closeDrawer="closeDrawer" style="margin-bottom: 0;"/>
        <section class="container">
            <a-layout-content>
                <div class="properties-content">
                    <div class="properties-name offside-font">
                        Properties
                    </div>
                </div>
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
    import ProjectList from '~/components/ProjectList'
    import FsHead from '~/components/FangseaHeader'
    import LearnMore from '~/components/LearnMore'
    import fonter from '~/components/Footer'

    export default {
        data () {
            return {
                key: '2',
                type: 0,
                centerKey: 0,
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false},
                // 显示分页
                showPagination: true,
                // 每页数量
                pagSize: 9,
                // 显示标题文字
                showTitle: false
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

    .container {
        background: #fff;
    }
    .properties-content {
        width: @max-width;
        margin: 0 auto 40px;
        .properties-name {
            font-size: 40px;
            color: #3a3a3a;
            text-align: center;
            line-height: 288px;
            border-bottom: 1px solid #f4f4f4;
        }
    }
    .project-list-box {
        width: @max-width;
        margin: 40px auto 60px;
        .project-list {
            width: 1200px;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: @max-width) {
        .properties-content {
            width: 100%;
            margin: 0 auto 0.4rem;
            .properties-name {
                font-size: 30px;
                line-height: 1.16rem;
            }
        }
        .project-list-box {
            width: 100%;
            margin: 0.2rem auto 0.6rem;
            .project-list {
                width: 100%;
            }
        }
    }
</style>

