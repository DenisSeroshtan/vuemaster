<template>
  <div>
    <label v-if="label">{{label}}</label>
    <select :value="value" @change="onValue" v-bind="$attrs">
      <option v-for="option in options" :key="option" :selected="option == value">{{ option }}</option>
    </select>
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
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    onValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
