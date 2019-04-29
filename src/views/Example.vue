<template>
  <form v-on:submit.prevent="submit">
    <input
      type="email"
      placeholder="What's your email"
      v-model.trim="email"
      :class="[infoClass, 'input']"
      @blur="$v.email.$touch()"
    >
    <div v-if="$v.email.$error">
      <p class="errorMessage" v-if="!$v.email.email">Please enter a valid email address.</p>
      <p class="errorMessage" v-if="!$v.email.required">Email is required.</p>
    </div>
    <div>
      <button :disabled="$v.$invalid" type="submit">Submit</button>
      <p v-if="$v.$anyError" class="errorMessage">Please fill out the required fields</p>
    </div>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null
    }
  },
  computed: {
    infoClass() {
      return {
        error: this.$v.email.$error,
        valid: !this.$v.email.$invalid && this.$v.email.$dirty
      }
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('Form Submission:', this.email)
      }
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
}
</script>

<style scoped>
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
