import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Work from '@/components/Work'
import AddProject from '@/components/AddProject'
import WorkerDetail from '@/components/WorkerDetail'
import Newslist from '@/components/Newslist'
import NewsDetail from "@/components/NewsDetail"
import Myproject from "@/components/Myproject"
import ProjectDetail from '@/components/ProjectDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/newslist',
      name:'newslist',
      component: Newslist,
    },
    {

      path:"/newsDetail",
      name:"newsDetail",
      component:NewsDetail
      },
    {
      path:'/project_detail',
      name:'project_detail',
      component: ProjectDetail,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/work',
      name: 'work',
      component: Work
    },
    {
      path: '/add_project',
      name: 'add_project',
      component: AddProject
    },
    {
      path: '/worker_detail',
      name: 'worker_detail',
      component: WorkerDetail
    },
    {
      path: '/myproject',
      name: 'myproject',
      component: Myproject
    },
    {
      path: '*',
      component:Login
    }
  ]
})
