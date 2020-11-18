<template>
  <div>
    <h3 class="mt-5">Στοιχεία οδηγού</h3>
    <h4 class="font-weight-normal mt-3">Ημερομηνία έκδοσης διπλώματος</h4>
    
    <b-form-datepicker
      id="input-license-issuance-date"
      name="input-license-issuance-date"
      v-model="userVehicle.licenseIssuanceDate"
      v-validate="{ required: true }"
      :state="validateState('input-license-issuance-date')" 
    ></b-form-datepicker>

    <template v-if="userVehicle.licenseIssuanceDate.length > 0">
      <h4 class="font-weight-normal mt-3">Ημερομηνία γέννησης οδηγού</h4>
      <b-form-datepicker
        id="input-birth-date"
        name="input-birth-date"
        v-model="userVehicle.userBirthDate"
        v-validate="{ required: true }"
        :state="validateState('input-birth-date')" 
      ></b-form-datepicker>
      
      <h4 class="font-weight-normal mt-3">Ταχυδρομικός κώδικας</h4>
      <b-form-input
        id="input-postal-code"
        name="input-postal-code"
        v-model="userVehicle.userPostalCode"
        v-validate="{ required: true }"
        :state="validateState('input-postal-code')" 
      ></b-form-input>
      
      <h4 class="font-weight-normal mt-3">E-mail (προεραιτικό)</h4>
      <b-form-input 
        id="input-email-address"
        name="input-email-address"
        v-model="userVehicle.userEmailAddress"
        v-validate="{ required: true }"
        :state="validateState('input-email-address')" 
        type="email"
      ></b-form-input>

      <p class="mt-2">Συμπλήρωσε το e-mail σου και αν το επιθυμείς θα μοιραζόμαστε μαζί σου τις καλύτερες προσφορές της αγοράς για σένα.</p>

      <template v-if="hasAddtionalDriver">
        <hr/>

        <h4 class="font-weight-normal mt-3">Ημερομηνία Έκδοσης διπλώματος επιπρόσθετου οδηγού</h4>
        <b-form-datepicker
          id="input-license-issuance-date-2"
          name="input-license-issuance-date-2"
          v-model="userVehicle.licenseIssuanceDate2"
          v-validate="{ required: true }"
          :state="validateState('input-license-issuance-date-2')" 
          class="mb-3"
        ></b-form-datepicker>
      </template>

      <b-button variant="outline-primary" @click="hasAddtionalDriver = !hasAddtionalDriver">
        Προσθήκη επιπλέον οδηγού
      </b-button>

      <p class="mt-2">Πατώντας το "Επόμενο Βήμα" συμφωνείτε με τους Όρους χρήσης & Πολιτική Απορρήτου.</p>
    </template>
  </div>
</template>

<script>
import mixinCommon from '@/helpers/mixinCommon'

export default {
  name: "driverDetailFields",
  mixins: [mixinCommon],
  props: {
    userVehicle: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      hasAddtionalDriver: false,
    }
  },
  inject: ['$validator']
};
</script>