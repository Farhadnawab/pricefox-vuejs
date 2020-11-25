<template>
  <div class="vehicle-detail-fields">    
    <div class="form-group">
      <div class="font-weight-medium mb-03">
        Μάρκα
        <img :src="require('@/assets/images/question.svg')" />
      </div>
      
      <select-field
        :required="true"
        default-error-message=""
        name="input-vehicle-make"
        v-model="userVehicle.make"
        :options="vehicleMakeOptions"
        @input="populateModelData"
      ></select-field>
    </div>

    <template v-if="userVehicle.make.length > 0">
      <hr />

      <div class="form-group">
        <div class="font-weight-medium mb-03">
          Μοντέλο
          <img :src="require('@/assets/images/question.svg')" />
        </div>
        
        <select-field
          :required="true"
          default-error-message=""
          name="input-vehicle-model"
          v-model="userVehicle.model"
          :options="vehicleModelOptions"
          @input="populateFuelTypeData"
        ></select-field>
      </div>

      <div class="form-group">
        <div class="font-weight-medium mb-03">
          Είδος καυσίμου
          <img :src="require('@/assets/images/question.svg')" />
        </div>
        
        <select-field
          :required="true"
          default-error-message=""
          name="input-vehicle-fuel"
          v-model="userVehicle.fuel"
          :options="vehicleFuelOptions"
        ></select-field>
      </div>

      <div class="form-group">
        <div class="font-weight-medium mb-03">
          Κυβικά (CC)
          <img :src="require('@/assets/images/question.svg')" />
        </div>
        
        <select-field
          :required="true"
          default-error-message=""
          name="input-vehicle-cc"
          v-model="userVehicle.cc"
          :options="vehicleCCOptions"
        ></select-field>
      </div>

      <div class="form-group">
        <div class="font-weight-medium mb-03">
          Έκδοση μοντέλου
          <img :src="require('@/assets/images/question.svg')" />
        </div>
        
        <select-field
          :required="true"
          default-error-message=""
          name="input-vehicle-type"
          v-model="userVehicle.type"
          :options="vehicleTypeOptions"
        ></select-field>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import mixinCommon from '@/helpers/mixinCommon'
import selectField from '@/components/common/form/fields/SelectField'

export default {
  name: "vehicleDetailFields",
  mixins: [mixinCommon],
  components: {
    selectField
  },
  props: {
    userVehicle: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      vehicleMakeOptions: [
        { value: '', text: 'Please select an option' },
      ],
      vehicleModelOptions: [
        { value: '', text: 'Please select an option' },
      ],
      vehicleFuelOptions: [
        { value: '', text: 'Please select an option' },
      ],
      vehicleCCOptions: [
        { value: '', text: 'Please select an option' },
        { value: '1000', text: '1000' },
        { value: '1200', text: '1200' },
        { value: '1600', text: '1600' },
        { value: '1800', text: '1800' },
      ],
      vehicleTypeOptions: [
        { value: '', text: 'Please select an option' },
        { value: '1.4', text: '1.4' },
        { value: 'tsi-sports', text: 'TSI Sports' },
      ],
    }
  },
  inject: ['$validator'],
  methods: {
    ...mapActions([
      'getAllCarMakers',
      'getCarModelsByCarMaker',
      'getCarFuelTypeByCarMakerModel'
    ]),
    populateModelData(value) {
      if(!value)
        return
      
      this.getCarModelsByCarMaker(value).then(results => {
        if(!results.data.model)
          return

        this.vehicleModelOptions.splice(1) // avoid duplication

        // populate makers dropdown
        Object.values(results.data.model).forEach(e => {
          this.vehicleModelOptions.push({value: e, text: e})
        })
      });
    },
    populateFuelTypeData(value) {
      if(!value)
        return
      
      this.getCarFuelTypeByCarMakerModel({ 
        model: value, 
        make: this.userVehicle.make 
      }).then(results => {
        if(!results.data.fuelType)
          return

        this.vehicleFuelOptions.splice(1) // avoid duplication

        // populate makers dropdown
        Object.values(results.data.fuelType).forEach(e => {
          this.vehicleFuelOptions.push({value: e, text: e})
        })
      });
    }
  },
  mounted() {

    this.getAllCarMakers().then(results => {
      if(!results.data.make)
        return

      // populate makers dropdown
      this.vehicleMakeOptions.splice(1) // avoid duplication
      Object.values(results.data.make).forEach(e => {
        this.vehicleMakeOptions.push({value: e, text: e})
      })
    });
  }
};
</script>

<style lang="scss" scoped>
.vehicle-detail-fields {
  margin-top: 1.5rem;
  max-width: 340px;
}
</style>