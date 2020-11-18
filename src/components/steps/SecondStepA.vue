<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-row>
    
      <b-col cols="8">
        <h2>Καταχώρηση οχήματος</h2>
        <h4 class="font-weight-normal">Χρειαζόμαστε κάποιες πληροφορίες για τον οδηγό και το όχημα και θα βρούμε για σένα τις καλύτερες  προσφορές</h4>
      
        <h2 class="mt-5">Στοιχεία οχήματος</h2>

        <table class="table border mt-3 mb-5">
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
            <tr>
              <th scope="row">
                {{ userVehicle.licensePlate | licensePlateFormat }}
              </th>
              <td>{{ userVehicle.make }}</td>
              <td>{{ userVehicle.model }}</td>
              <td>{{ userVehicle.cc }}</td>
              <td>{{ userVehicle.fuel }}</td>
              <td>{{ userVehicle.type }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6">
                <div class="d-flex justify-content-between align-content-center">
                  <div class="">Πώς βρήκατε τα στοιχεία του οχήματος μου;</div>
                  <a href="#" class="text-secondary">Δεν είναι το όχημα μου</a>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

        <hr />

        <!-- Vehicle Used -->
        <vehicle-used-fields
          :userVehicle="userVehicle"          
        />

        <!-- Driver Details -->
        <driver-detail-fields
          :userVehicle="userVehicle"          
        />
        
        <div class="d-flex mt-5">
          <b-button block variant="outline-secondary" @click="goBack" style="max-width: 50px;">       
            <b-icon icon="arrow-left-circle-fill"></b-icon>
          </b-button>
          <b-button type="submit" block variant="secondary" class="text-left text-white d-flex align-items-center justify-content-between mt-0 ml-2" style="max-width: 250px;">
            <span>
              <small class="d-block">Συνεχεια</small>
              Επιλογη πακετου
            </span>
            <b-icon icon="arrow-right-circle-fill" variant="white"></b-icon>
          </b-button>
        </div>
      </b-col>
      
      <b-col cols="4">
        <vehicle-review-container
          :userVehicle="userVehicle"          
        />
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex'
import mixinCommon from '@/helpers/mixinCommon'
import driverDetailFields from './common/driverDetailFields.vue';
import vehicleUsedFields from './common/vehicleUsedFields.vue';
import vehicleReviewContainer from './common/vehicleReviewContainer.vue';

export default {
  name: 'secondStep',
  components: { 
    driverDetailFields, 
    vehicleUsedFields,
    vehicleReviewContainer
  },
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
      
    }
  },
  provide() {
    return {
      $validator: this.$validator,
    }
  },
  methods: {
    goBack() {
      this.$set(this.steps, 'active', 1);
    },
    onSubmit() {
      
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }

        alert('success!')
      });
    }
  },
  
  mounted() {

  },
};
</script>