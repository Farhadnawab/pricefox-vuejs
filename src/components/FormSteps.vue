<template>
  <div class="form-steps-wrapper">

    <!-- Modal -->
    <modal
      class="first-step-modal-window"
      :hidden="!steps.modalStep1Show"
      :prevent-closing="true"
      v-if="steps.active === 1"
    >
      <first-step-modal
        :steps.sync="steps"
        :userVehicle.sync="userVehicle"
      />
    </modal>

    <!-- First Step - Scenario A -->
    <first-step-scenario-a
      v-if="!steps.modalStep1Show && !steps.customVehicle"
      :steps.sync="steps"
      :userVehicle.sync="userVehicle"
    />

    <!-- First Step - Scenario B -->
    <first-step-scenario-b
      v-else
      :steps.sync="steps"
      :userVehicle.sync="userVehicle"
      :class="{'hidden-xs': steps.modalStep1Show }"
    />
  </div>
</template>

<script>
import Modal from '@/components/common/modal/Modal'
import FirstStepModal from '@/components/steps/FirstStepModal'
import FirstStepScenarioA from '@/components/steps/FirstStepScenarioA'
import FirstStepScenarioB from '@/components/steps/FirstStepScenarioB'

export default {
  name: "formSteps",
  components: {
    Modal,
    FirstStepModal,
    FirstStepScenarioA,
    FirstStepScenarioB
  },
  data() {
    return {
      steps: {
        active: 1, //possible values 1, 2, 3
        customVehicle: false,
        modalStep1Show: true,
        vehicleFound: false,
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