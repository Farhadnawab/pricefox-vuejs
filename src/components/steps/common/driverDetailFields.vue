<template>
  <div>
    <div class="driver-detail-fields">
      <h3 class="mb-1">Στοιχεία οδηγού</h3>

      <div class="form-group driver-detail-fields--license">
        <div class="font-weight-medium mb-03">
          Ημερομηνία έκδοσης διπλώματος
          <img :src="require('@/assets/images/question.svg')" />
        </div>
        
        <date-picker
          default-error-message=""
          name="input-license-issuance-date"
          :value="userVehicle.licenseIssuanceDate"
          v-model="userVehicle.licenseIssuanceDate"
          :required="true"
        ></date-picker>

        <div class="driver-detail-fields--license--hint">
          <img :src="require('@/assets/images/pointing-arrow1.png')" />
          <span>
            Επίσης θα χρειαστούμε κάποιες πληροφορίες για τον οδηγό.
          </span>
        </div>
      </div>

      <template v-if="userVehicle.licenseIssuanceDate">
        <div class="form-group">
          <div class="font-weight-medium mb-03">
            Ημερομηνία γέννησης οδηγού
            <img :src="require('@/assets/images/question.svg')" />
          </div>
          <date-picker
            default-error-message=""
            name="input-birth-date"
            :value="userVehicle.userBirthDate"
            v-model="userVehicle.userBirthDate"
            :required="true"
          ></date-picker>
        </div>

        <div class="form-group">
          <div class="font-weight-medium mb-03">
            Ταχυδρομικός κώδικας
            <img :src="require('@/assets/images/question.svg')" />
          </div>
          <text-field
            default-error-message=""
            :required="true"
            name="input-postal-code"
            v-model="userVehicle.userPostalCode"
          ></text-field>
        </div>
        
        <div class="form-group">
          <div class="font-weight-medium mb-03">
            E-mail (προεραιτικό)
            <img :src="require('@/assets/images/question.svg')" />
          </div>
          <text-field
            default-error-message=""
            :required="true"
            name="input-email-address"
            type="email"
            v-model="userVehicle.userEmailAddress"
          ></text-field>
        </div>

        <p class="driver-detail-fields--description">Συμπλήρωσε το e-mail σου και αν το επιθυμείς θα μοιραζόμαστε μαζί σου τις καλύτερες προσφορές της αγοράς για σένα.</p>

        <template v-if="hasAddtionalDriver">
          <hr/>

          <div class="form-group">
            <div class="font-weight-medium mb-03">
              Ημερομηνία Έκδοσης διπλώματος επιπρόσθετου οδηγού
              <img :src="require('@/assets/images/question.svg')" />
            </div>
            <date-picker
              default-error-message=""
              name="input-license-issuance-date-2"
              :value="userVehicle.licenseIssuanceDate2"
              v-model="userVehicle.licenseIssuanceDate2"
              :required="true"
            ></date-picker>
          </div>
          
          <div class="form-group">
            <div class="font-weight-medium mb-03">
              Ημερομηνία γέννησης οδηγού
              <img :src="require('@/assets/images/question.svg')" />
            </div>
            <date-picker
              default-error-message=""
              name="input-birth-date-2"
              :value="userVehicle.userBirthDate2"
              v-model="userVehicle.userBirthDate2"
              :required="true"
            ></date-picker>
          </div>
        </template>

        <button type="button" class="btn btn-outline-primary" @click="hasAddtionalDriver = !hasAddtionalDriver">
          Προσθήκη επιπλέον οδηγού
        </button>

      </template>
    </div>
    <br/>
    <p v-if="userVehicle.licenseIssuanceDate" class="driver-detail-fields--description">Πατώντας το "Επόμενο Βήμα" συμφωνείτε με τους Όρους χρήσης & Πολιτική Απορρήτου.</p>
  </div>
</template>

<script>
import mixinCommon from '@/helpers/mixinCommon'
import datePicker from '@/components/common/form/fields/DateField'
import TextField from '@/components/common/form/fields/TextField'

export default {
  name: "driverDetailFields",
  components: {
    datePicker,
    TextField
  },
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
  provide() {
    return {
      $validator: this.$validator,
    }
  },
  inject: ['$validator']
};
</script>

<style lang="scss" scoped>
.driver-detail-fields {
  margin-top: 2.5rem;
  max-width: 340px;
}
.driver-detail-fields--description {
  color: var(--gray);
  font-size: 0.875rem;
}

.driver-detail-fields--license {
  position: relative;
}
.driver-detail-fields--license--hint {
  position: absolute;
  top: 100%;
  left: 100%;
  margin-top: -3rem;
  margin-left: 2.5rem;
  width: 340px;
  display: flex;
  align-items: flex-start;

  img {
    margin-right: 2rem;
  }

  @media only screen and (max-width: 1340px) {
    width: 300px;
    margin-top: -2rem;
    font-size: 0.875rem;

    img {
      max-width: 50px;
    }
  }
  @media only screen and (max-width: 1200px) {
    display: none;
  }
}
</style>