<template is="field">
  <field
    class="email-field  form_field--text"
    v-bind="fieldProps"
  >
    <input
      :disabled="disabled"
      :id="inputId"
      :placeholder="placeholder"
      :value="inputValue"
      :name="name"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @keyup="onKeyUp"
      @keypress="onKeyPress"
      @change="onChange"
      class="email-field__input input form__input form__input--text"
      type="email"
      :autocomplete="true"
    />
  </field>
</template>

<script>
    import Field from "../Field";
    import BaseField from "../BaseField";
    import axios from 'axios';

    export default {
        components: {
            Field
        },
        extends: BaseField,
        props: {
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            }
        },
        data() {
          return {
            domainValidation: true
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
        mounted() {
            this.addValidator(() => {
                if (!this.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    return 'email';
                }
                if (this.domainValidation === false) {
                    return 'domain';
                }
                return true;
            });
        },
        methods: {
            onInput(event) {
                this.inputValue = event.target.value;
                this.$emit('input', this.inputValue);
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
            },
            onChange() {
                setTimeout(() => {
                    if (!this.error) {
                        this.domainValidation = true;

                        const hostname = this.inputValue.split('@')[1];
                        axios.get('https://dns.google/resolve?name=' + hostname)
                            .then(response => this.domainValidation = response.data.Status === 0)
                            .catch(error => console.error(error));
                    }
                }, 0);
            }
        }
    }
</script>
