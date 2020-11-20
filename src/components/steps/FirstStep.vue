<template>
  <div class="first-step-section" v-if="vehicleFound">
    
    <img class="d-block mx-auto mb-4" :src="require('@/assets/images/car.svg')" />

    <h4 class="text-center font-weight-normal">Βρήκαμε τα στοιχεία του οχήματoς σου.</h4>
    <p class="text-center font-weight-normal">Βεβαιωθείτε ότι τα στοιχεία του οχήματος σας είναι σωστά</p>
  

    <table class="first-step-section--table table mt-4 mb-4">
      <thead>
        <tr>
          <th width="170" scope="col">Πινακιδα</th>
          <th scope="col">Μάρκα</th>
          <th scope="col">Μοντελο</th>
          <th scope="col">Κυβικα</th>
          <th scope="col">Καυσιμο</th>
          <th scope="col">Εκδοση</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">
            <div class="first-step-section--plate">
              <img class="mr-2" :src="require('@/assets/images/plate.png')" />
              {{ userVehicle.licensePlate | licensePlateFormat }}
            </div>
          </td>
          <td>{{ car.make }}</td>
          <td>{{ car.model }}</td>
          <td>{{ car.cc }}</td>
          <td>{{ car.fuel }}</td>
          <td>{{ car.type }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-center" colspan="6">
            <img class="mr-1" :src="require('@/assets/images/question.svg')" />
            Πώς βρήκατε τα στοιχεία του οχήματος μου;
          </td>
        </tr>
      </tfoot>
    </table>

    <hr />

    <h4 class="text-center font-weight-normal pt-3 mb-3">Είναι αυτό το όχημα σου;</h4>

    <div class="text-center d-flex flex-column align-items-center">
      <button type="button" class="btn btn-secondary" @click="nextStep(true)" v-if="vehicleFound">Ναι, είναι</button>
      <button type="button" class="btn btn-outline-info mt-3" @click="nextStep(false)">Όχι, θα το καταχωρήσω εγώ</button>
    </div>

  </div>
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
      vehicleFound: false,
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
            this.nextStep(false)
            return;
          }

          this.vehicleFound = true;
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
.first-step-section--table {
  max-width: 570px;
  margin: auto;
  border: 1px solid var(--info);
}
.first-step-section--table thead th {
  border-bottom: 0;
  padding-top: 1.5rem;
  padding-bottom: 0.375rem;
  color: var(--gray);
  font-size: 0.875rem;
  font-weight: 400;
}
.first-step-section--table thead th:first-child, .first-step-section--table tbody td:first-child {
  border-right: 1px solid var(--info);
}
.first-step-section--table th, .first-step-section--table td {
  border: 0;
}
.first-step-section--table tbody tr:first-child td {
  padding-top: 0.375rem;
}
.first-step-section--table tbody tr:last-child td {
  padding-bottom: 1.5rem;
}
.first-step-section--table tfoot tr td {
  border-top: 1px solid var(--info);
  font-size: 0.87rem;
  color: var(--gray);
}
.first-step-section--plate {
  border-radius: 4px;
  border: 1px solid var(--info);
  display: flex;
  align-items: center;
}
</style>