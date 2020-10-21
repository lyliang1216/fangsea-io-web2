<template>
    <div class="files-content">
        <!--    单个文件没有点击效果    -->
        <div class="mg-bm-20 file-item" v-show="single && !singleDowned">
            <span class="file-name">{{$t(name)}}</span>
            <a href="javascript:;" @click="downFile(files[0].fileUrl, files[0].name)" class="download-file">
                <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>icon_download_normal.png</title>
                    <desc>Created with Sketch.</desc>
                    <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="购房通证详情页-文件下载" transform="translate(-1670.000000, -11446.000000)" stroke="#333333">
                            <g id="状态" transform="translate(1303.000000, 10833.000000)">
                                <g id="icon_download_normal.png" transform="translate(367.000000, 613.000000)">
                                    <g id="下载">
                                        <rect id="矩形" x="0.5" y="0.5" width="27" height="27" rx="13.5"></rect>
                                        <g id="编组-7" transform="translate(11.000000, 8.000000)">
                                            <path d="M0,12 L7,12" id="路径-5"></path>
                                            <polyline id="路径-3" points="0 6.62233005 3.38527834 9.99121551 6.92822636 6.62233005"></polyline>
                                            <path d="M3.38527834,9.99121551 L3.46411318,0.5" id="路径-4"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </a>
        </div>
        <!--    单个文件点击后效果    -->
        <div class="mg-bm-20 file-item-click" v-show="singleDowned">
            <span class="file-name-click">{{$t(name)}}</span>
            <a href="javascript:;" @click="downFile(files[0].fileUrl, files[0].name)"
               class="download-file">
                <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>icon_download_accomplish.png</title>
                    <desc>Created with Sketch.</desc>
                    <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="购房通证详情页-文件下载" transform="translate(-1670.000000, -11489.000000)">
                            <g id="状态" transform="translate(1303.000000, 10833.000000)">
                                <g id="icon_download_accomplish.png" transform="translate(367.000000, 656.000000)">
                                    <g id="下载">
                                        <rect id="矩形" stroke="#2EA9DF" fill="#2EA9DF" x="0.5" y="0.5" width="27" height="27" rx="13.5"></rect>
                                        <g id="编组-7" transform="translate(11.000000, 8.000000)" stroke="#FFFFFF">
                                            <path d="M0,12 L7,12" id="路径-5"></path>
                                            <polyline id="路径-3" points="0 6.62233005 3.38527834 9.99121551 6.92822636 6.62233005"></polyline>
                                            <path d="M3.38527834,9.99121551 L3.46411318,0.5" id="路径-4"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </a>
        </div>
        <!--    多个文件正常    -->
        <div class="mg-bm-20 file-item file-item-many" v-show="!single" @mouseenter="mouseover">
            <span class="file-name">{{$t(name)}}</span>
            <a href="javascript:;">
                <svg width="13px" height="8px" viewBox="0 0 13 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>icon_down.png</title>
                    <desc>Created with Sketch.</desc>
                    <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="购房通证详情页-文件下载" transform="translate(-1678.000000, -11288.000000)" stroke="#333333">
                            <g id="状态" transform="translate(1303.000000, 10833.000000)">
                                <g id="icon_down.png" transform="translate(375.000000, 455.000000)">
                                    <g id="下载" transform="translate(1.000000, 1.000000)">
                                        <polyline id="路径-3" points="0 -5.30054094e-17 5.21195956 5.6 10.6666667 -2.82727748e-28"></polyline>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </a>
        </div>
        <!--    多个文件展开    -->
        <div class="mg-bm-20 file-info" v-show="!single && many" @mouseleave="mouseout">
            <div class="file-info-title">
                <span class="file-name">{{$t(name)}}</span>
                <a href="javascript:;" class="file-info-title-a" @click="mouseout">
                    <svg width="13px" height="8px" viewBox="0 0 13 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title>icon_up.png</title>
                        <desc>Created with Sketch.</desc>
                        <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="购房通证详情页-文件下载" transform="translate(-1678.000000, -11403.000000)" stroke="#FFFFFF">
                                <g id="状态" transform="translate(1303.000000, 10833.000000)">
                                    <g id="icon_up.png" transform="translate(375.000000, 570.000000)">
                                        <g id="下载" transform="translate(6.500000, 4.000000) scale(1, -1) translate(-6.500000, -4.000000) translate(1.000000, 1.000000)">
                                            <polyline id="路径-3" points="0 -5.30054094e-17 5.21195956 5.6 10.6666667 -2.82727748e-28"></polyline>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </a>
            </div>
            <div class="file-info-body">
                <template v-for="item, index in files">
                    <!--    单个文件没有点击效果    -->
                    <div class="mg-bm-20 many-file-item" v-if="!manyStatus[index]" :key="item.fileUrl">
                        <div class="many-file-item-left">
                            <div class="file-index"></div>
                            <span class="file-name">Document {{index + 1 | formatNumber}}</span>
                        </div>
                        <a href="javascript:;" @click="manyDownFile(item.fileUrl, item.name, index + 1)" class="download-file">
                            <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <!-- Generator: Sketch 54.1 (76490) - https://sketchapp.com -->
                                <title>icon_download_normal.png</title>
                                <desc>Created with Sketch.</desc>
                                <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="购房通证详情页-文件下载" transform="translate(-1670.000000, -11446.000000)" stroke="#333333">
                                        <g id="状态" transform="translate(1303.000000, 10833.000000)">
                                            <g id="icon_download_normal.png" transform="translate(367.000000, 613.000000)">
                                                <g id="下载">
                                                    <rect id="矩形" x="0.5" y="0.5" width="27" height="27" rx="13.5"></rect>
                                                    <g id="编组-7" transform="translate(11.000000, 8.000000)">
                                                        <path d="M0,12 L7,12" id="路径-5"></path>
                                                        <polyline id="路径-3" points="0 6.62233005 3.38527834 9.99121551 6.92822636 6.62233005"></polyline>
                                                        <path d="M3.38527834,9.99121551 L3.46411318,0.5" id="路径-4"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <!--    单个文件点击后效果    -->
                    <div class="mg-bm-20 many-file-item" v-if="manyStatus[index]" :key="item.fileUrl + index">
                        <div class="many-file-item-left">
                            <div class="file-index"></div>
                            <span class="file-name file-name-click">Document {{index + 1 | formatNumber}}</span>
                        </div>
                        <a href="javascript:;" @click="manyDownFile(item.fileUrl, item.name, index + 1)" class="download-file">
                            <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <title>icon_download_accomplish.png</title>
                                <desc>Created with Sketch.</desc>
                                <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="购房通证详情页-文件下载" transform="translate(-1670.000000, -11489.000000)">
                                        <g id="状态" transform="translate(1303.000000, 10833.000000)">
                                            <g id="icon_download_accomplish.png" transform="translate(367.000000, 656.000000)">
                                                <g id="下载">
                                                    <rect id="矩形" stroke="#2EA9DF" fill="#2EA9DF" x="0.5" y="0.5" width="27" height="27" rx="13.5"></rect>
                                                    <g id="编组-7" transform="translate(11.000000, 8.000000)" stroke="#FFFFFF">
                                                        <path d="M0,12 L7,12" id="路径-5"></path>
                                                        <polyline id="路径-3" points="0 6.62233005 3.38527834 9.99121551 6.92822636 6.62233005"></polyline>
                                                        <path d="M3.38527834,9.99121551 L3.46411318,0.5" id="路径-4"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import download from 'ly-downloader'

    export default {
        name: 'FilesDown',
        props: ['files', 'name'],
        data () {
            return {
                // 是否单个文件
                single: true,
                // 单个文件是否已下载
                singleDowned: false,
                // 多个文件展示详情
                many: false,
                // 多个文件下载状态
                manyStatus: {}
            }
        },
        created () {
            if (this.files.length > 1) {
                this.single = false
                this.files.forEach((item, index) => {
                    this.$set(this.manyStatus, index, false)
                })
            } else {
                this.single = true
            }
        },
        methods: {
            /**
             * 单文件组件下载项目文件
             * @param src 文件地址
             * @param name 文件名
             */
            downFile (src, name) {
                let _src = '/' + src
                download(1, _src, this.$t(this.name) + '_' + name)
                this.singleDowned = true
            },
            /**
             * 多文件组件下载项目文件
             * @param src 文件地址
             * @param name 文件名
             * @param bool 显示下载后的状态
             */
            manyDownFile (src, name, index) {
                let _src = '/' + src
                download(1, _src, this.$t(this.name) + '_' + name)
                index = index - 1
                this.$set(this.manyStatus, index, true)
            },
            // 展示多个文件详情
            mouseover () {
                this.many = true
            },
            // 隐藏多个文件详情
            mouseout () {
                this.many = false
            },
            // 十位自动补0
            formatNumber (val) {
                if (parseInt(val) < 10) {
                    return '0' + val
                } else {
                    return val
                }
            }
        },
        filters: {
            // 十位自动补0
            formatNumber (val) {
                if (parseInt(val) < 10) {
                    return '0' + val
                } else {
                    return val
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../assets/styles/variable.less';

    @file-width: 380px;

    .files-content {

        margin-bottom: 20px;
        min-height: 48px;
        position: relative;

        .download-file {
            height: 28px;
            width: 28px;
        }

        .file-info {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 100;
            margin-right: 14px;
            width: @file-width;
            height: 283px;
            box-shadow:0px 0px 10px 5px rgba(0,0,0,0.05);
            border-radius:24px;

            .file-info-title {
                height: 48px;
                background: #0ba4e8;
                border-radius: 24px 24px 0px 0px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px 0 16px;

                .file-info-title-a {
                    cursor: pointer;
                }

                .file-name {
                    font-size:14px;
                    font-weight: 500;
                    color:rgba(255,255,255,1);
                    line-height:14px;
                }
            }

            .file-info-body {
                height: 235px;
                overflow-y: auto;
                background: #ffffff;
                padding: 5px 0;
                border-radius: 0px 0px 24px 24px;

                .many-file-item {
                    height: 45px;
                    padding: 0 13px 0 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .many-file-item-left {
                        display: flex;
                        align-items: center;

                        .file-index {
                            width:5px;
                            height:5px;
                            margin-right: 16px;
                            border-radius: 50%;
                            background:rgba(46,169,223,1);
                        }

                        .file-name{
                            font-size:14px;
                            font-weight:400;
                            color:rgba(51,51,51,1);
                            line-height:14px;
                        }

                        .file-name-click {
                            color:rgba(11,164,232,1);
                        }
                    }
                }
            }
        }

        .file-item {
            margin-right: 14px;
            width: @file-width;
            height: 48px;
            border-radius:24px;
            border:1px solid rgba(235,235,235,1);
            padding: 0 12px 0 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .file-item-many {
            padding: 0 20px 0 16px;
        }

        .file-name {
            font-size:14px;
            color:rgba(51,51,51,1);
            line-height:14px;
        }

        .file-item-click {
            width: @file-width;
            font-size:14px;
            height: 48px;
            border-radius:24px;
            border:none;
            padding: 0 12px 0 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background:rgba(249,249,249,1);
            color:rgba(11,164,232,1);
        }
    }

    @media screen and (max-width: @max-width) {
        @file-width: 100% !important;

        .files-content {
            width: @file-width;
        }

        .file-info {
            width: @file-width;
        }

        .file-item {
            width: @file-width;
        }

        .file-item-click {
            width: @file-width;
        }
    }
</style>