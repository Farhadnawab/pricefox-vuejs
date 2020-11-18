<template>
  <div class="page-home">

    <b-form class="text-center" @submit.stop.prevent="onSubmit">
      <h2>Ασφάλισε το αυτοκίνητό σου και 
      εξοικονόμησε έως και 96€ ετησίως</h2>
      <p>Σύγκρινε προσφορές από τις καλύτερες ασφαλιστικές σε 1 λεπτό</p>

      <b-form-input
          id="input-license-plate"
          name="input-license-plate"
          v-model="licensePlate" 
          placeholder="Enter your vehicle plate number e.g ipo-3245"
          v-validate="{ required: true,  regex: /^[A-Ω]{3}-\d{4}$/ }"
          :state="validateState('input-license-plate')" 
          class="mx-auto"
          style="max-width: 500px;"
      ></b-form-input>
      <b-button type="submit" block variant="secondary" class="text-white mt-4 mx-auto" style="max-width: 250px;">
          προσφορές
      </b-button>
    </b-form>

    
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
      licensePlate: ''
    }
  },
  methods: {
   onSubmit() {
      
      this.$validator.validateAll().then(result => {
        if (!result) {
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