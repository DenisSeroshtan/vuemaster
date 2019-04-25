<template>
  <div>
    <h1>Создать событие {{this.$store.state['event/categories']}}</h1>

    <form @submit.prevent="createEvent">
      <BaseSelect v-model="event.category" label="Выберите катергорию" :options="categories"/>

      <h3>Name & describe your event</h3>
      <BaseInput
        v-model="event.title"
        label="Title"
        type="text"
        class="field"
        placeholder="Add an event title"
      />
      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
        class="field"
        placeholder="Add a description"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        label="Location"
        type="text"
        class="field"
        placeholder="Add a location"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date"/>
      </div>
      <BaseSelect class="field" v-model="event.time" label="Выберите время" :options="times"/>
      <BaseButton type="submit" activeClass="-fill-gradient">Отправить</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i < 24; i++) {
      times.push(i + ':00')
    }

    return {
      times,
      categories: this.$store.state.event.categories,
      event: this.createFreshEventObject()
    }
  },

  methods: {
    createEvent() {
      NProgress.start() // <-- Start the progress bar
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          console.log('Problems event creating')
          NProgress.done()
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 1000000)
      return {
        user,
        id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
