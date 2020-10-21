<template>
    <div class="breadcrumb">
        <a-breadcrumb :routes="routes">
            <template slot="itemRender" slot-scope="{route, params, routes, paths}">
                <span v-if="routes.indexOf(route) === routes.length - 1">
                    {{route.breadcrumbName}}
                </span>
                <nuxt-link v-else :to="route.path">
                    {{route.breadcrumbName}}
                </nuxt-link>
            </template>
        </a-breadcrumb>
    </div>
</template>
<script>
    export default {
        props: ['routes'],
        data () {
            return {
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/styles/variable';

    .breadcrumb {
        margin: 60px 0;

        /deep/ .ant-breadcrumb-separator {
            margin: 0 2px;
        }

        /deep/ .ant-breadcrumb-link {
            color: #777;

            a {
                color: #777;
            }
        }
    }

    @media screen and (max-width: @max-width) {
        .breadcrumb {
            margin: 30px;
        }
    }
</style>
