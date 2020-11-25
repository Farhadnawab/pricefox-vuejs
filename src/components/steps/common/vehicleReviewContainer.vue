<template>
  <div>
    <div class="panel panel-default">
    <div class="panel-body">
      <h5>Σύνοψη</h5>
      <div class="text-gray">Οδηγός και όχημα</div>

      <div class="media media-panel">
        <div class="media-left">
          <a href="#">
            <img class="media-object" src="https://via.placeholder.com/45x45" alt="...">
          </a>
        </div>
        <div class="media-body">
          <b>{{ userVehicle.make }}</b>
          <br/>
          <span class="text-gray">{{ userVehicle.cc }} {{ userVehicle.type }}</span>
        </div>
      </div>
      
      <br/>
      
      <span class="text-gray">Ημ/μηνία έκδοσης διπλώματος:</span> {{ userVehicle.licenseIssuanceDate | dateFormat }}
      <br/>
      <span class="text-gray">Ταχυδρομικος κωδικας:</span> {{ userVehicle.userPostalCode }}
    </div>
    </div>
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