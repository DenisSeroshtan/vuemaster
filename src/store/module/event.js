// import Vue from 'vue'
import EventServices from '@/services/EventServices.js'

export default {
  namespaced: true,
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    event: {},
    eventsTotal: 1,
    perPage: 3
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, event) {
      state.events = event
    },
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit, dispatch, rootState }, event) {
      console.log('User creating Event is ' + rootState.user.user.name)
      //   dispatch('moduleName/actionToCall', null, { root: true })
      return EventServices.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Событие добавлено'
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(e => {
          const notification = {
            type: 'error',
            message: 'Проблема с созданием события ' + e.message
          }
          dispatch('notification/add', notification, { root: true })
          throw e
        })
    },
    fetchEvents({ commit, dispatch, state }, { page }) {
      return EventServices.getEvents(state.perPage, page)
        .then(response => {
          commit(
            'SET_EVENTS_TOTAL',
            parseInt(response.headers['x-total-count'])
          )
          commit('SET_EVENTS', response.data)
        })
        .catch(e => {
          const notification = {
            type: 'error',
            message: 'Проблема с получением событий ' + e.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    },

    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        return EventServices.getEvent(id).then(response => {
          commit('SET_EVENT', response.data)
        })
      }
    }
  }
}
