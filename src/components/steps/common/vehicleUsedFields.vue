<template>
  <div>
    <div class="mb-3" v-if="userVehicle.used === 'yes'">
      <h4 class="font-weight-normal mb-3">Ημερομηνία πρώτης κυκλοφορίας</h4>

      <b-form-datepicker
        id="input-vehicle-transfer-date"
        name="input-vehicle-transfer-date"
        v-model="userVehicle.transferDate"
        v-validate="{ required: true }"
        :state="validateState('input-vehicle-transfer-date')" 
      ></b-form-datepicker>
    </div>

    <h4 class="font-weight-normal mb-3">Το όχημα είναι μεταχειρισμένο ?</h4>

    <b-form-group>
      <b-form-radio-group
        id="btn-radios-vehicle-used"
        v-model="userVehicle.used"
        :options="vehicleUsedOptions"
        buttons
        button-variant="primary"
        name="btn-radios-vehicle-used"
      ></b-form-radio-group>
    </b-form-group>               
  </div>
</template>

<script>
import mixinCommon from '@/helpers/mixinCommon'

export default {
  name: "vehicleUsedFields",
  mixins: [mixinCommon],
  props: {
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
    }
  },
  inject: ['$validator']
};
</script>