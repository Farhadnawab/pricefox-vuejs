<template>
  <div class="vehicle-used-fields">

    <div class="form-group">
      <div class="font-weight-medium mb-03">
        Ημερομηνία πρώτης κυκλοφορίας
        <img :src="require('@/assets/images/question.svg')" />
      </div>

      <date-picker
        default-error-message=""
        name="input-vehicle-registration-date"
        :value="userVehicle.registrationDate"
        v-model="userVehicle.registrationDate"
        :required="true"
      ></date-picker>
    </div>

    <div class="form-group">
      <div class="font-weight-medium mb-03">
        Το όχημα είναι μεταχειρισμένο
        <img :src="require('@/assets/images/question.svg')" />
      </div>

      <options-field
        class="form-radio-type-1"
        :required="true"
        name="btn-radios-vehicle-used"
        :options="vehicleUsedOptions"
        :max-selected="1"
        default-error-message=""
        v-model="userVehicle.used"
      />
    </div>
    <div class="form-group" v-if="userVehicle.used === 'no'">
      <div class="font-weight-medium mb-03">
        Ημερομηνία μεταβίβασης
        <img :src="require('@/assets/images/question.svg')" />
      </div>

      <date-picker
        default-error-message=""
        name="input-vehicle-transfer-date"
        :value="userVehicle.transferDate"
        v-model="userVehicle.transferDate"
        :required="true"
      ></date-picker>
    </div>              
  </div>
</template>

<script>
import datePicker from '@/components/common/form/fields/DateField'
import optionsField from '@/components/common/form/fields/OptionsField'

export default {
  name: "vehicleUsedFields",
  components: {
    datePicker,
    optionsField
  },
  props: {
    userVehicle: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      vehicleUsedOptions: [
        { label: 'NAI', value: 'no' },
        { label: 'OXI', value: 'yes' },
      ],
    }
  },
  provide() {
    return {
      $validator: this.$validator,
    }
  },
  inject: ['$validator']
};
</script>