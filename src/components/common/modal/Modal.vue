<template>
  <div
    class="modal-window"
    :class="[
      visible ? 'is-visible' : 'is-hidden'
    ]"
    v-if="visible"
  >
    <div
      class="modal-window__overlay"
      @click="hide"
    />
    <header
      class="modal-window__header"
      v-if="contentVisible"
    >
      <button
        class="modal-window__close-button close-button"
        @click="hide"
        v-if="!preventClosing"
      >
        X
      </button>
      <h2
        class="modal-window__title"
        v-if="title"
      >
        {{ title }}
      </h2>
      <div
        class="modal-window__description"
        v-if="description"
      >
        {{ description }}
      </div>
    </header>
    <div
      class="modal-window__dialog"
      v-if="contentVisible"
    >
        <div class="modal-window__content">
            <div class="modal-window-content__body">
                <slot />
            </div>
        </div>
    </div>
    <footer
      class="modal-window__footer"
      v-if="this.$slots.footer && contentVisible"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            hidden: {
                type: Boolean,
                default: false
            },
            preventClosing: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: !this.hidden,
                contentVisible: true
            }
        },
        watch: {
            hidden(newHidden) {
                if (newHidden) {
                    this.visible = false;
                    return;
                }

                this.contentVisible = false;
                this.visible = false;
                this.$forceUpdate();
                this.contentVisible = true;
                this.visible = true;
            }
        },
        methods: {
            hide() {
                if(this.preventClosing)
                    return;

                this.visible = false;
                this.$emit('hide', true);
            }
        }
    }
</script>

<style scoped>
.modal-window {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    display: none;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
}
.modal-window.is-visible {
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
}
.modal-window__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background: var(--primary);
    opacity: 0.9;
    z-index: -1;
}
.modal-window__dialog {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    max-width: 992px;
    margin: 1.75rem auto;
    min-height: calc(100% - 3.5rem);
}
.modal-window__content {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 0.3rem;
    outline: 0;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
.modal-window-content__body {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 2rem;
}
</style>