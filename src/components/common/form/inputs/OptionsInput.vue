<template>
  <ul
    :class="[
      'options-field__list',
      disabled ? 'is-disabled' : '',
      classes
    ]"
    :role="type === 'radio' ? 'radiogroup' : 'listbox'"
  >
    <li
      v-for="(option, index) in options"
      :key="option.value"
      :class="[
        'options-field__option',
        'form__option--'+type,
        isOptionSelected(option) ? 'is-selected' : 'not-selected'
      ]"
      :data-value="option.value"
      :role="type === 'radio' ? 'radio' : 'option'"
      :aria-checked="isOptionSelected(option)"
      tabindex="0"
    >
      <input
        :id="buildInputId(index)"
        class="options-field__input"
        :type="type"
        :name="name + (maxSelected > 1 ? '[]' : '')"
        :value="option.value"
        :aria-describedby="describedBy"
        :data-index="index"
        :disabled="disabled"
        tabindex="-1"
        ref="input"
        @change="onInput"
        :state="validateState(name + (maxSelected > 1 ? '[]' : ''))"
        v-validate="vValidate"
      >
      <label
        :for="buildInputId(index)"
        class="options-field__label"
      >{{ option.label }}</label>
    </li>
  </ul>
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
            maxSelected: {
                type: Number,
                default: Number.MAX_SAFE_INTEGER
            },
            default: {
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            describedBy: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                default: ''
            },
            classes: {
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
                inputValue: this.value !== undefined ?  this.value : (this.maxSelected > 1 ? [] : ''),
                type: this.maxSelected > 1 ? 'checkbox' : 'radio'
            }
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
            onInput(event) {
                this.updateInputValue();
                this.$emit('input', this.inputValue);
                this.$emit('change', {
                    name: this.name,
                    value: this.inputValue,
                    checked: event.target.checked
                });
            },
            updateInputValue() {
                const inputs = this.$refs.input;
                let values = [];
                inputs.forEach((input) => {
                    if (input.checked) {
                        values.push(input.value);
                    }
                });
                this.inputValue = this.maxSelected === 1
                    ? values.pop()
                    : values;
            },
            isOptionSelected(option) {
                if (this.inputValue === undefined || this.inputValue === null) {
                    return false;
                }
                return (Array.isArray(this.inputValue) && this.inputValue.includes(option.value))
                    || option.value === this.inputValue.toString();
            },
            buildInputId(index) {
                return index === 0 ? this.id : this.id + '__' + index;
            }
        },
        inject: ['$validator']
    }
</script>
