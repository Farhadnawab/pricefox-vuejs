<template>
  <div>
    <b-card 
      title="Σύνοψη" 
      sub-title="Οδηγός και όχημα"
    >
      <b-card-text>
        <b-list-group class="my-4">
          <b-list-group-item variant="info" class="d-flex align-items-center">
            <b-avatar class="mr-3" variant="gray" :text="userVehicle.make.substring(0,2)"></b-avatar>
            <span class="mr-auto">
              <b class="text-gray-900">{{ userVehicle.make }}</b><br/>
              <span>{{ userVehicle.cc }} {{ userVehicle.type }}</span>
            </span>
          </b-list-group-item>
        </b-list-group>

        Ημ/μηνία έκδοσης διπλώματος: {{ userVehicle.licenseIssuanceDate | dateFormat }}
        <br/>
        Ταχυδρομικος κωδικας: {{ userVehicle.userPostalCode }}
      </b-card-text>
    </b-card>
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
    }
  },
};
</script>