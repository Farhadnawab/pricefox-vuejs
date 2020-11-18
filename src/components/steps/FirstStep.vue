<template>
  <b-row class="first-step-section">
   
    <b-col>
      <h2 class="text-center">Βρήκαμε τα στοιχεία του οχήματoς σου.</h2>
      <h3 class="text-center font-weight-normal">Βεβαιωθείτε ότι τα στοιχεία του οχήματος σας είναι σωστά</h3>
    

      <table class="table border mt-5 mb-5">
        <thead>
          <tr>
            <th scope="col">Πινακιδα</th>
            <th scope="col">Μάρκα</th>
            <th scope="col">Μοντελο</th>
            <th scope="col">Κυβικα</th>
            <th scope="col">Καυσιμο</th>
            <th scope="col">Εκδοση</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="vehicleFound">
            <th scope="row">
              {{ userVehicle.licensePlate | licensePlateFormat }}
            </th>
            <td>{{ car.make }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.cc }}</td>
            <td>{{ car.fuel }}</td>
            <td>{{ car.type }}</td>
          </tr>
          <tr v-else>
            <td class="text-center" colspan="6">No Match Found..</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-center" colspan="6">Πώς βρήκατε τα στοιχεία του οχήματος μου;</td>
          </tr>
        </tfoot>
      </table>

      <hr />

      <h2 class="text-center">Είναι αυτό το όχημα σου;</h2>

      <div class="text-center">
        <button type="button" class="btn btn-primary mr-2" @click="nextStep(true)" v-if="vehicleFound">Ναι, είναι</button>
        <button type="button" class="btn btn-secondary" @click="nextStep(false)">Όχι, θα το καταχωρήσω εγώ</button>
      </div>
    </b-col>

  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import mixinCommon from '@/helpers/mixinCommon'

export default {
  name: "firstStep",
  mixins: [mixinCommon],
  props: {
    steps: {
      type: Object,
      required: true
    },
    userVehicle: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      car: {},
      vehicleFound: true,
    }
  },
  watch: {
    'steps.active': {
      handler: function (newVal, oldVal) {
        this.searchVehicle();
      },
      immediate: true
    },
  },
  methods: {
    ...mapActions([
      'getCarByLicensePlate'
    ]),
    searchVehicle() {
      this.getCarByLicensePlate(this.userVehicle.licensePlate).then(response => {
          if(!response.data.body.prods.cars || response.data.body.prods.cars.length === 0){
            this.vehicleFound = false;
            return;
          }

          this.car = Object.assign({}, this.car,  response.data.body.prods.cars[0])
        })
        .catch(e => {
          console.log(e);
      });
    },
    nextStep(isYourVehicle) {
      
      this.$set(this.steps, 'active', 2);
      this.$set(this.steps, 'customVehicle', isYourVehicle ? false: true);
      
      if(isYourVehicle) // store vehicle data
        Object.keys(this.car).forEach(e => { this.$set(this.userVehicle, e, this.car[e]) })
      else //empty all fields
        Object.keys(this.userVehicle).forEach(e => { if(e !== 'licensePlate') this.$set(this.userVehicle, e, ''); })
    }
  },
};
</script>

<style scoped>
.first-step-section {
  width: 100%;
  max-width: 750px;
  margin: auto;
}
</style>