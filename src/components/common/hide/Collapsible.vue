<template>
  <div
    class="collapsible"
    :hidden="this.collapsed"
  >
    <slot />
  </div>
</template>

<script>
    export default {
        props: {
            collapsed: {
                type: Boolean,
                default: true
            }
        }
    }
</script>
