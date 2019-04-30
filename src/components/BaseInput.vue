<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input :value="value" @input="onValue" v-bind="$attrs" v-on="listeners">
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixins'

export default {
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onValue
      }
    }
  }
}
</script>
