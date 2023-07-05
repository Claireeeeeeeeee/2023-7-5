import Vue from 'vue';
import Router from 'vue-router';
import * as path from "path";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/rank',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/rank.vue'),
                    meta: { title: '碳减排排名' }
                },

                {
                    path: '/info',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/info.vue'),
                    meta: { title: '企业信息查询' },
                    // children:[{
                    //     path:'/company',
                    //     component:()=>import("../components/page/company.vue")
                    // }
                    //
                    // ]
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/income_manage',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/income_manage.vue'),
                    meta: { title: '定价调整'}
                },                {
                    path: '/income',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/income.vue'),
                    meta: { title: '收益汇总' }
                },
                {
                    path:'/company',
                    component:()=>import("../components/page/company.vue"),
                    meta: { title:'记录'}},
                // {
                //     path: '/company',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                //     meta: { title: '基础表格' }
                // },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: '企业认证审核' }
                },
                {
                    path: '/pic',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/pic.vue'),
                    meta: { title: '轮播图管理' }
                },

                // {
                //     path: '/company',
                //     component: () => import(/* webpackChunkName: "tabs" */ '../components/page/company.vue'),
                //     meta: { title: 'tab选项卡' }
                // },
                // {
                //     path: '/form',
                //     component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                //     meta: { title: '基本表单' }
                // },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '新闻管理' }
                },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                //     meta: { title: 'markdown编辑器' }
                // },
                // {
                //     // 图片上传组件
                //     path: '/upload',
                //     component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                //     meta: { title: '文件上传' }
                // },
                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                //     meta: { title: '拖拽列表' }
                // },
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                //     meta: { title: '拖拽弹框' }
                // },
                // {
                //     // 国际化组件
                //     path: '/i18n',
                //     component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                //     meta: { title: '国际化' }
                // },
                // {
                //     // 权限页面
                //     path: '/permission',
                //     component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                //     meta: { title: '权限测试', permission: true }
                // },
                // {
                //     path: '/404',
                //     component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                //     meta: { title: '404' }
                // },
                // {
                //     path: '/403',
                //     component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                //     meta: { title: '403' }
                // },
                // {
                //     path: '/donate',
                //     component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                //     meta: { title: '支持作者' }
                // }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
