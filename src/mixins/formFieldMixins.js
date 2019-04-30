export const formFieldMixin = {
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
