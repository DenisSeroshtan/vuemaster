<template>
  <div>
    <h1>Список событий для {{user}}</h1>
    <event-card v-for="event in events" :key="event.id" :event="event"></event-card>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>|
    </template>
    <template v-if="fullPage >= page">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }">Next Page</router-link>
    </template>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/store'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page || 1)
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      // pass it into the component as a prop, so we can print next pages
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      // current page gets passed in as a prop
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    // Before we enter the route
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    // Before we update the route
    getPageEvents(routeTo, next)
  },
  computed: {
    ...mapState('event', ['events', 'eventsTotal']),
    user() {
      return this.$store.state.user.user.name
    },
    fullPage() {
      return Math.floor(this.eventsTotal / 3)
    }
  }
}
</script>
