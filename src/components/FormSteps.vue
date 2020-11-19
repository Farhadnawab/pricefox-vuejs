<template>
  <div class="form-steps-wrapper">
    <first-step
      v-if="steps.active === 1"
      :steps.sync="steps"
      :userVehicle.sync="userVehicle"
    />
    <second-step-a
      v-if="steps.active === 2 && !steps.customVehicle"
      :steps.sync="steps"
      :userVehicle.sync="userVehicle"
    />
    <second-step-b
      v-if="steps.active === 2 && steps.customVehicle"
      :steps.sync="steps"
      :userVehicle.sync="userVehicle"
    />
  </div>
</template>

<script>
import FirstStep from '@/components/steps/FirstStep'
import SecondStepA from '@/components/steps/SecondStepA'
import SecondStepB from '@/components/steps/SecondStepB'

export default {
  name: "formSteps",
  components: {
    FirstStep,
    SecondStepA,
    SecondStepB
  },
  data() {
    return {
      steps: {
        active: 1, //possible values 1, 2, 3
        customVehicle: false,
      },
      userVehicle: {
        make: '',
        model: '',
        type: '',
        realHP: '',
        cc: '',
        engine: '',
        fuel: '',
        price: '',

        licensePlate: '',
        transferDate: '',
        registrationDate: '',
        used: '',
        licenseIssuanceDate: '',
        licenseIssuanceDate2: '',
        userBirthDate: '',
        userBirthDate2: '',
        userPostalCode: '',
        userEmailAddress: '',
      }
    }
  },
  methods: {
   
  },
  created() {
    if(this.$route.params.number)
      this.userVehicle.licensePlate = this.$route.params.number
  }
};
</script>