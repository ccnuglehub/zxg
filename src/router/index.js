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
import Person from "@/components/Person"
import ProjectDetail from '@/components/ProjectDetail'
import QrCode from '@/components/QrCode'

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
      name:'projectDetail',
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
      path: '/myProject',
      name: 'myProject',
      component: Myproject
    },
    {
      path: '/person',
      name: 'person',
      component:Person
    },
    {
      path: '/qr_code',
      name: 'qr_code',
      component:QrCode
    },
    {
      path: '*',
      component:Login
    }
  ]
})
