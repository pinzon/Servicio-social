import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: layout,
      children: [{
        path: '/buttons',
        component: require('../views/buttons.vue').default
      },
      {
        path: '/typography',
        component: require('../views/typography.vue').default
      },
      {
        path: '/panel',
        component: require('../views/panel.vue').default
      },
      {
        path: '/test',
        component: require('../views/test.vue').default
      },
      {
        path: '/dynamicForm',
        component: require('../views/form.vue').default
      },
      {
        path: '/staticForm',
        component: require('../views/staticForm.vue').default
      },
      {
        path: '/profesorView',
        component: require('../views/profesor.vue').default
      },
      {
        path: '/segmentarView',
        component: require('../views/segmentar.vue').default
      },
      {
        path: '/studentView',
        component: require('../views/student.vue').default
      },
      {
        path: '/asistantView',
        component: require('../views/asistente.vue').default
      }]
    }
  ]
})
