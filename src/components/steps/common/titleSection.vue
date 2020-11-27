<template>
  <div class="title-section">

    <div class="title-section--bars">
      <span class="active"></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="title-section--heading">
      <b class="text-brand-gray">Είσαι μόλις ένα βήμα μακριά</b>
      <i class="glyphicon glyphicon-info-sign"></i>
    </div>

  </div>
</template>

<script>

export default {
  name: "titleSection",
  data() {
    return {
    }
  },
};
</script>

<style lang="scss" scoped>
.title-section--bars {
  display: flex;
  margin: 0 -5px 15px;

  > span {
    flex: 1 0 auto;
    height: 10px;
    background: var(--info);
    border-radius: 50px;
    margin: 0 5px;

    &.active {
      background: var(--secondary);
    }
  }
}

.title-section--heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;

  i {
    color: var(--gray-700);
  }
}
</style>