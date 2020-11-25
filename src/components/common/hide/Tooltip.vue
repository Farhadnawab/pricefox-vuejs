<template>
  <div
    class="tooltip"
    :class="[
      this.contentIsVisible ? 'has-visible-content' : 'lacks-visible-content',
      this.button ? 'has-button' : 'lacks-button',
      this.side ? 'is-'+this.side : ''
    ]"
    @mousemove="onPointerOver"
    @mouseleave="onPointerLeave"
    v-if="content"
  >
    <button
      @click.prevent
      class="tooltip__button"
      v-if="button"
    >{{ typeof button === 'string' ? button : '?'  }}</button>

    <div
      class="tooltip__content"
      role="tooltip"
      :hidden="!contentIsVisible"
      v-html="content"
    />
  </div>
</template>

<script>
    export default {
        props: {
            button: {
                type: [String, Boolean],
                default: true
            },
            hidden: {
                type: Boolean,
                default: true
            },
            side: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                contentIsVisible: false,
                pointerOver: false
            };
        },
        watch: {
            hidden: {
                immediate: true,
                handler(hidden) {
                    this.contentIsVisible = !hidden;
                }
            },
            contentIsVisible() {
                this.$emit('hidden', !this.contentIsVisible);
            }
        },
        methods: {
            onPointerOver() {
                this.contentIsVisible = true;
                this.pointerOver = true;
            },
            onPointerLeave() {
                this.contentIsVisible = false;
                this.pointerOver = false;
            }
        }
    }
</script>
