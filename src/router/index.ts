import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const Money = () => import(/* webpackChunkName: "chunk-Money" */ '@/views/Money.vue')
const Detail = () => import(/* webpackChunkName: "chunk-Detail" */ '@/views/Detail.vue')
const Labels = () => import(/* webpackChunkName: "chunk-Labels" */ '@/views/Labels.vue')
const Statistics = () => import(/* webpackChunkName: "chunk-Statistics" */ '@/views/Statistics.vue')
const NotFound = () => import(/* webpackChunkName: "chunk-NotFound" */ '@/views/NotFound.vue')
const EditLabel = () => import(/* webpackChunkName: "chunk-EditLabel" */ '@/views/EditLabel.vue')



const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/detail/:type',
    component: Detail
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '*',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
