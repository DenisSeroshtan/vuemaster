<template>
  <div>
    <label v-if="label">{{label}}</label>
    <select :value="value" @change="onValue" v-bind="$attrs">
      <option v-for="option in options" :key="option" :selected="option == value">{{ option }}</option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixins'
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>
