<template>
  <div>
    <h4 class="font-weight-normal mt-3">Μάρκα </h4>
    <b-form-select 
      id="input-vehicle-make"
      name="input-vehicle-make"
      v-model="userVehicle.make" 
      :options="vehicleMakeOptions"
      v-validate="{ required: true }"
      :state="validateState('input-vehicle-make')" 
      @change="populateModelData"
    ></b-form-select>

    <template v-if="userVehicle.make.length > 0">
      <hr />

      <h4 class="font-weight-normal mt-4">Μοντέλο</h4>
      <b-form-select 
        id="input-vehicle-model"
        name="input-vehicle-model"
        v-model="userVehicle.model" 
        :options="vehicleModelOptions"
        v-validate="{ required: true }"
        :state="validateState('input-vehicle-model')" 
        @change="populateFuelTypeData"
      ></b-form-select>

      <h4 class="font-weight-normal mt-3">Είδος καυσίμου</h4>
      <b-form-select 
        id="input-vehicle-fuel"
        name="input-vehicle-fuel"
        v-model="userVehicle.fuel" 
        :options="vehicleFuelOptions"
        v-validate="{ required: true }"
        :state="validateState('input-vehicle-fuel')" 
      ></b-form-select>

      <h4 class="font-weight-normal mt-3">Κυβικά (CC)</h4>
      <b-form-select 
        id="input-vehicle-cc"
        name="input-vehicle-cc"
        v-model="userVehicle.cc" 
        :options="vehicleCCOptions"
        v-validate="{ required: true }"
        :state="validateState('input-vehicle-cc')" 
      ></b-form-select>

      <h4 class="font-weight-normal mt-3">Έκδοση μοντέλου</h4>
      <b-form-select 
        id="input-vehicle-type"
        name="input-vehicle-type"
        v-model="userVehicle.type" 
        :options="vehicleTypeOptions"
        v-validate="{ required: true }"
        :state="validateState('input-vehicle-type')" 
      ></b-form-select>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import mixinCommon from '@/helpers/mixinCommon'

export default {
  name: "vehicleDetailFields",
  mixins: [mixinCommon],
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
      this.vehicleModelOptions.splice(1) // avoid duplication

      if(!value)
        return
      
      this.getCarModelsByCarMaker(value).then(results => {
        if(!results.data.model)
          return

        // populate makers dropdown
        Object.values(results.data.model).forEach(e => {
          this.vehicleModelOptions.push({value: e, text: e})
        })
      });
    },
    populateFuelTypeData(value) {
      this.vehicleFuelOptions.splice(1) // avoid duplication

      if(!value)
        return
      
      this.getCarFuelTypeByCarMakerModel({ 
        model: value, 
        make: this.userVehicle.make 
      }).then(results => {
        if(!results.data.fuelType)
          return

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