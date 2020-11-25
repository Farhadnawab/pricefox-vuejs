<template>
  <div class="tabs-wrapper">
    <ul
      class="tabs"
      role="tablist"
    >
      <li
        :aria-selected="activeId === tab.id"
        :class="activeId === tab.id ? 'is-active' : 'not-active'"
        :data-rel="tab.id"
        :key="i"
        class="tabs__tab"
        role="tab"
        v-for="(tab, i) in tabs"
      >
        <span
          class="tabs__tab-label"
          v-if="activeId === tab.id"
        >{{ tab.label }}</span>
        <a
          @click.prevent="select(tab.id)"
          class="tabs__tab-label"
          href="#"
          v-else
        >{{ tab.label }}</a>
      </li>
    </ul>

    <div class="tabs__panels">
      <slot />
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                tabs: [],
                activeId: ''
            }
        },
        watch: {
            value(value) {
                this.activeId = value;
            }
        },
        mounted() {
            if (this.tabs.length === 0) {
                return;
            }
            this.select(this.value || this.tabs[0].id);
        },
        created() {
            this.tabs = this.$children;
        },
        methods: {
            findTab(id) {
                return this.tabs.find(tab => tab.id === id);
            },
            select(id) {
                this.activeId = id;
                this.tabs.forEach(tab => {
                    tab.onActive(tab.id === this.activeId);
                });
                this.$emit('input', this.activeId);
            }
        }
    }
</script>
