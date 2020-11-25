<template is="field">
  <field
    v-bind="fieldProps"
    class="text-field form_field--text"
  >
    <input
      :disabled="disabled"
      :id="inputId"
      :name="name"
      :placeholder="placeholder"
      :maxlength="maxLength"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @keyup="onKeyUp"
      @keypress="onKeyPress"
      class="text-field__input input form__input form__input--text"
      :type="type"
      v-model="inputValue"
      :state="validateState(name)"
      v-validate="vValidate"
    >
  </field>
</template>

<script>
    import mixinCommon from '@/helpers/mixinCommon'
    import Field from "../Field";
    import BaseField from "../BaseField";

    export default {
        components: {Field},
        extends: BaseField,
        mixins: [mixinCommon],
        props: {
            value: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            maxLength: {
                type: Number,
                default: Number.MAX_SAFE_INTEGER
            },
            regex: {
                type: RegExp,
                default: undefined
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
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(newValue) {
                    this.inputValue = newValue
                }
            },
            focused(newFocused) {
                this.focused = newFocused;
            }
        },
        mounted() {
            this.addValidator(() => {
                if (this.regex !== undefined && !this.regex.test(this.inputValue)) {
                    return 'regex';
                }
                return true;
            });
        },
        methods: {
            onInput(event) {
                this.$emit('input', event.target.value);
            },
            onFocus() {
                this.focused = true;
                this.$emit('focus');
            },
            onBlur() {
                this.focused = false;
                this.$emit('blur');
            },
            onKeyUp(event) {
                this.$emit('keyup', event.target.value);
            },
            onKeyPress(event) {
                this.$emit('keypress', event);
            }
        },
        inject: ['$validator']
    }
</script>
