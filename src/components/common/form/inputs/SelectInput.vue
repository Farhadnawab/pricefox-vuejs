<template>
  <select
    :class="[
      'form-field__input',
      'form__input--select',
      this.value ? '' : ' form__select-input--empty'
    ]"
    :disabled="disabled"
    :id="id"
    :name="name"
    @blur="onBlur"
    @change="onChange"
    @focus="onFocus"
    v-model="inputValue"
    :state="validateState(name)"
    v-validate="vValidate"
  >
    <option
      v-if="disabled"
      disabled
      selected
      value=""
    >
      {{ emptyOptionLabelOrDefault }}
    </option>
    <option
      :data-index="index"
      :id="id+'__'+option.value"
      :key="option.value"
      :value="option.value"
      class="form-input-select__option"
      v-for="(option, index) in options"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script>
    import mixinCommon from '@/helpers/mixinCommon'

    export default {
        mixins: [mixinCommon],
        props: {
            id: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            },
            emptyOptionLabel: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            vValidate: {
                type: Object,
                default () {
                    return { required: true }
                } 
            }
        },
        data() {
            return {
                inputValue: this.value
            }
        },
        computed: {
            emptyOptionLabelOrDefault() {
                return this.emptyOptionLabel || this.$text('form.field.select.select-option');
            }
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
            onChange(event) {
                this.$emit('change', event);
                this.onInput(event);
            },
            onInput(event) {
                this.$emit('input', event.target.value);
            },
            onFocus(event) {
                this.$emit('focus', event);
            },
            onBlur(event) {
                this.$emit('blur', event);
            }
        },
        inject: ['$validator']
    }
</script>
