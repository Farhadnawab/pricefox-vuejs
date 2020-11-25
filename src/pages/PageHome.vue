<template>
  <div class="page-home">

    <form 
      :class="{'is-invalid': isInvalid}"
      class="text-center" 
      @submit.stop.prevent="onSubmit"
    >
      <h2>Ασφάλισε το αυτοκίνητό σου και 
      εξοικονόμησε έως και 96€ ετησίως</h2>
      <p>Σύγκρινε προσφορές από τις καλύτερες ασφαλιστικές σε 1 λεπτό</p>

      <div class="form-group">
        <input
            id="input-license-plate"
            name="input-license-plate"
            v-model="licensePlate" 
            placeholder="Enter your vehicle plate number e.g ipo-3245"
            v-validate="{ required: true,  regex: /^[A-Ω]{3}-\d{4}$/ }"
            :state="validateState('input-license-plate')" 
            class="page-home--plate-input form-control"
            type="text"
        />
      </div>
      <button 
        type="submit" 
        class="btn btn-secondary page-home--button" 
        style="max-width: 250px;"
      >
          προσφορές
      </button>
    </form>

    
  </div>
</template>

<script>
import mixinCommon from '@/helpers/mixinCommon'

export default {
  name: "pageHome",
  mixins: [mixinCommon],
  components: {
  },
  data() {
    return {
      licensePlate: '',
      isInvalid: false,
    }
  },
  methods: {
   onSubmit() {
      
      this.$validator.validateAll().then(result => {
        if (!result) {
          this.isInvalid = true;
          return;
        }

        const number = this.licensePlate.replaceAll('-','').toLowerCase();
        this.$router.push({ name: 'formSteps', params: { number: number } })
      });
    }
  },
  mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
.page-home--plate-input {
  margin: 1rem auto 0;
  max-width: 500px;
}
.page-home--button {
  width: 100%;
  max-widtH: 250px;
  margin: 1rem auto 0;
}
</style>