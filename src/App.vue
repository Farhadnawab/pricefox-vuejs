<template>
  <div id="app">

    <navbar />

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import navbar from '@/components/common/Header'

export default {
  name: "app",
  components: {
    navbar,
  },
};
</script>
