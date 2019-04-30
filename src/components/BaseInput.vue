<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input :value="value" @input="onValue" v-bind="$attrs" v-on="listeners">
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number]
    }
  },
  methods: {
    onValue(event) {
      this.$emit('input', event.target.value)
    }
  },
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
