<template is="field">
  <field
    v-bind="fieldProps"
    class="date-field"
  >
    <date-picker
      :disabled="disabled"
      :id="inputId"
      :name="name"
      :disabled-date="allowLaterDates ? function () {} : laterDates"
      value-type="format"
      type="month"
      class="date-field__input form__input--text input"
      @input="onInput"
      v-model="inputValue"
    />
    <input
      ref="input"
      type="hidden"
      :id="name"
      :name="name"
      :value="inputValue"
      :state="validateState(name)"
      v-validate="vValidate"
    />
  </field>
</template>

<script>
    import mixinCommon from '@/helpers/mixinCommon'
    import Field from "../Field";
    import BaseField from "../BaseField";
    import DatePicker from "vue2-datepicker";
    import 'vue2-datepicker/index.css';
    import 'vue2-datepicker/locale/da';

    export default {
        components: {
            Field,
            DatePicker
        },
        extends: BaseField,
        mixins: [mixinCommon],
        props: {
            value: {
                type: String,
                default: ''
            },
            allowLaterDates: {
                type: Boolean,
                default: true
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
                inputValue: this.value,
            };
        },
        watch: {
            value: {
                immediate: true,
                handler(newValue) {
                   this.inputValue = newValue;
                }
            }
        },
        methods: {
            onInput(value) {
                this.$refs.input.dispatchEvent(new Event('input', {bubbles: true}));
                this.$refs.input.dispatchEvent(new Event('change', {bubbles: true}));
                this.$emit('input', value);
            },
            laterDates(date) {
                return date > new Date();
            }
        },
        inject: ['$validator']
    }
</script>
