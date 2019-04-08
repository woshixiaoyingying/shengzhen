import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import authorization from '@/common/authorization'

Vue.use(Router)

const router = new Router({
  routes,
  // mode: 'history',
  // base: '/test',     //部署到字母录
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


router.afterEach((to,from) => {

});


router.beforeEach((to, from, next) => {
  authorization.checkSessionid()
  .then(()=>{
    if (to.matched.some(record => record.meta.requiresAuth)) {
      //需要权限认证的页面  
      if(store.state.isLogin){
        // 设置最后登录时间
        authorization.setLastLoginTime()
        next()
      }else{
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }else{
      next() 
    }
  })
})

export default router
