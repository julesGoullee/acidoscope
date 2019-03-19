import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: () => import(/* webpackChunkName: "gallery" */ './views/Gallery.vue')
    },
    {
      path: '/shader/:id',
      name: 'shader',
      component: () => import(/* webpackChunkName: "shader" */ './views/Shader.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "shader" */ './views/About.vue'),
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
});
