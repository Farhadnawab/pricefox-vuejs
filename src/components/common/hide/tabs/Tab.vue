<template>
  <section
    :class="isActive ? 'is-active' : 'not-active'"
    :hidden="!isActive"
    class="tabs__panel"
    role="tabpanel"
  >
    <h3 class="tabs__panel-title">
      {{ label }}
    </h3>
    <slot />
  </section>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            urlPath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isActive: false
            }
        },
        methods: {
            onActive(isActive) {
                this.isActive = isActive;
                if (!isActive) {
                    return;
                }
                if (this.urlPath) {
                    let url = new URL(window.location.href);
                    if (this.urlPath[0] === '#') {
                        url.hash = this.urlPath.substr(1);
                    } else {
                        url.pathname = this.urlPath;
                    }
                    history.pushState(null, null, url.toString());
                    window.dispatchEvent(new Event('popstate'));
                }
            }
        }
    }
</script>
