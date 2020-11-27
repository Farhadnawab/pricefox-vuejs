<template>
  <div class="header">
    <div class="container">
        <a href="/">
            <img src="@/assets/images/logo.png" />
        </a>

        <a href="tel:123456789">
            <img src="@/assets/images/phone-icon.png" />
        </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header {
    background: var(--primary);

    > .container {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:before, &:after { display: none; }
    }
}
</style>