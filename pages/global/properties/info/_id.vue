<template>
    <a-layout id="components-layout-top" class="layout" :class="drawer">
        <fs-head :SelectedKey="key" :SelectedType="type" :centerKey="centerKey" @openDrawer="openDrawer" @closeDrawer="closeDrawer" style="margin-bottom: 0;"/>
        <section class="section">
            <div class="container">
                <a-layout-content>
                    <Breadcrumb :routes="routes"/>
                    <div class="content">
                        <div>
                            <!--              骨架屏              -->
                            <a-skeleton avatar :loading="loading" active :paragraph="{rows: 30}"/>
                            <!--             通证详细             -->
                            <a-list itemLayout="vertical"
                                    size="large"
                                    :dataSource="listData"
                                    :locale="{emptyText: ''}"
                                    class="pto-list">
                                <a-list-item slot="renderItem" slot-scope="item, index" key="item.title"
                                             class="skeleton">
                                    <section v-if="!loading">
                                        <a-row type="flex">
                                            <a-col :xl="16">
                                                <!--      通证名称       -->
                                                <div class="projectMaterial-name">
                                                    <span class="title offside-font" style="word-break: break-word;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;" :title="item.projectMaterial.name">{{item.projectMaterial.name}}</span>
                                                </div>
                                                <!--      通证类型       -->
                                                <div :class="showTag ? 'info-tag info-tag-more' : 'info-tag'" @click="showTagMore()">
                                                    <a-tag color="#d62839" :class="'pt-tag offside-font pt-tag-' + item.projectBase.issueState">{{issueState(item.projectBase.issueState)}}</a-tag>
                                                    <a-tag color="#d62839" class="pt-tag offside-font">{{item.projectBase.projectTypeName}}</a-tag>
                                                    <a-tag color="#d62839" class="pt-tag offside-font">{{item.projectBase.projectNatureName}}</a-tag>
                                                    <a-tag color="#d62839" class="pt-tag offside-font">{{item.projectMaterial.propertyRight}}</a-tag>
                                                    <a-tag color="#d62839" class="pt-tag offside-font" :key="index" v-for="(child, index) in item.projectMaterial.projectLabel">{{child}}</a-tag>
                                                    <a-icon v-if="!showTag" class="pt-tag-more" type="down" />
                                                    <a-icon v-else class="pt-tag-more" type="up" />
                                                </div>
                                            </a-col>
                                            <a-col :xl="8" class="total-price-col">
                                                <!--      通证总价       -->
                                                <div class="total-price">
                                                    <span class="item-title">
                                                        {{$t('CertificatePurchase.ptpurchase_title_totalprice')}}
                                                    </span>
                                                    <span class="item-value">
                                                        {{listData[0].projectDist.changeCurPrice | formatNumber}} {{listData[0].projectDist.changeCurCode}}
                                                    </span>
                                                </div>
                                            </a-col>
                                        </a-row>
                                        <!--      通证信息       -->
                                        <div class="list-body">
                                            <div class="total-imgs-mobile">
                                                {{currentIndex}}/{{projectMaterialImgs}}
                                            </div>
                                            <!--      走马灯组件       -->
                                            <a-carousel arrows dotsClass="slick-dots slick-thumb" class="fangsea-img"
                                                        :beforeChange="beforeChange" id="carousel">
                                                <div v-for="file in item.projectMaterial.imgs" class="img-info">
                                                    <template v-if="file.type === 1">
                                                        <video class="video"
                                                               controls="controls"
                                                               controlsList='nodownload noremote footbar'
                                                               :src="file.fileUrl"/>
                                                        <div class="total-imgs" v-show="isVideo"></div>
                                                    </template>
                                                    <img :src="file.largeUrl" v-else>
                                                </div>
                                                <a slot="customPaging" slot-scope="props" class="customPaging-a">
                                                    <img :src="getImgUrl(props.i)"/>
                                                </a>
                                                <div v-if="item.projectMaterial.imgs.length > 1"
                                                     slot="prevArrow" slot-scope="props"
                                                     class="custom-slick-arrow projectMaterial-imgs-left">
                                                    <div class="left-div">
                                                        <a-icon type="left"/>
                                                    </div>
                                                </div>
                                                <div v-if="item.projectMaterial.imgs.length > 1"
                                                     slot="nextArrow" slot-scope="props"
                                                     class="custom-slick-arrow projectMaterial-imgs-right">
                                                    <div class="right-div">
                                                        <a-icon type="right"/>
                                                    </div>
                                                </div>
                                            </a-carousel>
                                        </div>
                                    </section>
                                </a-list-item>
                            </a-list>
                            <!--      通证倒计时       -->
                            <template v-if="listData.length !== 0">
                                <div class="time-temaining" v-if="listData[0].projectBase.issueState === 3">
                                    <span class="time-title offside-font">{{$t('CertificatePurchase.certificatePurchase_distance_end')}}</span>
                                    <div class="time-value">
                                        <div>
                                            <span class="Days offside-font">{{Days}}</span>
                                            <span class="offside-font">{{$t('CertificatePurchase.certificatePurchase_day')}}</span>
                                        </div>
                                        <div>
                                            <span class="Days offside-font">{{Hours}}</span>
                                            <span class="offside-font">{{$t('CertificatePurchase.certificatePurchase_Hours')}}</span>
                                        </div>
                                        <div>
                                            <span class="Days offside-font">{{Minutes}}</span>
                                            <span class="offside-font">{{$t('CertificatePurchase.certificatePurchase_Minutes')}}</span>
                                        </div>
                                        <div>
                                            <span class="Days offside-font">{{Seconds}}</span>
                                            <span class="offside-font">{{$t('CertificatePurchase.certificatePurchase_Seconds')}}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div v-if="listData.length !== 0" class="tabs-contair">
                                <!--      基本信息       -->
                                <div class="body-info-contair">
                                    <div class="body-info">
                                        <!--         通证进度条           -->
                                        <pto-progress class="info-progress"
                                                      ref="infoProgress"
                                                      :saleRatio="listData[0].projectBase.saleRatio"
                                                      :successRatio="listData[0].projectBase.successRatio"
                                                      :sellOutRatio="listData[0].projectDistSetting.sellOutRatio"
                                                      :issueState="listData[0].projectBase.issueState"
                                                      :saleableAmount="listData[0].projectDist.totalAmount - listData[0].projectDistSetting.selfAmount"
                                                      :isFail="(listData[0].projectBase.issueState === 2 || listData[0].projectBase.issueState === 3) ? false : true">
                                        </pto-progress>
                                        <a-row type="flex">
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="7" class="flex-info-col" v-if="listData[0].projectBase.projectType !== 5" >
                                                <span class="item-title">{{$t('CertificatePurchase.ptpurchase_title_annualrental')}}:</span>
                                                <span class="item-value red-value">{{listData[0].projectDist.prospectiveYield}}</span>
                                            </a-col>
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="9" class="flex-info-col" v-if="listData[0].projectBase.projectType !== 5">
                                                <span class="item-title">{{$t('CertificatePurchase.ptpurchase_title_accounttype')}}:</span>
                                                <span class="item-value red-value">{{listData[0].projectMaterial.apartment}}</span>
                                            </a-col>
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8" class="flex-info-col">
                                                <span class="item-title">{{$t('CertificatePurchase.ptpurchase_title_area')}}:</span>
                                                <span class="item-value red-value">{{listData[0].projectMaterial.measure}}㎡</span>
                                            </a-col>
                                        </a-row>
                                        <a-row type="flex" class="body-info-row">
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="7" class="flex-info-col">
                                                <span class="item-title">{{$t('CertificatePurchase.certificatePurchase_item_total')}}:</span>
                                                <span class="item-value">{{listData[0].projectDistSetting.minimumBuyAmount | formatNumber}}</span>
                                            </a-col>
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="9" class="flex-info-col">
                                                <span class="item-title">{{$t('CertificatePurchase.certificatePurchase_item_minimum_subscription')}}:</span>
                                                <span class="item-value">{{listData[0].projectDistSetting.userMinAmount | formatNumber}}</span>
                                            </a-col>
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8" class="flex-info-col">
                                                <span class="item-title">{{$t('CertificatePurchase.certificatePurchase_remaining_quantity')}}:</span>
                                                <span class="item-value">{{listData[0].projectDist.totalAmount - listData[0].projectDistSetting.selfAmount | formatNumber}}</span>
                                            </a-col>
                                        </a-row>
                                        <a-row type="flex" class="body-info-row">
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="7" class="flex-info-col">
                                                <span class="item-title">{{$t('CertificatePurchase.certificatePurchase_item_number')}}:</span>
                                                <span class="item-value projectDist-ptCurCode">{{listData[0].projectDist.ptCurCode}}</span>
                                            </a-col>
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="9" class="flex-info-col">
                                                <span class="item-title">{{$t('CertificatePurchase.ptpurchase_title_itemtype')}}:</span>
                                                <span class="item-value">{{listData[0].projectBase.projectTypeName}}</span>
                                            </a-col>
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8" class="flex-info-col">
                                                <span class="item-title">{{$t('CertificatePurchase.ptpurchase_title_itemaddress')}}:</span>
                                                <span class="item-value">{{listData[0].projectBase.regionsName | toRegionsName}}</span>
                                            </a-col>
                                        </a-row>
                                    </div>
                                    <div class="addthis_inline_share_toolbox_ygq6" :data-media="pageImg"
                                         :data-url="pageUrl" :data-title="pageTitle" :data-description="pageDesc"></div>
                                    <!--<div class="body-info-contair-link">
                                        <svg t="1570785194256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1117" width="20" height="20"><path d="M511.922276 511.609221m-511.609221 0a511.609221 511.609221 0 1 0 1023.218442 0 511.609221 511.609221 0 1 0-1023.218442 0Z" fill="#3A5A98" p-id="1118"></path><path d="M873.837341 150.598776c199.795873 199.795873 199.804509 523.742792-0.008636 723.553779-199.804509 199.795873-523.757905 199.795873-723.553778 0L873.837341 150.598776z" fill="#345387" p-id="1119"></path><path d="M1020.219594 569.232889L650.137037 199.141697l-192.146542 192.146542 11.44701 11.44701-109.398609 109.389973 89.5423 89.542301-11.777336 11.770859 96.941188 96.941188-111.758394 111.758395 190.918072 190.918072c215.291005-43.568588 381.473432-222.312068 406.314868-443.823148z" fill="#2E4D72" p-id="1120"></path><path d="M422.47713 321.554749v85.800756h-62.859239v104.923006h62.859239v311.763691h129.125378V512.278511h86.649243s8.117834-50.319776 12.045052-105.318102h-98.202043v-71.745677c0-10.71295 14.072352-25.132901 27.991414-25.132901h70.355282V200.853783h-95.656584c-135.505218-0.006477-132.307742 105.013683-132.307742 120.700966z" fill="#FFFFFF" p-id="1121"></path></svg>
                                        <svg t="1570785300678" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2617" width="22" height="22"><path d="M512.274401 959.556658c247.17718 0 447.556658-200.366167 447.556658-447.556658 0-247.16387-200.379477-447.556658-447.556658-447.556658-247.188443 0-447.569968 200.392788-447.569968 447.556658 0 247.190491 200.382549 447.556658 447.569968 447.556658" fill="#38A1F3" p-id="2618" data-spm-anchor-id="a313x.7781069.0.i5" class="selected"></path><path d="M736.810405 394.754891c-16.48353 7.310541-34.227463 12.256931-52.82122 14.478763 19.004336-11.383557 33.588558-29.396772 40.435279-50.868671-17.780793 10.536804-37.440415 18.183179-58.42392 22.294079-16.741549-17.872942-40.666677-29.038412-67.134113-29.038412-50.766282 0-91.948998 41.192954-91.948998 91.972548 0 7.220439 0.784296 14.222791 2.366199 20.943574-76.439183-3.841618-144.191723-40.421969-189.587726-96.109044-7.915657 13.630985-12.452493 29.422369-12.452493 46.282688 0 31.877646 16.241893 60.042683 40.924696 76.552835-15.072616-0.460748-29.26981-4.637177-41.682371-11.485946v1.131393c0 44.585086 31.698466 81.757243 73.804725 90.185867-7.723167 2.160398-15.841554 3.239573-24.246628 3.239574a91.24866 91.24866 0 0 1-17.294447-1.63105c11.691747 36.527109 45.654023 63.139936 85.90705 63.845394-31.477307 24.682804-71.144672 39.382725-114.227718 39.382725-7.42624 0-14.762379-0.410578-21.946982-1.270642 40.706609 26.070168 89.057546 41.308653 140.992081 41.308653 169.209337 0 261.697922-140.132017 261.697922-261.695874 0-3.997248-0.078839-7.979138-0.244709-11.899595a186.466924 186.466924 0 0 0 45.883373-47.618859" fill="#FFFFFF" p-id="2619" data-spm-anchor-id="a313x.7781069.0.i11" class="selected"></path></svg>
                                        <svg t="1570785692588" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5777" width="20" height="20"><path d="M512 0C229.26 0 0 229.26 0 512s229.26 512 512 512 512-229.26 512-512S794.74 0 512 0zM386.86 725.37H283v-335h103.86z m-52.69-374.74a67.83 67.83 0 1 1 3.89-0.69c-1.37 0-2.63-0.11-4-0.23z m431 374.74H661.26v-185c0-42.63-14.86-71.2-52.57-71.2a56.83 56.83 0 0 0-53.15 38.63 68.57 68.57 0 0 0 0 26.4l-0.11 190.74H448.8V390.4h90.29l5 46.17a120.1 120.1 0 0 1 103.32-53.94c71 0 119.31 45.48 119.31 142.17-0.09 0-1.58 200.57-1.58 200.57z" p-id="5778" data-spm-anchor-id="a313x.7781069.0.i21" class="selected" fill="#0E76A8"></path></svg>
                                        <svg t="1570785853623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13750" width="22" height="22"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#57E087" p-id="13751"></path><path d="M635.199 627.91a24.88 24.88 0 0 1 27.373-6.087l118.107 47.156c9.222 3.682 13.716 14.15 10.036 23.38a18 18 0 0 1-0.587 1.317l-36.909 74.584-0.392-0.123C745.63 782.298 730.933 792 713.97 792a43.87 43.87 0 0 1-6.626-0.501C450.3 780.042 243.949 573.527 232.5 316.28c-0.33-2.162-0.501-4.377-0.501-6.631 0-16.856 9.557-31.477 23.544-38.733l-0.033-0.105 74.525-36.938c8.898-4.41 19.683-0.766 24.09 8.139a18 18 0 0 1 0.588 1.318l47.119 118.199a24.927 24.927 0 0 1-6.083 27.395l-42.506 39.935c-4.385 4.426-7.012 8.263-7.882 11.513-0.68 2.54-0.585 5.84 0.285 9.898a336.604 336.604 0 0 0 3.388 10.716c0.846 2.141 1.821 4.41 2.928 6.805l-1.475-2.556c33.889 96.97 110.551 173.838 207.352 207.95l-1.53-0.885c1.226 0.567 2.418 1.1 3.577 1.598a335.958 335.958 0 0 0 16.231 5.146c3.02 0.455 5.55 0.41 7.59-0.138 2.409-0.646 5.14-2.26 8.196-4.841l43.295-46.154z" fill="#F0F7F1" p-id="13752"></path><path d="M588.185 771.532C389.128 712.5 242.113 532.272 232.5 316.28c-0.33-2.162-0.501-4.377-0.501-6.631 0-16.856 9.557-31.477 23.544-38.733l-0.033-0.105 74.525-36.938c8.898-4.41 19.683-0.766 24.09 8.139a18 18 0 0 1 0.588 1.318l47.119 118.199a24.927 24.927 0 0 1-6.083 27.395l-42.506 39.935c-4.385 4.426-7.012 8.263-7.882 11.513-0.68 2.54-0.585 5.84 0.285 9.898a336.604 336.604 0 0 0 3.388 10.716c0.846 2.141 1.821 4.41 2.928 6.805l-1.475-2.556a337.308 337.308 0 0 0 20.255 46.423c35.311 126.27 110.035 213.09 217.442 259.874z" fill="#DAF1E2" p-id="13753"></path><path d="M363.152 630.742C286.451 547.19 237.89 437.354 232.501 316.28c-0.33-2.162-0.501-4.377-0.501-6.631 0-16.856 9.557-31.477 23.544-38.733l-0.033-0.105 74.525-36.938c8.898-4.41 19.683-0.766 24.09 8.139a18 18 0 0 1 0.588 1.318l47.119 118.199a24.927 24.927 0 0 1-6.083 27.395l-42.506 39.935c-4.385 4.426-7.012 8.263-7.882 11.513-0.557 2.08-0.594 4.668-0.112 7.764-0.81 1.853-1.333 3.983-1.545 6.415A455.858 455.858 0 0 0 342 494c0 47.676 7.414 93.62 21.152 136.742z" fill="#FFFFFF" p-id="13754"></path></svg>
                                    </div>-->
                                </div>
                                <!--        悬浮框       -->
                                <div class="fixed-div" id="fixed-div">
                                    <div class="title">
                                        <span class="item-title offside-font">{{$t('CertificatePurchase.certificatePurchase_item_number')}}: {{listData[0].projectDist.ptCurCode}}</span>
                                    </div>
                                    <div class="body">
                                        <a-row class="mg-bm-8">
                                            <a-col :span="24" class="item">
                                                <span class="item-key">
                                                    {{$t('CertificatePurchase.certificatePurchase_pre_sale_time')}}:
                                                </span>
                                                <span class="item-value">
                                                    {{listData[0].projectDist.planStartTime | parseTime('{y}-{m}-{d} {h}:{i}')}} - {{listData[0].projectDist.planEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}
                                                </span>
                                            </a-col>
                                        </a-row>
                                        <a-row class="mg-bm-8">
                                            <a-col :span="24" class="item">
                                                <span class="item-key">
                                                    {{$t('CertificatePurchase.certificatePurchase_issue_price')}}:
                                                </span>
                                                <span class="item-value">
                                                    {{listData[0].projectBase.convertPrice}} {{listData[0]. projectDist.curCode}}/{{$t('CertificatePurchase.certificatePurchase_portion')}}
                                                </span>
                                            </a-col>
                                        </a-row>
                                        <a-row class="mg-bm-8">
                                            <a-col :span="24" class="item">
                                                <span class="item-key">{{$t('CertificatePurchase.certificatePurchase_market_evaluation')}}:
                                                </span>
                                                <span class="item-value">
                                                    {{listData[0].projectExamine.changeCurPrice | formatNumber}} {{listData[0].projectExamine.changeCurCode}}
                                                </span>
                                            </a-col>
                                        </a-row>
                                        <a-row class="mg-bm-8">
                                            <a-col :span="24" class="item">
                                                <span class="item-key">{{$t('CertificatePurchase.certificatePurchase_pts_total')}}:</span>
                                                <span class="item-value">{{listData[0].projectDist.totalAmount | formatNumber}}</span>
                                            </a-col>
                                        </a-row>
                                        <a-row class="mg-bm-8">
                                            <a-col :span="24" class="item">
                                                <span class="item-key">{{$t('CertificatePurchase.certificatePurchase_maximum_number_subscriptions')}}:</span>
                                                <span class="item-value">{{listData[0].projectDistSetting.userMaxAmount | formatNumber}}</span>
                                            </a-col>
                                        </a-row>
                                        <a-row class="mg-bm-8">
                                            <a-col :span="24" class="item">
                                                <span class="item-key">{{$t('CertificatePurchase.ptpurchase_issuer_information')}}:</span>
                                                <span class="item-value projectIssuer-issuerName">
                                                    {{listData[0].projectIssuer.issuerName}}
                                                </span>
                                            </a-col>
                                        </a-row>
                                    </div>
                                    <div>
                                        <a-button :disabled="listData[0].projectBase.issueState !== 3"
                                                  :loading="flag"
                                                  type="primary"
                                                  block
                                                  class="now-buy"
                                                  :class="{'now-buy-normal': listData[0].projectBase.issueState === 3}"
                                                  @click="checkKycStatus">
                                            {{$t('CertificatePurchase.ptpurchase_title_buynow')}}
                                        </a-button>
                                    </div>
                                </div>
                            </div>
                            <!--      tabs导航       -->
                            <a-tabs v-if="listData.length !== 0"
                                    id="tabsAnthor"
                                    class="tabs-style"
                                    style="padding-top: 70px;"
                                    :tabBarGutter="110"
                                    :activeKey="activeKey"
                                    @change="changeTabs">
                                <a-tab-pane :tab="$t('CertificatePurchase.ptpurchase_essential_information')" key="1">
                                    <!--      基本信息       -->
                                    <div class="title-info rule-business">
                                        <a-row class="mg-bm-8">
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
                                                <span class="item-key">{{$t('CertificatePurchase.ptpurchase_title_itemtype')}}:</span>
                                                <span class="item-value">{{listData[0].projectBase.projectTypeName}}</span>
                                            </a-col>
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
                                                <span class="item-key">{{$t('CertificatePurchase.certificatePurchase_ptos_number')}}:</span>
                                                <span class="item-value">{{listData[0].projectDist.totalAmount | formatNumber}}</span>
                                            </a-col>
                                        </a-row>
                                        <a-row class="mg-bm-8">
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
                                                <span class="item-key">{{$t('CertificatePurchase.ptpurchase_title_area')}}:</span>
                                                <span class="item-value">{{listData[0].projectMaterial.measure}}㎡</span>
                                            </a-col>
                                            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
                                                <span class="item-key">{{$t('CertificatePurchase.certificatePurchase_project_properties')}}:</span>
                                                <span class="item-value">{{listData[0].projectBase.projectNatureName}}</span>
                                            </a-col>
                                        </a-row>
                                        <a-row class="mg-bm-8 property-title">
                                            <a-col :span="24" class="item-col">
                                                <span class="item-key">{{$t('CertificatePurchase.ptpurchase_property_right')}}:</span>
                                                <span class="item-value projectIssuer-issuerName">{{listData[0].projectMaterial.propertyRight}}</span>
                                            </a-col>
                                        </a-row>
                                        <a-row class="mg-bm-8">
                                            <a-col :span="24" class="item-col">
                                                <span class="item-key">{{$t('CertificatePurchase.certificatePurchase_developer')}}:</span>
                                                <span class="item-value projectIssuer-issuerName">
                                                {{listData[0].projectIssuer.issuerName}}
                                                </span>
                                            </a-col>
                                        </a-row>
                                        <a-row>
                                            <a-col :span="24" class="item-col">
                                                <span class="item-key">{{$t('CertificatePurchase.certificatePurchase_details_address')}}:</span>
                                                <span class="item-value projectIssuer-issuerName">{{listData[0].projectMaterial.address}}</span>
                                            </a-col>
                                        </a-row>
                                        <a-row class="property-title">
                                            <a-col :span="24" class="theme-img">
                                                <div v-html="listData[0].projectMaterial.introduce"
                                                     class="projectMaterial-introduce"></div>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </a-tab-pane>
                                <a-tab-pane :tab="$t('CertificatePurchase.certificatePurchase_item_publicinfor')"
                                            v-if="showPublicInfo" key="2">
                                    <!--      公示信息       -->
                                    <div class="title-info" v-if="showPublicInfo">
                                        <a-row>
                                            <a-col :span="24" class="theme-img">
                                                <div v-html="publicInfo" class="projectMaterial-introduce"></div>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </a-tab-pane>
                                <a-tab-pane :tab="$t('CertificatePurchase.certificatePurchase_items_file')" key="3">
                                    <!--      项目文件       -->
                                    <div class="title-info shadowDown-parent title-info-width">
                                        <div class="shadowDown" v-if="!isLogin">
                                            <div>
                                                <a href="javascript:;" @click="toLogin">
                                                    <span>{{$t('CertificatePurchase.certificatePurchase_login')}}</span>
                                                </a>
                                                {{$t('CertificatePurchase.certificatePurchase_after_view_file')}}
                                            </div>
                                        </div>
                                        <!--      文件组件      -->
                                        <div class="files-contair">
                                            <files-down v-if="files.licenseImg.length !== 0"
                                                        :files="files.licenseImg"
                                                        :name="'files.files_developer_business_license'"/>
                                            <files-down v-if="files.houseCertificateImg.length !== 0"
                                                        :files="files.houseCertificateImg"
                                                        :name="'files.files_ownership_certificate'"/>
                                            <files-down v-if="files.eiaImg.length !== 0"
                                                        :files="files.eiaImg" :name="'files.files_eia'"/>
                                            <files-down v-if="files.buildingPermitsImg.length !== 0"
                                                        :files="files.buildingPermitsImg"
                                                        :name="'files.files_building_permit'"/>
                                            <files-down v-if="files.landCertificateImg.length !== 0"
                                                        :files="files.landCertificateImg" :name="'files.files_land_title'"/>
                                            <files-down v-if="files.landContractImg.length !== 0"
                                                        :files="files.landContractImg"
                                                        :name="'files.files_land_purchase_agreement'"/>
                                            <files-down v-if="files.landMasterImg.length !== 0"
                                                        :files="files.landMasterImg"
                                                        :name="'files.files_landlord_details'"/>
                                            <files-down v-if="files.installmentImg.length !== 0"
                                                        :files="files.installmentImg"
                                                        :name="'files.files_land_payment_details'"/>
                                            <files-down v-if="files.lawFirmSurveyImg.length !== 0"
                                                        :files="files.lawFirmSurveyImg"
                                                        :name="'files.files_due_diligence_report'"/>
                                            <files-down v-if="files.intermediarySurveyImg.length !== 0"
                                                        :files="files.intermediarySurveyImg"
                                                        :name="'files.files_valuation_report'"/>
                                            <files-down v-if="files.propertyCertificateImg.length !== 0"
                                                        :files="files.propertyCertificateImg"
                                                        :name="'files.files_property_license'"/>
                                            <files-down v-if="files.agreementImg.length !== 0"
                                                        :files="files.agreementImg"
                                                        :name="'files.files_general_certificate'"/>
                                            <files-down v-if="files.otherFile.length !== 0"
                                                        :files="files.otherFile"
                                                        :name="'files.files_otherFile'"/>
                                        </div>
                                    </div>
                                    <div class="project-list-box">
                                        <project-list :projectId="projectId" :showTitle="showTitle" :pagSize="pagSize" :showPagination="showPagination"></project-list>
                                    </div>
                                </a-tab-pane>
                                <a-tab-pane :tab="$t('CertificatePurchase.certificatePurchase_rule_business')" key="4">
                                    <!--      交易规则       -->
                                    <div class="title-info rule-business">
                                        <a-row class="mg-bm-8">
                                            <div v-if="listData[0].projectBase.projectNature !== 8">
                                                <a-col :span="24">
                                                    <span class="item-key rule-body rule-body-title">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement')}}
                                                    </span>
                                                </a-col>
                                                <a-col :span="24" class="mg-bm-8 rule-body-info">
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement_info1')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement_info2')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{certificatePurchase_investment_statement_info3}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement_info4')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement_info5')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement_info6')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement_info7')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement_info8')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement_info9')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_investment_statement_info10')}}
                                                    </span>
                                                </a-col>
                                            </div>
                                            <a-col :span="24">
                                                <span class="item-key rule-body rule-body-title rule-body-title-top">
                                                    {{$t('CertificatePurchase.certificatePurchase_rule_buy_offtake')}}
                                                </span>
                                            </a-col>
                                            <a-col :span="24" class="mg-bm-8 rule-body-info">
                                                <span class="item-key rule-body">
                                                    {{$t('CertificatePurchase.certificatePurchase_rule_buy_offtake_info1')}}
                                                </span>
                                                <span class="item-key rule-body">
                                                    {{certificatePurchase_rule_buy_offtake_info2}}
                                                </span>
                                                <span class="item-key rule-body">
                                                    {{certificatePurchase_rule_buy_offtake_info3}}
                                                </span>
                                                <span class="item-key rule-body">
                                                    {{$t('CertificatePurchase.certificatePurchase_rule_buy_offtake_info4')}}
                                                </span>
                                                <span class="item-key rule-body">
                                                    {{$t('CertificatePurchase.certificatePurchase_rule_buy_offtake_info5')}}
                                                </span>
                                            </a-col>
                                            <div v-if="listData[0].projectBase.projectNature !== 8">
                                                <a-col :span="24">
                                                    <span class="item-key rule-body rule-body-title rule-body-title-top">
                                                        {{$t('CertificatePurchase.certificatePurchase_rule_income')}}
                                                    </span>
                                                </a-col>
                                                <a-col :span="24" class="mg-bm-8 rule-body-info">
                                                    <span class="item-key rule-body ">
                                                        {{$t('CertificatePurchase.certificatePurchase_rule_income_info1')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_rule_income_info2')}}
                                                    </span>
                                                    <span class="item-key rule-body">
                                                        {{$t('CertificatePurchase.certificatePurchase_rule_income_info3')}}
                                                    </span>
                                                </a-col>
                                            </div>
                                            <a-col :span="24">
                                                <span class="item-key rule-body rule-body-title rule-body-title-top">
                                                    {{$t('CertificatePurchase.certificatePurchase_rule_offtake')}}
                                                </span>
                                            </a-col>
                                            <a-col :span="24" class="mg-bm-8 rule-body-info">
                                                <span class="item-key rule-body">
                                                    {{$t('CertificatePurchase.certificatePurchase_rule_offtake_info1')}}
                                                </span>
                                                <span class="item-key rule-body">
                                                    {{$t('CertificatePurchase.certificatePurchase_rule_offtake_info2')}}
                                                </span>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </a-tab-pane>
                                <a-tab-pane
                                        :tab="$t('CertificatePurchase.certificatePurchase_subscription_information')"
                                        key="5">
                                    <!--        认购信息       -->
                                    <div class="title-info shadowDown-parent information-table">
                                        <a-table :columns="columns" :dataSource="data" :pagination="pagination"
                                                 :bordered="true"
                                                 :locale="{emptyText: $t('NoData.NoData_table')}">
                                            <template slot="ptTotalAmount" slot-scope="ptTotalAmount">{{ptTotalAmount |
                                                formatNumber}}
                                            </template>
                                            <template slot="curAmount" slot-scope="curAmount">{{curAmount | formatNumber}}
                                            </template>
                                            <template slot="saleTime" slot-scope="saleTime">{{saleTime |
                                                parseTime('{y}-{m}-{d} {h}:{i}')}}
                                            </template>
                                        </a-table>
                                    </div>
                                </a-tab-pane>
                            </a-tabs>
                            <div class="project-list-box" v-show="!isFiles">
                                <project-list :projectId="projectId" :showTitle="showTitle" :pagSize="pagSize" :showPagination="showPagination"></project-list>
                            </div>
                        </div>
                    </div>
                </a-layout-content>
            </div>
        </section>
        <fonter/>
    </a-layout>
</template>

<script>
    import {toRegionsName, formatNumber, parseTime, toCountDown} from '~/assets/utils/index'
    import PtoProgress from '~/components/PtoProgress'
    import ProjectList from '~/components/ProjectList'
    import Breadcrumb from '~/components/Breadcrumb'
    import FsHead from '~/components/FangseaHeader'
    import FilesDown from '~/components/FilesDown'
    import fonter from '~/components/Footer'
    import tool from '~/assets/utils/tool'
    import {Bus} from '~/assets/utils/bus'
    import axios from '~/plugins/axios'
    import Cookie from 'js-cookie'

    export default {
        /**
         * 服务端渲染
         * @param params 项目ID
         * @returns {{pagination, data: Array, showPublicInfo: boolean, publicInfo: string}}
         */
        async asyncData ({params, app, req}) {
            if (process.server) {
                let locale = app.i18n._vm._data.locale
                let i18nData = app.i18n._vm._data.messages[locale]
                let pageTitle = params.title ? params.title : i18nData.PageTitle.house_index_pagetitle
                let pageImg = params.pageImg ? params.pageImg : '/global/app-icons/logo-192.jpg'
                let pageUrl = ''
                let baseUrl = tool.getAddress(req).split('/api/')[0]
                // facebook分享地址
                let fbUrl = `${baseUrl}/global/properties/info/${params.id}`
                if (baseUrl.indexOf(':443') > 0) {
                    baseUrl = baseUrl.split(':443')[0]
                }
                let detailData = {
                    traceId: tool.UUID(),
                    data: {
                        projectId: params.id
                    }
                }
                // 请求通证详情以获取分享相关数据
                let detailRes = await axios.post(`${tool.getAddress(req)}/pto/detail/get`, detailData)
                // 处理分享相关数据
                if (detailRes.data.code.toString() === '0') {
                    pageTitle = tool.intervariable(i18nData.PageTitle.passpurdetail_pagetitle, [detailRes.data.data.projectMaterial.name])
                    pageImg = '/' + detailRes.data.data.projectMaterial.imgs[0].largeUrl
                }
                // 短网址请求
                let oldUrl = baseUrl + req.url
                let shortUrlRes = await axios.post(`${baseUrl}/tools/short_url/get`, {
                    traceId: tool.UUID(),
                    data: oldUrl
                })
                // 处理短网址请求数据
                if (shortUrlRes.data.code.toString() === '0') {
                    pageUrl = baseUrl + shortUrlRes.data.data
                }
                let _params = params
                /**
                 * 用户购买历史
                 */
                let p1 = new Promise((resolve, reject) => {
                    let pageData = {
                        traceId: tool.UUID(),
                        data: {
                            pageNum: 1,
                            pageSize: 10,
                            filter: {
                                projectId: _params.id
                            }
                        }
                    }
                    axios.post(`${tool.getAddress(req)}/pto/invest/project/list`, pageData)
                        .then(res => {
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                /**
                 * 公示信息
                 */
                let p2 = new Promise((resolve, reject) => {
                    let params = {
                        traceId: tool.UUID(),
                        data: {
                            projectId: _params.id
                        }
                    }
                    axios.post(`${tool.getAddress(req)}/pto/project/publicity/get`, params)
                        .then(res => {
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                let data = []
                let pagination = {}
                let publicInfo = ''
                let showPublicInfo = false
                return Promise.all([p1, p2]).then((array) => {
                    if (array[0].data.code.toString() === '0') {
                        data = array[0].data.data.list
                        pagination.total = array[0].data.data.total
                    }
                    if (array[1].data.code.toString() === '0' && array[1].data.data) {
                        let r = array[1].data.data.publicContent.replace(/\s*/g, '')
                        r = r.replace(/<p><\/p>/g, '')
                        if (r.length !== 0) {
                            showPublicInfo = true
                        }
                        publicInfo = array[1].data.data.publicContent
                    }
                    return {data, pagination, publicInfo, showPublicInfo, pageTitle, pageImg, pageUrl, fbUrl}
                })
            }
        },
        data () {
            return {
                key: '2',
                type: 0,
                centerKey: 0,
                // 是否登录
                isLogin: false,
                drawer: {'drawer-containel-left': false, 'drawer-containel-right': false},
                // 面包屑数据
                routes: [],
                // 显示骨架屏
                loading: true,
                // 详情数据
                listData: [],
                // 进度条状态颜色
                strokeColorNormal: '#2FAAE0',
                strokeColorError: '#D9D9D9',
                // 当前项目ID
                projectId: 0,
                // 当前选中的tabs key
                activeKey: '1',
                // 遮掩更多选项
                isVideo: true,
                // 交易规则内容动态
                certificatePurchase_rule_buy_offtake_info2: '',
                certificatePurchase_rule_buy_offtake_info3: '',
                certificatePurchase_investment_statement_info3: '',
                // 立即认购等待
                flag: false,
                // 表格数据
                data: [],
                // 表格头数据
                columns: [],
                // 是否是文件下载
                isFiles: false,
                // 分页组件
                pagination: {
                    onChange: (currentPage) => {
                        this.current = currentPage
                        this.buyHistory()
                    },
                    pageSize: 10,
                    total: 0
                },
                // 当前图片下标
                currentIndex: 1,
                // 走马灯数量
                projectMaterialImgs: 0,
                // 初始页码
                current: 1,
                // 初始总数
                total: 0,
                // 分页
                pageSize: 10,
                // 错误提示信息
                errorMsg: '',
                // 售罄图标是否是中文
                isZh: true,
                // 是否显示售罄图标
                showSalesIcon: false,
                // 国际化参数
                globalarr: [],
                // 公示信息
                publicInfo: '',
                // 显示公示信息
                showPublicInfo: false,
                /**
                 * 资料类别-中英文对照及排序:
                 * 1、开发商营业执照 DEVELOPER BUSINESS LICENSE
                 * 2、产权证 OWNERSHIP CERTIFICATE
                 * 3、EIA EIA
                 * 4、建筑许可证 BUILDING PERMIT
                 * 5、土地证 LAND TITLE
                 * 6、土地购买合同 LAND PURCHASE AGREEMENT
                 * 7、土地地主资料 LANDLORD DETAILS
                 * 8、分期付款资料 LAND PAYMENT DETAILS
                 * 9、律所尽调报告 DUE DILIGENCE REPORT
                 * 10、市场评估报告 VALUATION REPORT
                 * 11、物业运营商执照 PROPERTY MANAGER CERTIFICATE
                 * 12、房产通证发行协议 PROPERTY TOKENISATION AGREEMENT
                 * 13、其他 OTHERS （不仅限于文本）
                 */
                files: {
                    // * 1、开发商营业执照
                    licenseImg: [],
                    // * 2、产权证
                    houseCertificateImg: [],
                    // * 3、EIA
                    eiaImg: [],
                    // * 4、建筑许可证
                    buildingPermitsImg: [],
                    // * 5、土地证
                    landCertificateImg: [],
                    // * 6、土地购买合同
                    landContractImg: [],
                    // * 7、土地地主资料
                    landMasterImg: [],
                    // * 8、分期付款资料
                    installmentImg: [],
                    // * 9、律所尽调报告
                    lawFirmSurveyImg: [],
                    // * 10、市场评估报告
                    intermediarySurveyImg: [],
                    // * 11、物业运营商执照
                    propertyCertificateImg: [],
                    // * 12、房产通证发行协议
                    agreementImg: [],
                    // * 13、其他
                    otherFile: []
                },
                // 是否显示视频
                showVideo: false,
                // 是否展开标签
                showTag: false,
                // 显示分页
                showPagination: false,
                // 每页数量
                pagSize: 3,
                // 显示标题文字
                showTitle: true,
                // 项目倒计时
                Days: 0,
                Hours: 0,
                Minutes: 0,
                Seconds: 0,
                Interval: '',
                // 页面url
                pageUrl: '',
                // 页面标题
                pageTitle: '',
                // 页面描述
                pageDesc: 'Leading Blockchain Platform for Global Property Investments',
                // 页面图片
                pageImg: '',
                //  Facebook分享地址
                fbUrl: '',
                // 服务端获取数据
                serverData: []
            }
        },
        created () {
            if (process.client) {
                this.pagination.onChange = (currentPage) => {
                    this.current = currentPage
                    this.buyHistory()
                }
                this.getProjectId()
                this.setIconI18n()
                if (this.data.length === 0) {
                    this.buyHistory()
                }
                if (this.publicInfo === '') {
                    this.getPublicInfor()
                }
                if (this.pageTitle === '') {
                    this.pageTitle = this.$route.params.title ? this.$route.params.title : 'PTOHome - Leading Blockchain Platform for Global Property Investments'
                }
                if (this.pageImg === '') {
                    this.pageImg = this.$route.params.pageImg ? this.$route.params.pageImg : '/global/app-icons/logo-192.jpg'
                }
            }
        },
        mounted () {
            this.checkAndroid()
            this.loadScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5da6f3e3a9aa1880')
        },
        methods: {
            /**
             * 跳转登录
             */
            toLogin () {
                let url = this.$route.path
                Cookie.set('redirectUrl', url)
                window.location.href = `/user/login`
            },
            // 项目倒计时
            getCountDown () {
                this.Interval = setInterval(() => {
                    if (this.listData[0].projectDist.planEndTime > 1) {
                        let times = toCountDown(this.listData[0].projectDist.planEndTime).split(',')
                        this.Days = times[0]
                        this.Hours = times[1]
                        this.Minutes = times[2]
                        this.Seconds = times[3]
                    } else {
                        window.clearInterval(this.Interval)
                    }
                }, 1000)
            },
            /**
             * 显示更多标签
             */
            showTagMore () {
                this.showTag = !this.showTag
                this.$refs.infoProgress.showTooltips()
            },
            // 判断是否是安卓QQBrowser
            checkAndroid () {
                let explorer = navigator.userAgent.toLowerCase()
                if (explorer.indexOf('android') > -1) {
                    if (explorer.indexOf('firefox') >= 0) {
                        // 火狐浏览器
                        let regStrFf = /firefox\/[\d.]+/gi
                        let browser = explorer.match(regStrFf)
                        let verinfo = (browser + '').replace(/[^0-9.]/ig, '')
                        let end = verinfo.indexOf('.')
                        verinfo = verinfo.substring(0, end)
                        if (parseInt(verinfo) > 68) {
                            this.showVideo = true
                        }
                    } else if (explorer.indexOf('qqbrowser') >= 0) {
                        // QQ浏览器
                        this.showVideo = false
                    } else if (explorer.indexOf('chrome') >= 0) {
                        // 谷歌浏览器
                        let regStrChrome = /chrome\/[\d.]+/gi
                        let browser = explorer.match(regStrChrome)
                        let verinfo = (browser + '').replace(/[^0-9.]/ig, '')
                        let end = verinfo.indexOf('.')
                        verinfo = verinfo.substring(0, end)
                        if (parseInt(verinfo) > 62) {
                            this.showVideo = true
                        }
                    } else if (explorer.indexOf('msie') >= 0) {
                        // IE
                        let regStrIe = /msie [\d.]+;/gi
                        let browser = explorer.match(regStrIe)
                        let verinfo = (browser + '').replace(/[^0-9.]/ig, '')
                        let end = verinfo.indexOf('.')
                        verinfo = verinfo.substring(0, end)
                        if (parseInt(verinfo) >= 10) {
                            this.showVideo = true
                        }
                    } else if (explorer.indexOf('edge') >= 0) {
                        // Edge
                        let regStrIe = /edge [\d.]+;/gi
                        let browser = explorer.match(regStrIe)
                        let verinfo = (browser + '').replace(/[^0-9.]/ig, '')
                        let end = verinfo.indexOf('.')
                        verinfo = verinfo.substring(0, end)
                        if (parseInt(verinfo) >= 12) {
                            this.showVideo = true
                        }
                    } else if (explorer.indexOf('blackberry') >= 0) {
                        // BlackBerry
                        let regStrIe = /blackberry\/[\d.]+/gi
                        let browser = explorer.match(regStrIe)
                        let verinfo = (browser + '').replace(/[^0-9.]/ig, '')
                        let end = verinfo.indexOf('.')
                        verinfo = verinfo.substring(0, end)
                        if (parseInt(verinfo) >= 10.3) {
                            this.showVideo = true
                        }
                    } else if (explorer.indexOf('opera') >= 0) {
                        // opera浏览器
                        let regStrOpera = /opera\/[\d.]+/gi
                        let browser = explorer.match(regStrOpera)
                        let verinfo = (browser + '').replace(/[^0-9.]/ig, '')
                        let end = verinfo.indexOf('.')
                        verinfo = verinfo.substring(0, end)
                        if (parseInt(verinfo) >= 12.1) {
                            this.showVideo = true
                        }
                    } else if (explorer.indexOf('samsung') >= 0) {
                        // Samsung
                        let regStrOpera = /samsung\/[\d.]+/gi
                        let browser = explorer.match(regStrOpera)
                        let verinfo = (browser + '').replace(/[^0-9.]/ig, '')
                        let end = verinfo.indexOf('.')
                        verinfo = verinfo.substring(0, end)
                        if (parseInt(verinfo) >= 2) {
                            this.showVideo = true
                        }
                    } else if (explorer.indexOf('se 2.x') >= 0) {
                        // 搜狗浏览器
                        this.showVideo = true
                    } else {
                        this.showVideo = false
                    }
                } else {
                    this.showVideo = true
                }
                this.initInfo()
            },
            // 获取当前国际化标识
            setIconI18n () {
                // 售罄图标同步国际化
                switch (Cookie.get('language')) {
                case 'zh_TW' :
                    this.isZh = true
                    break
                case 'zh_CN' :
                    this.isZh = true
                    break
                case 'en_US' :
                    this.isZh = false
                    break
                }
            },
            // 监听动态数据国际化
            listenI18n () {
                Bus.$on('checkLange', () => {
                    this.initInfo()
                    this.getPublicInfor()
                    this.setIconI18n()
                })
            },
            /**
             * 初始化面包屑国际化
             */
            initBreadcrumb () {
                if (this.listData[0]) {
                    this.routes = [{
                        path: '/global',
                        breadcrumbName: this.$t('Breadcrumb.breadcrumb_title_home')
                    }, {
                        path: '/global/properties',
                        breadcrumbName: this.$t('Breadcrumb.breadcrumb_title_buypts')
                    }, {
                        path: '/global/properties/info',
                        breadcrumbName: this.listData[0].projectMaterial.name
                    }]
                }
            },
            /**
             * 走马灯
             * 切换主图片改变小图标位置
             * @param from 上一个图片
             * @param to 下一个图片
             */
            beforeChange (from, to) {
                if (this.listData[0].projectMaterial.imgs.length > 6) {
                    if (to > 5) {
                        let _left = (to - 6) * 150 + 40
                        document.querySelector('#carousel').firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.transform = `translate3d(-${_left}px, 0px, 0px)`
                    } else {
                        to === 0 ? this.isVideo = true : this.isVideo = false
                        let _left = 0
                        document.querySelector('#carousel').firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.transform = `translate3d(-${_left}px, 0px, 0px)`
                    }
                }
                this.currentIndex = to + 1
            },
            /**
             * 是否显示视频占位图
             * @param index 走马灯图片下标
             */
            getImgUrl (index) {
                let bool = this.listData[0].projectMaterial.imgs[index].type === 0
                return bool ? this.listData[0].projectMaterial.imgs[index].largeUrl : '/' + this.listData[0].projectMaterial.videoImg[0].largeUrl
            },
            /**
             * 获取动态路由ID
             */
            getProjectId () {
                this.projectId = this.$route.params.id
            },
            /**
             * tabs点击切换锚点
             * @param activeKey tabs 当前下标
             */
            changeTabs (activeKey) {
                this.activeKey = activeKey
                if (activeKey === '3') {
                    this.isFiles = true
                } else {
                    this.isFiles = false
                }
            },
            /**
             *  查询购买详情
             */
            initInfo () {
                let data = {
                    traceId: tool.UUID(),
                    data: {
                        projectId: this.projectId
                    }
                }
                axios.post('/pto/detail/get', data).then((res) => {
                    if (res.data.code.toString() === '0' && res.data.data) {
                        this.listData = [res.data.data]
                        this.initBreadcrumb()
                        // 设置倒计时
                        this.getCountDown()
                        // 初始化表头
                        this.tableColumbsI18n(res)
                        // 页面标题国际化
                        if (this.globalarr.indexOf(res.data.data.projectMaterial.name) === -1) {
                            this.globalarr.push(res.data.data.projectMaterial.name)
                            document.title = tool.intervariable(this.$t('PageTitle.passpurdetail_pagetitle'), this.globalarr)
                        }
                        // 合并图片和视频、图片地址添加根路径,  安卓不显示视频
                        if (this.showVideo) {
                            this.listData[0].projectMaterial.imgs = this.listData[0].projectMaterial.video.concat(this.listData[0].projectMaterial.imgs).map((item) => {
                                return {...item, largeUrl: '/' + item.largeUrl, fileUrl: '/' + item.fileUrl}
                            })
                        } else {
                            this.listData[0].projectMaterial.imgs = this.listData[0].projectMaterial.imgs.map((item) => {
                                return {...item, largeUrl: '/' + item.largeUrl, fileUrl: '/' + item.fileUrl}
                            })
                        }
                        // 设置登录状态
                        this.$nextTick(() => {
                            Cookie.get('refresh_token') ? this.isLogin = true : this.isLogin = false
                        })
                        this.projectMaterialImgs = this.listData[0].projectMaterial.imgs.length
                        // 项目标签处理成数组
                        this.listData[0].projectMaterial.projectLabel = this.listData[0].projectMaterial.projectLabel ? this.listData[0].projectMaterial.projectLabel.split(',') : ''
                        // 状态国际化
                        this.listData[0].projectBase = {
                            ...this.listData[0].projectBase,
                            i18nState: this.issueState(this.listData[0].projectBase.issueState)
                        }
                        // 交易规则动态变量
                        this.certificatePurchase_investment_statement_info3 = tool.intervariable(this.$t('CertificatePurchase.certificatePurchase_investment_statement_info3'), [this.listData[0].projectDist.curCode, this.listData[0].projectDist.curCode])
                        this.certificatePurchase_rule_buy_offtake_info2 = tool.intervariable(this.$t('CertificatePurchase.certificatePurchase_rule_buy_offtake_info2'), [this.listData[0].projectDistSetting.userMinAmount, this.listData[0].projectDistSetting.userMaxAmount])
                        this.certificatePurchase_rule_buy_offtake_info3 = tool.intervariable(this.$t('CertificatePurchase.certificatePurchase_rule_buy_offtake_info3'), [this.listData[0].projectDist.curCode, this.listData[0].projectDist.curCode])
                        // 合并项目文件
                        this.forData(res.data.data)
                        // 是否售罄
                        res.data.data.projectBase.saleRatio === 100 ? this.showSalesIcon = true : this.showSalesIcon = false
                        this.loading = false
                        this.shareLoaded()
                    } else {
                        this.$message.error(this.$t(`code.${res.data.code.toString()}`))
                    }
                })
                    .catch(err => {
                        this.$message.error(this.$t(err.message))
                    })
            },
            /**
             *  获取详情数据用于处理分享
             */
            getInfo () {
                if (this.globalarr.indexOf(this.serverData.projectMaterial.name) === -1) {
                    this.globalarr.push(this.serverData.projectMaterial.name)
                    this.pageTitle = tool.intervariable(this.$t('PageTitle.passpurdetail_pagetitle'), this.globalarr)
                }
                this.listData = [this.serverData]
                this.listData[0].projectMaterial.imgs = this.listData[0].projectMaterial.imgs.map((item) => {
                    return {...item, largeUrl: '/' + item.largeUrl, fileUrl: '/' + item.fileUrl}
                })
                this.pageImg = this.listData[0].projectMaterial.imgs[0].largeUrl
            },
            /**
             *  获取项目公示信息
             */
            getPublicInfor () {
                let params = {
                    traceId: tool.UUID(),
                    data: {
                        projectId: this.projectId
                    }
                }
                axios.post('/pto/project/publicity/get', params)
                    .then(res => {
                        if (res.data.code.toString() === '0') {
                            if (res.data.data) {
                                let r = res.data.data.publicContent.replace(/\s*/g, '')
                                r = r.replace(/<p><\/p>/g, '')
                                if (r.length !== 0) {
                                    this.showPublicInfo = true
                                }
                                this.publicInfo = res.data.data.publicContent
                            }
                        } else {
                            this.$message.error(this.$t(`code.${res.data.code.toString()}`))
                        }
                    })
                    .catch(err => {
                        this.$message.error(this.$t(err.message))
                    })
            },
            /**
             *  国际化表头
             *  @param res 通证详情数据
             */
            tableColumbsI18n (res) {
                this.columns = [
                    {title: 'UID', dataIndex: 'userCode', key: 'userCode'},
                    {
                        title: this.$t('CertificatePurchase.certificatePurchase_available'),
                        dataIndex: 'ptTotalAmount',
                        key: 'ptTotalAmount',
                        scopedSlots: {customRender: 'ptTotalAmount'}
                    },
                    {
                        title: `${this.$t('CertificatePurchase.certificatePurchase_investment_quantity')} (${res.data.data.projectDist.curCode})`,
                        dataIndex: 'curAmount',
                        key: 'curAmount',
                        scopedSlots: {customRender: 'curAmount'}
                    },
                    {
                        title: this.$t('CertificatePurchase.certificatePurchase_buy_time'),
                        dataIndex: 'saleTime',
                        key: 'saleTime',
                        scopedSlots: {customRender: 'saleTime'}
                    }
                ]
            },
            /**
             *  遍历数据
             *  @param data 通证详情数据
             */
            forData (data) {
                this.files.licenseImg = this.reErection(data.projectIssuer.licenseImg)
                this.files.houseCertificateImg = this.reErection(data.projectMaterial.houseCertificateImg)
                this.files.eiaImg = this.reErection(data.projectMaterial.eiaImg)
                this.files.buildingPermitsImg = this.reErection(data.projectMaterial.buildingPermitsImg)
                this.files.landCertificateImg = this.reErection(data.projectMaterial.landCertificateImg)
                this.files.landContractImg = this.reErection(data.projectMaterial.landContractImg)
                this.files.landMasterImg = this.reErection(data.projectMaterial.landMasterImg)
                this.files.installmentImg = this.reErection(data.projectMaterial.installmentImg)
                this.files.lawFirmSurveyImg = this.reErection(data.projectExamine.lawFirmSurveyImg)
                this.files.intermediarySurveyImg = this.reErection(data.projectExamine.intermediarySurveyImg)
                this.files.propertyCertificateImg = this.reErection(data.projectMaterial.propertyCertificateImg)
                this.files.agreementImg = this.reErection(data.projectExamine.agreementImg)
                this.files.otherFile = this.reErection(data.projectExamine.otherFile)
            },
            /**
             * 组装数据
             * @param items 文件对象
             */
            reErection (items) {
                let files = []
                if (items.length !== 0) {
                    files = items.map((item, index) => {
                        let file = {}
                        file.name = item.name
                        // 判断图片还是文件
                        if (item.type === 0) {
                            file.fileUrl = item.largeUrl
                        } else {
                            file.fileUrl = item.fileUrl
                        }
                        return file
                    })
                }
                return files
            },
            /**
             * 状态添加国际化
             * @param val 状态码
             */
            issueState (val) {
                let state
                //  0创建、1未发行、2等待预售、3开始预售、4预售完成、5预售失败、6已发行、7已取消
                switch (val) {
                case 0 :
                    state = this.$t('CertificatePurchase.certificatePurchase_status_found')
                    break
                case 1 :
                    state = this.$t('CertificatePurchase.certificatePurchase_status_unissued')
                    break
                case 2 :
                    state = this.$t('CertificatePurchase.certificatePurchase_status_wait')
                    break
                case 3 :
                    state = this.$t('CertificatePurchase.certificatePurchase_status_start')
                    break
                case 4 :
                    state = this.$t('CertificatePurchase.certificatePurchase_status_completed')
                    break
                case 5 :
                    state = this.$t('CertificatePurchase.certificatePurchase_status_failure')
                    break
                case 6 :
                    state = this.$t('CertificatePurchase.certificatePurchase_status_issued')
                    break
                default:
                    state = this.$t('CertificatePurchase.certificatePurchase_status_canceled')
                }
                return state
            },
            /**
             * 跳转认购订单
             */
            buyPto () {
                window.location.href = `/CertificatePurchase/SubscribeImmediately/${this.projectId}`
            },
            // 获取kyc认证信息
            checkKycStatus () {
                let data = {traceId: tool.UUID()}
                axios.post('/dc/user/kyc/query/user', data)
                    .then(res => {
                        if (res.data.code.toString() === '0') {
                            if (!res.data.data || res.data.data.auditState !== 2) {
                                // 移动端类型
                                let clientType = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                                let flag = navigator.userAgent.match(clientType)
                                if (flag) {
                                    window.location.href = '/mobile/user/UserCenter/AuthenticationKYC'
                                } else {
                                    window.location.href = '/computer/user/UserCenter?getKey=6'
                                }
                            } else {
                                this.investBalanceQquery()
                            }
                        } else {
                            this.$message.error(this.$t(`code.${res.data.code.toString()}`))
                        }
                    })
            },
            /**
             * 用户余额查询
             * 余额检查如果不够提示将不再跳转支付页面
             */
            investBalanceQquery () {
                this.flag = true
                let data = {
                    traceId: tool.UUID(),
                    data: {
                        projectId: this.projectId
                    }
                }
                axios.post('/pto/invest/balance/query', data)
                    .then(res => {
                        if (res.data.code.toString() === '0') {
                            this.buyPto()
                        } else {
                            this.flag = false
                            if (res.data.code.toString() === '3059') {
                                this.errorMsg = res.data.msg
                                this.$message.error(tool.intervariable(this.$t(`code.${res.data.code.toString()}`), [this.errorMsg]))
                            } else {
                                this.$message.error(this.$t(`code.${res.data.code.toString()}`))
                            }
                        }
                    })
                    .catch(err => {
                        this.flag = false
                        this.$message.error(this.$t(err.message))
                    })
            },
            /**
             * 用户购买历史
             */
            buyHistory () {
                let pageData = {
                    traceId: tool.UUID(),
                    data: {
                        pageNum: this.current,
                        pageSize: this.pageSize,
                        filter: {
                            projectId: this.projectId
                        }
                    }
                }
                axios.post('/pto/invest/project/list', pageData)
                    .then(res => {
                        if (res.data.code.toString() === '0') {
                            this.data = res.data.data.list
                            this.pagination.total = res.data.data.total
                        } else {
                            this.$message.error(this.$t(`code.${res.data.code.toString()}`))
                        }
                    })
                    .catch(err => {
                        this.$message.error(this.$t(err.message))
                    })
            },
            // 开启右侧抽屉导航
            openDrawer () {
                this.drawer = {'drawer-containel-left': true, 'drawer-containel-right': false}
            },
            // 关闭右侧抽屉导航
            closeDrawer () {
                this.drawer = {'drawer-containel-left': false, 'drawer-containel-right': true}
                setTimeout(() => {
                    this.drawer = {'drawer-containel-left': false, 'drawer-containel-right': false}
                }, 200)
            },
            // 加载分享
            loadScript (url) {
                let _this = this
                let script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = url
                document.getElementsByTagName('head')[0].appendChild(script)
                if (script.readyState) { // IE
                    script.onreadystatechange = function () {
                        if (script.readyState === 'loaded' || script.readyState === 'complete') {
                            script.onreadystatechange = null
                            _this.shareLoaded()
                        }
                    }
                } else {
                    // FF, Chrome, Opera, ...
                    script.onload = function () {
                        _this.shareLoaded()
                    }
                }
            },
            shareLoaded () {
                if (this.pageUrl === '') {
                    let data = {
                        traceId: tool.UUID(),
                        data: window.location.href
                    }
                    axios.post(window.location.protocol + '//' + window.location.host + '/tools/short_url/get', data).then((res) => {
                        if (res.data.code.toString() === '0') {
                            this.pageUrl = window.location.protocol + '//' + window.location.host + res.data.data
                        }
                    })
                }
                if (this.$route.params.title) {
                    setTimeout(() => {
                        try {
                            window.addthis.layers.refresh()
                        } catch (e) {}
                    }, 2000)
                }
            }
        },
        filters: {
            // 时间格式化
            parseTime,
            // 坐标地址格式化
            toRegionsName,
            // 数字优化
            formatNumber
        },
        beforeDestroy () {
            window.clearInterval(this.Interval)
            Bus.$off('checkLange')
        },
        components: {
            FsHead,
            fonter,
            FilesDown,
            Breadcrumb,
            PtoProgress,
            ProjectList
        },
        head () {
            return {
                title: this.pageTitle,
                meta: [
                    { hid: 'url', property: 'og:url', content: this.pageUrl },
                    { hid: 'pageTitle', property: 'og:title', content: this.pageTitle },
                    { hid: 'pageImg', property: 'og:image', content: this.pageImg }
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../assets/styles/variable.less";

    .section {
        background: #FFFFFF;

        .container {
            margin: 0 auto;
            width: @max-width;

            .content {
                padding: 0 !important;

                .time-temaining {
                    height: 120px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    font-size: 25px;
                    font-weight: 400;

                    .time-title {
                        color: #3a3a3a;
                    }

                    .time-value {
                        width: 440px;
                        color: #D62839;
                        display: flex;
                        justify-content: space-between;

                        .Days {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }

                .pto-list {
                    .skeleton {
                        .total-price-col {
                            display: flex;
                            align-items: center;

                            .total-price {
                                padding-left: 10px;
                                display: flex;
                                flex-direction: column;
                                color: #3a3a3a;

                                .item-title {
                                    font-size: 14px;
                                    line-height: 24px;
                                }

                                .item-value {
                                    line-height: 35px;
                                    font-size: 22px;
                                    font-weight: 700;
                                }
                            }
                        }

                        .title {
                            display: inline-block;
                            font-size: 30px;
                            color: #333333;
                        }

                        .info-tag {
                            margin-top: 30px;
                            height: auto;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            flex-wrap: wrap;
                            .pt-tag {
                                min-width: 174px;
                                border-radius: 0;
                                height: 34px;
                                line-height: 34px;
                                font-size: 12px;
                                color: #fff;
                                text-align: center;
                                border: 0;
                                margin-bottom: 8px;
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
                            .pt-tag-more {
                                display: none;
                            }
                        }

                        .list-body {
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            position: relative;


                            .total-imgs-mobile {
                                display: none;
                            }

                            .fangsea-img {
                                overflow: hidden;
                                width: 1000px;
                                height: 926px;
                                padding-top: 30px;

                                .img-info {
                                    position: relative;
                                }

                                .total-imgs {
                                    z-index: 1000;
                                    width: 80px;
                                    height: 64px;
                                    background: #ff4500;
                                    position: absolute;
                                    right: 0;
                                    bottom: 29px;
                                    opacity: 0;
                                }

                                .video {
                                    width: auto;
                                    max-width: 1000px;
                                    height: 706px;
                                    border-radius: 0;
                                    object-fit: scale-down;
                                }

                                .customPaging-a {
                                    display: block !important;
                                }

                                .projectMaterial-imgs-left {
                                    cursor: pointer;
                                    left: 0px;
                                    top: 747px;
                                    zIndex: 9999;

                                    .left-div {
                                        width: 30px;
                                        height: 140px;
                                        background: rgba(0, 0, 0, 1);
                                        border-radius: 8px 0px 0px 8px;
                                        opacity: 0.5004;
                                        padding-top: 52px;
                                    }
                                }

                                .projectMaterial-imgs-right {
                                    cursor: pointer;
                                    right: 0px;
                                    top: 747px;
                                    zIndex: 9999;

                                    .right-div {
                                        padding-top: 52px;
                                        width: 30px;
                                        height: 140px;
                                        background: rgba(0, 0, 0, 1);
                                        border-radius: 0px 8px 8px 0px;
                                        opacity: 0.5004;
                                    }
                                }
                            }
                        }

                        .info-address {
                            margin-top: 14px;
                            font-size: 20px;

                            span:first-child {
                                vertical-align: middle;
                            }
                        }
                    }
                }

                .title-info-width {
                    width: 100%;

                    .files-contair {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                    }
                }

                .tabs-contair {
                    margin-top: 27px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .body-info-contair {
                        padding: 20px 15px;
                        border: 1px solid #e5e5e5;
                        border-radius: 4px;
                        height: 300px;
                        width: 820px;

                        .body-info {

                            .body-info-row {
                                margin-top: 6px;
                            }

                            .info-item {

                                .item-title {
                                    line-height: 20px;
                                    font-size: 14px;
                                    color: rgba(153, 153, 153, 1);
                                }

                                .item-value {
                                    line-height: 30px;
                                    font-size: 14px;
                                    color: rgba(51, 51, 51, 1);
                                }

                                .red-value {
                                    letter-spacing: 1px;
                                    font-size: 16px;
                                    color: rgba(34, 34, 34, 1);
                                    line-height: 16px;
                                }
                            }

                            .broadwise-item-contair {
                                width: 100%;

                                .projectDist-ptCurCode {
                                    color: #2EA9DF !important;
                                }

                                .broadwise-item {
                                    display: flex;
                                    flex-direction: row;
                                    width: 100%;
                                    justify-content: space-between;
                                    font-size: 14px;
                                    line-height: 28px;

                                    .item-title {
                                        color: rgba(153, 153, 153, 1);
                                    }

                                    .item-value {
                                        color: rgba(51, 51, 51, 1);
                                    }
                                }
                            }

                            .second-item {
                                margin-top: -30px;
                            }
                        }

                        .addthis_inline_share_toolbox_ygq6{
                            margin-top: 48px;
                        }

                        .body-info-contair-link {
                            width: 110px;
                            display: flex;
                            justify-content: space-between;
                            margin-top: 48px;

                            svg {
                                cursor: pointer;
                            }
                        }
                    }

                    .info-progress {
                        width: 100%;
                        margin: 10px 0;
                    }

                    .fixed-div {
                        background-color: #ffffff;
                        z-index: 1000;
                        width: 368px;
                        height: auto;
                        border-radius: 8px;
                        border: 1px solid rgba(217, 217, 217, 1);
                        padding: 16px;

                        .title {
                            font-size: 20px;
                            color: #3a3a3a;
                            font-weight: 400;
                            line-height: 28px;
                        }

                        .body {
                            margin: 30px 0 24px 0;
                            font-size: 15px;
                            font-weight: 400;
                            color: #3a3a3a;

                            .item {
                                display: flex;

                                .item-key {
                                    display: inline-block;
                                }

                                .item-value {
                                    display: inline-flex;
                                    word-break: break-word;
                                    flex: 1;
                                }
                            }
                        }

                        .now-buy {
                            color: #ffffff;
                            border-radius: 0;
                            width: 100%;
                            height: 40px;
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 28px;
                        }

                        .now-buy-normal {
                            background-color: #D62839;
                            border-color: #D62839;
                        }
                    }
                }

                /deep/ .ant-tabs-bar {
                    margin: 0;
                    background-color: #F6F6F6;
                    border-bottom: 1px solid #3A3A3A;
                    padding-left: 15px;

                    .ant-tabs-tab {
                        padding: 13px 0 13px 0;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 400;
                        color: #3a3a3a;
                        font-family: 'offside' !important;
                    }

                    .ant-tabs-ink-bar {
                        top: 0;
                        height: 6px;
                        background-color: #0274BE;
                    }

                    .ant-tabs-tab-active {
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 400;
                        color: #3a3a3a;
                    }
                }

                .title-info {
                    margin: 24px 0 0 15px;
                    font-size: 15px;
                    font-weight: 400;
                    color: #3a3a3a;

                    .property-title {
                        margin-top: 30px;
                    }

                    .rule-body-title {
                        margin-bottom: 4px;
                    }

                    .rule-body-title-top {
                        margin-top: 20px;
                    }

                    .rule-body-info {
                        margin-left: 30px;
                    }

                    .rule-body {
                        color: #333333;
                        opacity: 0.8;
                        display: -webkit-box;
                        font-weight: 400;
                        margin-bottom: 5px;
                    }

                    .theme-img {
                        display: flex;
                        flex-direction: column;

                        .img-item {
                            margin-top: 30px;
                            width: 800px;
                            height: 300px;
                            border-radius: 8px;
                        }

                        .projectMaterial-introduce {
                            max-width: 800px;
                            margin: 0 auto;

                            /deep/ img {
                                width: 100% !important;
                            }
                            /deep/ table p {
                                margin-bottom: 0 !important;
                            }
                        }
                    }
                }

                .rule-business {
                    margin-left: 25px;

                    .projectIssuer-issuerName {
                        display: inline-flex;
                        word-break: break-word;
                        flex: 1;
                    }

                    .projectMaterial-propertyRight {
                        display: inline-flex;
                        flex: 1;
                    }

                    .item-col {
                        display: flex;
                    }
                }

                .information-table {
                    width: 1020px;
                    margin: 82px auto !important;

                    /deep/ .ant-pagination {
                        width: 100%;
                        margin-top: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }

                .shadowDown-parent {
                    position: relative;
                    display: table;

                    /deep/ .ant-table-thead > tr > th {
                        background: #E0E0E0;
                    }

                    /deep/ .ant-table-bordered .ant-table-thead > tr > th, /deep/ .ant-table-bordered .ant-table-tbody > tr > td {
                        border: 1px solid #000000;
                    }

                    .shadowDown {
                        left: 0;
                        top: 0;
                        position: absolute;
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 1px;
                        z-index: 200;
                        height: 100%;
                        width: 100%;
                        font-size: 18px;
                        color: rgba(255, 255, 255, 1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 30px;
                        word-break: break-all;

                        div {
                            a {
                                text-decoration: underline;
                                color: rgba(255, 255, 255, 1);
                            }
                        }
                    }
                }

                .project-list-box {
                    width: @max-width;
                    margin: 40px auto 60px;

                    .project-list-box-title {
                        text-align: center;
                        height: 120px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #007ac1;
                        font-size: 25px;
                        font-weight: 400;
                    }

                    .project-list {
                        width: 1200px;
                        margin: 0 auto;
                    }
                }
            }
        }
    }

    .mg-bm-8 {
        margin-bottom: 8px;
    }

    /* For  carousel*/
    .ant-carousel .slick-prev:before {
        content: '';
    }

    .ant-carousel .slick-next:before {
        content: '';
    }

    .ant-carousel /deep/ .slick-slide {
        text-align: center;
        overflow: hidden;
        height: 706px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ant-carousel /deep/ .custom-slick-arrow {
        width: 30px;
        height: 140px;
        font-size: 25px;
        color: #fff;
        background-color: rgba(31, 45, 61, 0.11);
        opacity: 0.3;
        z-index: 999;
    }

    .ant-carousel /deep/ .custom-slick-arrow:before {
        // display: none;
    }

    .ant-carousel /deep/ .custom-slick-arrow:hover {
        opacity: 0.5;
    }

    .ant-carousel /deep/ .slick-slide h3 {
        color: #fff;
    }

    .ant-carousel /deep/ .slick-dots {
        text-align: left;
        height: auto
    }

    .ant-carousel /deep/ .slick-slide img {
        display: block;
        width: auto;
        height: auto;
        max-height: 706px;
        max-width: 1000px;
    }

    .ant-carousel /deep/ .slick-thumb {
        text-align: center;
        width: 100%;
        display: block;
        white-space: nowrap;
        height: 140px;
        bottom: -165px;
    }

    .ant-carousel /deep/ .slick-thumb li {
        display: inline-block; //使li对象显示为一行
        width: 140px;
        height: 140px;
        margin: 0 10px 0 0;
    }

    .ant-carousel /deep/ .slick-thumb li img {
        width: 140px;
        height: 140px;
        object-fit: cover;
        filter: grayscale(100%);
    }

    .ant-carousel /deep/ .slick-thumb li.slick-active img {
        filter: grayscale(0%);
    }

    .ant-divider-horizontal {
        margin: 0;
    }

    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }

    .ant-list-item {
        padding: 0;
    }

    @media screen and (max-width: @max-width) {
        .section {
            background: #FFFFFF;

            .container {
                margin: 0 auto;
                width: 100%;

                .content {
                    padding: 0 !important;

                    .tabs-style {
                        padding-top: 0.4rem !important;
                    }

                    .time-temaining {
                        height: 120px;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        font-size: 20px;
                        font-weight: 400;

                        .time-title {
                            color: #3a3a3a;
                        }

                        .time-value {
                            max-width: 4.4rem;
                            width: 90%;
                            color: #D62839;
                            display: flex;
                            justify-content: space-between;

                            .Days {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                    }

                    .pto-list {
                        height: auto;

                        .skeleton {
                            height: auto;

                            .projectMaterial-name {
                                padding: 0 30px;
                            }

                            .total-price-col {
                                width: 100%;
                                margin: 45px 0 0 30px;

                                .total-price {
                                    padding-left: 0;
                                    display: flex;
                                    flex-direction: column;
                                    color: #3a3a3a;

                                    .item-title {
                                        font-size: 14px;
                                        line-height: 24px;
                                    }

                                    .item-value {
                                        line-height: 35px;
                                        font-size: 22px;
                                        font-weight: 700;
                                    }
                                }
                            }

                            .title {
                                display: inline-block;
                                font-size: 30px;
                                color: #333333;
                            }

                            .ant-row-flex {
                                > div:nth-child(1) {
                                    width: 100%;
                                }
                            }

                            .info-tag {
                                margin-top: 0.3rem;
                                height: 0.2rem;
                                padding: 0 0.46rem 0 0.3rem;
                                overflow: hidden;
                                position: relative;
                                .pt-tag {
                                    min-width: 0.7rem;
                                    height: 0.2rem;
                                    line-height: 0.2rem;
                                }
                                .pt-tag-more {
                                    position: absolute;
                                    right: 0.3rem;
                                    top: 0.03rem;
                                    display: block;
                                    margin-right: 0;
                                    width: 0.16rem;
                                    text-align: center;
                                    color: #999;
                                }
                            }
                            .info-tag-more {
                                height: auto;
                            }

                            .list-body {
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                position: relative;

                                .total-imgs {
                                    z-index: 1000;
                                    width: 50px;
                                    height: 50px;
                                    background: #ff4500;
                                    position: absolute;
                                    right: 30px;
                                    bottom: 57px;
                                    opacity: 0;
                                }

                                .total-imgs-mobile {
                                    display: block;
                                    color: #ffffff;
                                    z-index: 1001;
                                    width: 0.5rem;
                                    height: 0.3rem;
                                    background:rgba(0,0,0,0.5);
                                    border-radius: 8px;
                                    position: absolute;
                                    right: 0.3rem;
                                    top: 2.05rem;
                                    line-height: 30px;
                                    text-align: center;
                                }

                                .fangsea-img {
                                    overflow: hidden;
                                    width: 100%;
                                    height: 3rem;
                                    padding: 30px;

                                    .video {
                                        object-fit: fill;
                                        width: 3.36rem;
                                        height: 2.37rem;
                                        border-radius: 0px;
                                    }

                                    .customPaging-a {
                                        display: block !important;
                                    }

                                    .projectMaterial-imgs-left {
                                        cursor: pointer;
                                        zIndex: 9999;
                                        left: 0;
                                        top: 50%;
                                        margin-top: -40px;

                                        .left-div {
                                            padding-top: 0.26rem;
                                            width: 0.3rem;
                                            height: 0.75rem;
                                            background: rgba(0, 0, 0, 1);
                                            border-radius: 4px 0px 0px 4px;
                                            opacity: 0.5004;
                                        }
                                    }

                                    .projectMaterial-imgs-right {
                                        cursor: pointer;
                                        right: 0;
                                        top: 50%;
                                        margin-top: -40px;
                                        zIndex: 9999;

                                        .right-div {
                                            padding-top: 0.26rem;
                                            width: 0.3rem;
                                            height: 0.75rem;
                                            background: rgba(0, 0, 0, 1);
                                            border-radius: 0px 4px 4px 0px;
                                            opacity: 0.5004;
                                        }
                                    }
                                }
                            }

                            .info-address {
                                margin-top: 14px;
                                font-size: 20px;

                                span:first-child {
                                    vertical-align: middle;
                                }
                            }
                        }
                    }

                    .title-info-width {
                        width: 100%;

                        .files-contair {
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                        }
                    }

                    .tabs-contair {
                        margin-top: 27px;
                        display: flex;
                        flex-direction: column;

                        .body-info-contair {
                            padding: 25px 20px !important;
                            border-top: 10px solid #F6F6F6 !important;
                            border-bottom: 10px solid #F6F6F6 !important;
                            height: 5.2rem !important;
                            width: 100% !important;

                            .body-info {

                                .flex-info-col {
                                    margin-bottom: 10px;
                                }

                                .body-info-row {
                                    margin-top: 6px;
                                }

                                .info-item {

                                    .item-title {
                                        line-height: 20px;
                                        font-size: 14px;
                                        color: rgba(153, 153, 153, 1);
                                    }

                                    .item-value {
                                        line-height: 30px;
                                        font-size: 14px;
                                        color: rgba(51, 51, 51, 1);
                                    }

                                    .red-value {
                                        letter-spacing: 1px;
                                        font-size: 16px;
                                        color: rgba(34, 34, 34, 1);
                                        line-height: 16px;
                                    }
                                }

                                .broadwise-item-contair {
                                    width: 100%;

                                    .projectDist-ptCurCode {
                                        color: #2EA9DF !important;
                                    }

                                    .broadwise-item {
                                        display: flex;
                                        flex-direction: row;
                                        width: 100%;
                                        justify-content: space-between;
                                        font-size: 14px;
                                        line-height: 28px;

                                        .item-title {
                                            color: rgba(153, 153, 153, 1);
                                        }

                                        .item-value {
                                            color: rgba(51, 51, 51, 1);
                                        }
                                    }
                                }

                                .second-item {
                                    margin-top: -30px;
                                }
                            }

                            .body-info-contair-link {
                                width: 110px;
                                display: flex;
                                justify-content: space-between;
                                margin-top: 0.4rem;

                                svg {
                                    cursor: pointer;
                                }
                            }
                        }

                        .info-progress {
                            width: 100%;
                            margin: 10px 0;
                        }

                        .fixed-div {
                            display: block;
                            background-color: #ffffff;
                            z-index: 1000;
                            width: 100%;
                            height: auto;
                            padding: 16px;
                            border: none;

                            .title {
                                font-size: 20px;
                                color: #3a3a3a;
                                font-weight: 400;
                                line-height: 28px;
                            }

                            .body {
                                margin: 30px 0 24px 0;
                                font-size: 15px;
                                font-weight: 400;
                                color: #3a3a3a;

                                .item {
                                    display: flex;

                                    .item-key {
                                        display: inline-block;
                                    }

                                    .item-value {
                                        display: inline-flex;
                                        word-break: break-word;
                                        flex: 1;
                                    }
                                }
                            }

                            .now-buy {
                                color: #ffffff;
                                border-radius: 0;
                                width: 100%;
                                height: 40px;
                                font-weight: 400;
                                font-size: 16px;
                                line-height: 28px;
                            }

                            .now-buy-normal {
                                background-color: #D62839;
                                border-color: #D62839;
                            }
                        }
                    }

                    /deep/ .ant-tabs-bar {
                        margin: 0;
                        background-color: #F6F6F6;
                        border-bottom: 1px solid #3A3A3A;
                        padding-left: 15px;

                        .ant-tabs-tab {
                            padding: 13px 0 13px 0;
                            font-size: 18px;
                            font-style: normal;
                            font-weight: 400;
                            color: #3a3a3a;
                            margin-right: 0.2rem !important;
                            font-family: 'offside' !important;
                        }

                        .ant-tabs-ink-bar {
                            top: 0;
                            height: 6px;
                            background-color: #0274BE;
                        }

                        .ant-tabs-tab-active {
                            font-size: 18px;
                            font-style: normal;
                            font-weight: 400;
                            color: #3a3a3a;
                        }
                    }

                    .title-info {
                        margin: 0;
                        padding: 20px 20px 0 20px;
                        font-size: 15px;
                        font-weight: 400;
                        color: #3a3a3a;

                        .property-title {
                            margin-top: 0px;
                        }

                        .rule-body-title {
                            margin-bottom: 4px;
                        }

                        .rule-body-title-top {
                            margin-top: 20px;
                        }

                        .rule-body-info {
                            padding-left: 30px;
                            margin: 0;
                        }

                        .rule-body {
                            color: #333333;
                            opacity: 0.8;
                            display: -webkit-box;
                            font-weight: 400;
                            margin-bottom: 5px;
                        }

                        .theme-img {
                            display: flex;
                            flex-direction: column;

                            .img-item {
                                margin-top: 30px;
                                width: 100%;
                                height: 300px;
                                border-radius: 8px;
                            }

                            .projectMaterial-introduce {
                                max-width: 100%;
                                margin: 0 auto;

                                /deep/ img {
                                    width: 100% !important;
                                }
                                /deep/ table p {
                                    margin-bottom: 0 !important;
                                }
                            }
                        }
                    }

                    .rule-business {
                        margin-left: 0;

                        .projectIssuer-issuerName {
                            display: inline-flex;
                            word-break: break-word;
                            flex: 1;
                        }

                        .projectMaterial-propertyRight {
                            display: inline-flex;
                            flex: 1;
                        }

                        .item-col {
                            display: flex;
                        }
                    }

                    .information-table {
                        width: 100%;
                        margin: 0 !important;
                        padding: 20px 20px 0 20px;

                        /deep/ .ant-pagination {
                            width: 100%;
                            margin-top: 50px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }

                    .shadowDown-parent {
                        position: relative;
                        display: table;

                        /deep/ .ant-table-thead > tr > th {
                            background: #E0E0E0;
                        }

                        /deep/ .ant-table-bordered .ant-table-thead > tr > th, /deep/ .ant-table-bordered .ant-table-tbody > tr > td {
                            border: 1px solid #000000;
                        }

                        .shadowDown {
                            left: 0;
                            top: 0;
                            position: absolute;
                            background: rgba(0, 0, 0, 0.3);
                            border-radius: 1px;
                            z-index: 200;
                            height: 100%;
                            width: 100%;
                            font-size: 20px;
                            color: rgba(255, 255, 255, 1);
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            div {
                                a {
                                    text-decoration: underline;
                                    color: rgba(255, 255, 255, 1);
                                }
                            }
                        }
                    }

                    .project-list-box {
                        width: 100%;
                        margin: 0.2rem auto 0.6rem;

                        .project-list-box-title {
                            text-align: center;
                            height: 120px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #007ac1;
                            font-size: 25px;
                            font-weight: 400;
                        }

                        .project-list {
                            width: 100%;
                        }
                    }
                }
            }
        }

        .ant-carousel /deep/ .slick-slide {
            text-align: center;
            overflow: hidden;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 237px;
        }

        .ant-carousel /deep/ .slick-slide img {
            display: block;
            width: 3.15rem;
            height: auto;
        }

        .ant-carousel /deep/ .slick-thumb {
            display: none !important;
        }

        .ant-carousel /deep/ .custom-slick-arrow {
            width: 0.3rem;
            height: 0.75rem;
            font-size: 25px;
            color: #fff;
            background-color: rgba(31, 45, 61, 0.11);
            opacity: 0.3;
            z-index: 999;
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
