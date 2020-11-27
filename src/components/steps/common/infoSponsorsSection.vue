<template>
  <div class="info-sponsors-section">

    <ul class="info-sponsors-section--listing">
      <li>
        <img src="@/assets/images/is-icon1.png" />
        Ευκολα και γρηγορα
      </li>
      <li>
        <img src="@/assets/images/is-icon2.png" />
        Μιλάμε τη γλώσσα σου
      </li>
      <li>
        <img src="@/assets/images/is-icon3.png" />
        Εντελως δωρεαν
      </li>
      <li>
        <img src="@/assets/images/is-icon4.png" />
        24/7 Εξυπηρετηση
      </li>
    </ul>

    <div class="info-sponsors-section--main">
      <div class="mb-1">Συνεργατες</div>
      <img src="@/assets/images/is-icon5.png" />

      <hr />

      <div class="mb-1">Ασφαλιστικός πράκτορας αδειοδοτημένος από</div>
      <img src="@/assets/images/is-icon6.png" />
    </div>

  </div>
</template>

<script>

export default {
  name: "infoSponsorsSection",
  data() {
    return {
    }
  },
};
</script>

<style lang="scss" scoped>
.info-sponsors-section--listing {
  font-size: 1.125rem;
  list-style: none;
  margin: 2rem 0;
  padding: 0;

  > li {
    display: flex;
    align-items: center;
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid var(--info);
  }
  > li img {
    margin-right: 0.5rem;
  }
}
.info-sponsors-section--main {
  color: var(--info);
  border: 1px solid;
  padding: 1.5rem;
  text-align: center;

  img {
    max-width: 100%;
    filter: grayscale(100%);
  }
  hr {
    margin: 1.375rem -1.5rem;
  }
}
</style>