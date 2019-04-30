<template>
  <div>
    <h1>Создать событие {{this.$store.state['event/categories']}}</h1>

    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Выберите катергорию"
        :options="categories"
        :class="{error: $v.event.category.$error}"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">Field is required</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        v-model="event.title"
        label="Title"
        type="text"
        class="field"
        placeholder="Add an event title"
        :class="{error: $v.event.title.$error}"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">Field is required</p>
      </template>

      <BaseInput
        v-model="event.description"
        label="Description"
        type="text"
        class="field"
        placeholder="Add a description"
        :class="{error: $v.event.description.$error}"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">Field is required</p>
      </template>

      <h3>Where is your event?</h3>

      <BaseInput
        v-model="event.location"
        label="Location"
        type="text"
        class="field"
        placeholder="Add a location"
        :class="{error: $v.event.location.$error}"
        @blur="$v.event.location.$touch()"
      />

      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">Field is required</p>
      </template>
      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          :language="ru"
          v-model="event.date"
          placeholder="Date"
          @opened="$v.event.date.$touch()"
          :class="{error: $v.event.date.$error}"
          format="dd mm yy"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">Field is required</p>
      </template>

      <BaseSelect
        class="field"
        v-model="event.time"
        label="Выберите время"
        :options="times"
        :class="{error: $v.event.time.$error}"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">Field is required</p>
      </template>

      <BaseButton type="submit" activeClass="-fill-gradient" :disabled="$v.anyError">Отправить</BaseButton>
      <p v-if="$v.anyError" class="errorMessage">Please fill out the required field</p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { ru } from 'vuejs-datepicker/dist/locale'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'
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
      ru,
      times,
      categories: this.$store.state.event.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
      }
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
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
.errorMessage {
  color: red;
}
.error {
  border: 1px solid red;
}
.valid {
  border: 1px solid green;
}
</style>
