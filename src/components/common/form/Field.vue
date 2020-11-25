<template>
  <div class="field">
    <label
      :for="inputId"
      class="field__label"
      v-if="label"
      v-html="label"
    />
    <small
      class="field__description"
      v-if="description"
    >{{ description }}</small>
    <tooltip
      ref="what"
      class="field__what"
      :button="false"
      :hidden="whatHidden"
      :content="what"
      v-if="what"
    />
    <tooltip
      class="field__why"
      :button="true"
      v-if="why"
      :content="why"
    />
    <div
      class="field__input"
      @input="onInput"
      @change="onChange"
      @focusin="onFocus"
      @focusout="onBlur"
    >
      <slot />
    </div>
    <div
      class="field__children"
      v-if="this.$slots.children && showChildren"
    >
      <slot name="children" />
    </div>
    <div
      class="form-field__error"
      v-if="errorMessage"
      aria-live="assertive"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
    import Tooltip from "../hide/Tooltip";
    export default {
        components: {Tooltip},
        inheritAttrs: false,
        props: {
            inputId: {
                type: String,
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
            errorMessage: {
                type: String,
                default: ''
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
                default: true
            }
        },
        computed: {
            whatHidden() {
                return !this.$attrs.focused
                    && (
                        !this.$refs.what
                        || !this.$refs.what.pointerOver
                    );
            }
        },
        methods: {
            onInput() {
                if (this.$parent.$props.touchChanges) {
                    this.$parent.$data.touched = true;
                }
            },
            onChange(event) {
                setTimeout(() => {
                    if (this.$parent.$data.error) {
                        return;
                    }

                    const nameCategoryMap = {
                        '' : 'unknown',
                        laan: 'personal-loan',
                        bredbaand: 'broadband',
                        mobilabonnement: 'sim',
                        bilforsikring: 'car-insurance'
                    };
                    const category = nameCategoryMap[
                        Object.keys(nameCategoryMap).find((name) =>
                            name !== '' && window.location.pathname.includes(name)
                        )
                    ];

                    // this.$ga.event({
                    //     hitType: 'event',
                    //     eventCategory: category,
                    //     eventAction: window.location.pathname ==='/laan/aftale'
                    //         ? 'PL Form Question Completed'
                    //         : 'Question Completed',
                    //     eventLabel: event.target.name
                    // });
                }, 0);
            },
            onFocus() {
                this.$parent.$data.focused = true;
            },
            onBlur() {
                this.$parent.$data.focused = false;
            }
        }
    }
</script>
