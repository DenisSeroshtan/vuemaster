<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input :value="value" @input="onValue" v-bind="$attrs">
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
  }
}
</script>
