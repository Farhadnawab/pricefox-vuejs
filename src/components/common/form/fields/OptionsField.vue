<template is="field">
  <field
    v-bind="fieldProps"
    classes="options-field"
  >
    <options-input
      :default="this.default"
      :id="inputId"
      :max-selected="maxSelected"
      :name="name"
      :options="options"
      @input="onInput"
      :value="value"
      v-validate="vValidate"
    />
  </field>
</template>

<script>
    import Field from "../Field";
    import BaseField from "../BaseField";
    import OptionsInput from "../inputs/OptionsInput";

    export default {
        components: {
            Field,
            OptionsInput
        },
        extends: BaseField,
        props: {
            maxSelected: {
                type: Number,
                default: Number.MAX_SAFE_INTEGER
            },
            options: {
                type: Array,
                required: true
            },
            default: {
                type: [String, Number, Array],
                default: ''
            },
            vValidate: {
                type: Object,
                default () {
                    return { required: true }
                } 
            }
        },
        watch: {
            value(newValue) {
                this.inputValue = newValue;
            }
        },
        methods: {
            onInput(value) {
                this.$emit('input', value);
            }
        },
        inject: ['$validator']
    }
</script>
