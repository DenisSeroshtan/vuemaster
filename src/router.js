import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventShow from './views/EventShow.vue'
import EventList from './views/EventList.vue'
import NotFound from './views/NotFound'
import NetworkIssue from './views/NetworkIssue'
import Example from './views/Example'
import store from './store/store.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({
                name: '404',
                params: { resource: 'event' }
              })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true // I added this so we can receive the param as a prop
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
      // I added this resource param here.
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '/example',
      component: Example
    }
  ],
  mode: 'history'
})
