<template>
    <div>
        <div class="project-list-box-title" v-if="showTitle">
            <p class="project-list-title offside-font">{{$t('Home.home_project_list_title')}}</p>
        </div>
        <a-list
                class="project-list"
                :grid="{ gutter: 0, column: 3 }"
                :pagination="pagination"
                :dataSource="listData"
                :locale="{emptyText: ''}">
            <a-list-item slot="renderItem" slot-scope="item, index" key="item.title"
                         class="project-list-item">
                <div class="img" @click="seeDetails(item)">
                    <a-button :class="'tag-1 pt-tag-' + item.issueState">{{checkIssueState(item.issueState)}}</a-button>
                    <a-button class="tag-2" v-if="item.saleRatio === 100">{{$t('properties.properties_tag_soldout')}}</a-button>
                    <a-button class="tag-2" v-if="item.saleRatio !== 100">{{item.projectTypeName}}</a-button>
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="word">
                    <p :title="item.regionsName" class="address">{{item.regionsName}}</p>
                    <div class="project-content">
                        <div>
                            <h3 class="offside-font" :title="item.name" @click="seeDetails(item)">{{item.name}}</h3>
                        </div>
                        <p v-if="item.projectType !== 5"><span>{{$t('properties.properties_project_expectedearnings')}}</span><span>{{item.prospectiveYield}}</span></p>
                        <p><span>{{$t('properties.properties_project_minunit')}}</span><span>{{item.userMinAmount}}</span></p>
                        <p><span>{{$t('properties.properties_project_issuedquanity')}}</span><span>{{item.totalAmount}}</span></p>
                    </div>
                    <a-button @click="seeDetails(item)">Read More...</a-button>
                </div>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    import tool from '~/assets/utils/tool'
    import {Bus} from '~/assets/utils/bus'
    import axios from '~/plugins/axios'

    export default {
        name: 'ProjectList',
        // 当前id（排除） 显示标题文字, 每页数量, 是否显示分页
        props: ['projectId', 'showTitle', 'pagSize', 'showPagination'],
        data () {
            return {
                // 正在进行列表数据
                listData: [],
                // 当前页
                currentPage: 1,
                // 正在进行分页配置
                pagination: {
                    onChange: (currentPage) => {
                        this.currentPage = currentPage
                        this.initList(currentPage, 0)
                    },
                    hideOnSinglePage: false,
                    pageSize: this.pagSize,
                    current: 1,
                    total: 0
                }
            }
        },
        created () {
            if (process.client) {
                if (!this.showPagination) {
                    this.pagination = false
                }
                this.changelang()
                this.initList(1, 0)
            }
        },
        methods: {
            /**
             *  查询购买列表
             * @param currentPage  当前页
             * @param type 列表类型 0正在进行 1往期回顾
             */
            initList (currentPage, type) {
                let params = {
                    traceId: tool.UUID(),
                    data: {
                        pageNum: currentPage,
                        pageSize: this.pagSize,
                        filter: {
                            issueType: 0
                        }
                    }
                }
                // 如果需要去掉指定id数据，多获取一条取前面的
                if (this.projectId) {
                    params.data.pageSize++
                }
                axios.post('/pto/list/en', params).then((res) => {
                    if (res.data.code.toString() === '0') {
                        if (res.data.data.list) {
                            if (this.showPagination) {
                                this.pagination.total = res.data.data.total
                                this.pagination.current = currentPage
                                this.pagination.hideOnSinglePage = res.data.data.total === 0
                            }
                            let listData = []
                            // 去除指定id数据
                            if (this.projectId) {
                                let size = 0
                                for (let i in res.data.data.list) {
                                    if (res.data.data.list[i].projectId.toString() !== this.projectId.toString() && size < this.pagSize) {
                                        listData.push(res.data.data.list[i])
                                        size++
                                    }
                                }
                            } else {
                                listData = res.data.data.list
                            }
                            this.listData = listData.map((item) => {
                                return {...item, imgPath: '/' + item.imgPath, projectLabel: item.projectLabel ? item.projectLabel.split(',') : '', regionsName: item.regionsName.replace(/,/g, ', ')}
                            })
                        }
                    } else {
                        this.$message.error(this.$t(`code.${res.data.code.toString()}`))
                    }
                })
                    .catch(err => {
                        this.$message.error(this.$t(err.message))
                    })
            },
            changelang () {
                Bus.$on('checkLange', () => {
                    this.initList(this.currentPage, 0)
                })
            },
            /**
             * 查看详情
             * @param item 数据源
             */
            seeDetails (item) {
                this.$router.push(
                    {
                        name: 'global-properties-info-id',
                        params: {
                            id: item.projectId,
                            title: tool.intervariable(this.$t('PageTitle.passpurdetail_pagetitle'), [item.name]),
                            pageImg: item.imgPath
                        }
                    })
                // this.$router.push(`/global/properties/info/${item.projectId}`)
            },
            /**
             * 标签状态
             * @param val 项目状态
             * @return {0创建、1未发行、2等待预售、3开始预售、4预售完成、5预售失败、6已发行、7已取消}
             */
            checkIssueState (val) {
                switch (val) {
                case 0 :
                    return this.$t('CertificatePurchase.certificatePurchase_status_found')
                case 1 :
                    return this.$t('CertificatePurchase.certificatePurchase_status_unissued')
                case 2 :
                    return this.$t('CertificatePurchase.certificatePurchase_status_wait')
                case 3 :
                    return this.$t('CertificatePurchase.certificatePurchase_status_start')
                case 4 :
                    return this.$t('CertificatePurchase.certificatePurchase_status_completed')
                case 5 :
                    return this.$t('CertificatePurchase.certificatePurchase_status_failure')
                case 6 :
                    return this.$t('CertificatePurchase.certificatePurchase_status_issued')
                default:
                    return this.$t('CertificatePurchase.certificatePurchase_status_canceled')
                }
            }
        },
        beforeDestroy () {
            Bus.$off('checkLange')
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/styles/variable';

    .project-list-title{
        padding: 45px 5%;
        text-align: center;
        color: #007ac1;
        font-size: 25px;
    }
    .project-list {
        .project-list-item {
            width: calc((@max-width - 40px) / 3);
            border: 1px solid #e6e6e6;
            margin-right: 20px;
            margin-bottom: 20px;
            padding: 0!important;
            box-sizing: border-box;
            &:nth-child(3n) {
                margin-right: 0;
            }
            .img {
                width: 100%;
                position: relative;
                cursor: pointer;
                height: calc((@max-width - 40px) / 3 / 1.42);
                button {
                    position: absolute;
                    left: 0;
                    width: 120px;
                    height: 33px;
                    color: #fff;
                    border-radius: 0;
                    border: 0;
                    font-size: 12px;
                    line-height: 33px;
                    background: #d62839;
                    padding: 0;
                }
                .tag-1 {
                    top: 18px;
                }
                .tag-2 {
                    top: 56px;
                }
                .pt-tag-1 {
                    background: #175676!important;
                }
                .pt-tag-2 {
                    background: #F5A623!important;
                }
                .pt-tag-3 {
                    background: #05BA4B!important;
                }
                .pt-tag-4 {
                    background: #FE542B!important;
                }
                .pt-tag-5 {
                    background: #999999!important;
                }
                .pt-tag-6 {
                    background: #2EA9DF!important;
                }
                .pt-tag-7 {
                    background: #999999!important;
                }
                img {
                    width: 100%;
                    display: block;
                    height: calc((@max-width - 40px) / 3 / 1.42);
                    object-fit: scale-down;
                }
            }
            .word {
                .address {
                    width: 100%;
                    font-size: 16px;
                    font-weight: 700;
                    color: #fff;
                    text-align: center;
                    background: #4E5052;
                    line-height: 49px;
                    margin: 0;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    padding: 0 20px;
                }
                .project-content {
                    padding: 20px 20px 24px;
                    background: #175676;
                    min-height: 218px;
                    div {
                        height: 70px;
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;
                        border-bottom: 1px solid #ccc;
                        h3 {
                            width: 100%;
                            font-size: 24px;
                            font-weight: 400;
                            color: #fff;
                            line-height: 30px;
                            text-align: center;
                            cursor: pointer;
                            overflow: hidden;
                            display: -webkit-box;
                            /*! autoprefixer: ignore next */
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            //word-wrap:break-word;
                        }
                    }
                    p {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 0;
                        span {
                            display: block;
                            width: 190px;
                            font-size: 14px;
                            line-height: 28px;
                            color: #fff;
                            &:last-child {
                                width: auto;
                            }
                        }
                    }
                }
                button {
                    width: 100%;
                    color: #fff;
                    background: #4E5052;
                    border: 0;
                    line-height: 49px;
                    font-size: 16px;
                    height: 49px;
                    border-radius: 0;
                    cursor: pointer;
                }
            }
            /deep/.ant-list-item {
                margin-bottom: 0;
            }
        }
        /deep/.ant-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    @media screen and (max-width: @max-width) {
        .project-list {
            padding: 0 0.2rem;
            .project-list-item {
                width: 100%;
                margin-right: 0;
                margin-bottom: 0.2rem;
                .img {
                    cursor: pointer;
                }
                .word {
                    .address {
                        line-height: 0.49rem;
                        padding: 0 0.2rem;
                    }
                    .project-content {
                        padding: 0.2rem 0.2rem 0.24rem;
                        h3 {
                            font-size: 20px;
                            line-height: 0.3rem;
                            margin-bottom: 0.2rem;
                            cursor: pointer;
                            overflow: hidden;
                            display: -webkit-box;
                            /*! autoprefixer: ignore next */
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            //word-wrap:break-word;
                        }
                        p {
                            span {
                                max-width: 75%;
                                line-height: 0.28rem;
                            }
                        }
                    }
                    button {
                        line-height: 0.49rem;
                        height: 0.49rem;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
