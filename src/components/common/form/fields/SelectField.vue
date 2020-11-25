<template is="field">
  <field
    class="select-field"
    v-bind="fieldProps"
  >
    <select-input
      :default-selected="defaultSelected"
      :disabled="disabled"
      :empty-option-label="emptyOptionLabel"
      :id="inputId"
      :name="name"
      :options="options"
      :value="value"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      class="select-field__input input"
      :state="validateState(name)"
      v-validate="vValidate"
    />

    <template #children>
      <slot />
    </template>
  </field>
</template>

<script>
    import mixinCommon from '@/helpers/mixinCommon'
    import BaseField from "../BaseField";
    import Field from "../Field";
    import SelectInput from "../inputs/SelectInput";

    export default {
        components: {
            SelectInput,
            Field
        },
        extends: BaseField,
        mixins: [mixinCommon],
        props: {
            value: {
                type: [String, Number],
                default: ''
            },
            options: {
                type: Array,
                required: true
            },
            defaultSelected: {
                type: String,
                default: ''
            },
            emptyOptionLabel: {
                type: String,
                default: ''
            },
            vValidate: {
                type: Object,
                default () {
                    return { required: this.required }
                } 
            }
        },
        data() {
            return {
                inputValue: this.value
            };
        },
        watch: {
            value: {
                immediate: true,
                handler(newValue) {
                    this.inputValue = newValue
                }
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
