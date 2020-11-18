<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-row>
    
      <b-col cols="8">
        <h2>Καταχώρηση οχήματος</h2>
        <h4 class="font-weight-normal">Χρειαζόμαστε κάποιες πληροφορίες για τον οδηγό και το όχημα και θα βρούμε για σένα τις καλύτερες  προσφορές</h4>
      
        <h2 class="mt-5">Στοιχεία οχήματος</h2>                

        <!-- Vehicle Details -->
        <vehicle-detail-fields
          :userVehicle="userVehicle"          
        />

        <!-- Vehicle Used -->
        <div class="mt-3" v-if="userVehicle.make.length > 0">
          <vehicle-used-fields
            :userVehicle="userVehicle"          
          />
        </div>
        
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
import mixinCommon from '@/helpers/mixinCommon'
import driverDetailFields from './common/driverDetailFields.vue';
import vehicleDetailFields from './common/vehicleDetailFields.vue';
import vehicleUsedFields from './common/vehicleUsedFields.vue';
import vehicleReviewContainer from './common/vehicleReviewContainer.vue';

export default {
  name: 'secondStep',
  components: { 
    driverDetailFields, 
    vehicleDetailFields, 
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

      vehicleUsedOptions: [
        { text: 'NAI', value: 'no' },
        { text: 'OXI', value: 'yes' },
      ],
      hasAddtionalDriver: false,
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