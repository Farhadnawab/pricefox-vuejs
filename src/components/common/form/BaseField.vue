<template>
  <field
    :class="classes"
    :input-id="inputId"
    :label="label"
    :description="description"
    :error-message="ignoreError ? '' : errorMessage"
    :what="what"
    :why="why"
    :show-children="showChildren"
  />
</template>

<script>
    const crypto = require("crypto");
    import Field from "./Field";

    export default {
        components: {Field},
        inheritAttrs: false,
        props: {
            name: {
                type: String,
                default: ''
            },
            value: {
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            dirty: {
                type: Boolean,
                default: false
            },
            errorMessages: {
                type: Object,
                default: () => {}
            },
            defaultErrorMessage: {
                type: String,
                default: 'Error'
            },
            validation: {
                type: [Function,Boolean,String,Array],
                default: true
            },
            validateFocused: {
                type: Boolean,
                default: false
            },
            touchChanges: {
                type: Boolean,
                default: true
            },
            delayErrors: {
                type: [Array, String, Boolean],
                default: false
            },
            required: {
                type: Boolean,
                default: false
            },
            forceHideError: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            what: {
                type: String,
                default: ''
            },
            why: {
                type: String,
                default: ''
            },
            showChildren: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                inputValue: this.value,
                touched: false,
                focused: false,
                invalid: undefined,
                error: '',
                errorMessage: '',
                showDelayedErrors: false,
                validators: [],
                inputId: ''
            };
        },
        watch: {
            inputValue: {
                immediate: true,
                handler(newValue) {
                    this.$emit('input', newValue);
                    this.$nextTick(() => {
                        this.updateError();
                    });
                }
            },
            value() {
                this.updateError();
            },
            focused(focused) {
                this.focused = focused;
                this.touched = true;
            },
            disabled() {
                this.updateError();
            },
            dirty(dirty) {
                if (dirty) {
                    this.touched = true;
                }
            }
        },
        mounted() {
            this.inputId = 'input__'
                + this.name
                + '__'
                + crypto.randomBytes(20).toString('hex');
        },
        computed: {
            classes() {
                return [
                    'form__field',
                    this.disabled ? 'form__field--disabled' : 'form__field--enabled',
                    this.invalid ? 'form__field--invalid' : 'form__field--valid',
                    this.error && !this.ignoreError ? 'form__field--error' : 'form__field--no-error',
                    this.touched ? 'form__field--dirty' : 'form__field--clean',
                    this.focused ? 'is-focused' : 'not-focused'
                ];
            },
            fieldProps() {
                return {
                    class: this.classes,
                    inputId: this.inputId,
                    label: this.label,
                    description: this.description,
                    errorMessage: this.ignoreError ? '' : this.errorMessage,
                    what: this.what,
                    why: this.why,
                    focused: this.focused,
                    showChildren: this.showChildren,
                    touchChanges: this.touchChanges
                }
            },
            ignoreError() {
                return this.error === ''
                    || this.disabled
                    || (!this.validateFocused && this.focused)
                    || !this.touched
                    || (!this.showDelayedErrors && this.isDelayedError(this.error));
            }
        },
        methods: {
            updateError() {
                const lastInvalid = this.invalid;
                this.errorMessage = '';
                this.error = '';
                this.error = this.getError();
                this.invalid = this.error !== '';
                if (this.invalid !== lastInvalid) {
                    this.$el.dispatchEvent(new CustomEvent(
                        'validate',
                        {
                            bubbles: true,
                            detail: {
                                name: this.name,
                                valid: !this.invalid,
                                error: this.error,
                                errorMessage: this.errorMessage
                            }
                        }
                    ));
                }
                if (!this.invalid) {
                    return;
                }

                this.errorMessage = this.getErrorMessage();
            },
            getIsInvalid() {
                this.updateError();
                return this.invalid;
            },
            onFocus() {
                this.focused = true;
                this.touched = true;
                this.$emit('focus');
            },
            onBlur() {
                this.focused = false;
                this.$emit('blur');
            },
            touch() {
                this.touched = true;
                this.showDelayedErrors = true;
            },
            addValidator(validator) {
                this.validators.push(validator);
            },
            getError() {
                if (this.disabled) {
                    return '';
                }
                if (!this.inputValue && this.inputValue !== 0 && this.inputValue !== false) {
                    return this.required ? 'required' : '';
                }

                const customValidationError = this.validation instanceof Function
                    ? this.validation(this.value)
                    : this.validation;
                if (customValidationError === false) {
                    return 'custom';
                }
                if (
                    typeof customValidationError === 'string'
                    && customValidationError !== ''
                ) {
                    return customValidationError;
                }

                for (let i = 0; i < this.validators.length; ++i) {
                    if (
                        !(this.validators[i]
                        || this.validators[i] instanceof Function)
                    ) {
                        console.error(
                            `Invalid validator: ${this.name}[${i}]}.`
                            + ` It must be a function.`
                        );
                    }
                    const error = this.validators[i](this.value);
                    if (error !== true && error !== '') {
                        return error || 'default';
                    }
                }
                return '';
            },
            getErrorMessage() {
                if (!this.error) {
                    return '';
                }

                if (!this.errorMessages) {
                    return this.defaultErrorMessage;
                }
                const defaultErrorMessage = this.errorMessages['default'] || this.defaultErrorMessage;

                if (Array.isArray(this.error)) {
                    for (let error in this.error) {
                        if (this.errorMessages[error]) {
                            return this.errorMessages[error];
                        }
                    }
                    return defaultErrorMessage;
                }

                return this.errorMessages[this.error] ? this.errorMessages[this.error] : defaultErrorMessage;
            },
            isDelayedError(error) {
                if (error === '') {
                    return false;
                }

                if (Array.isArray(this.delayErrors)) {
                    return this.delayErrors.includes(error);
                }

                if (typeof this.delayErrors === 'string') {
                    return this.delayErrors === error;
                }

                return !!this.delayErrors;
            }
        }
    }
</script>
