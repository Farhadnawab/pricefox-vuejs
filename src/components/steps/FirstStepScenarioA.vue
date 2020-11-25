<template>
  <div class="first-step-scenario-a">
    <form
      :class="{'is-invalid': isInvalid}" 
      @submit.stop.prevent="onSubmit"
    >
      <div class="row">
      
        <div class="col-xs-8">

          <div class="text-brand-gray">
            <h2 class="mt-0">Καταχώρηση οχήματος</h2>
            <h4 class="font-weight-normal">Χρειαζόμαστε κάποιες πληροφορίες για τον οδηγό και το όχημα και θα βρούμε για σένα τις καλύτερες  προσφορές</h4>

            <br/>
            
            <h2>Στοιχεία οχήματος</h2>

            <table class="first-step-scenario-a--table table">
              <thead>
                <tr>
                  <th width="170" scope="col">Πινακιδα</th>
                  <th scope="col">Μάρκα</th>
                  <th scope="col">Μοντελο</th>
                  <th scope="col">Κυβικα</th>
                  <th scope="col">Καυσιμο</th>
                  <th scope="col">Εκδοση</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">
                    <div class="first-step-scenario-a--plate">
                      <img :src="require('@/assets/images/plate.png')" />
                      {{ userVehicle.licensePlate | licensePlateFormat }}
                    </div>
                  </td>
                  <td>{{ userVehicle.make }}</td>
                  <td>{{ userVehicle.model }}</td>
                  <td>{{ userVehicle.cc }}</td>
                  <td>{{ userVehicle.fuel }}</td>
                  <td>{{ userVehicle.type }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4">
                    <img :src="require('@/assets/images/question.svg')" />
                    Πώς βρήκατε τα στοιχεία του οχήματος μου;
                  </td>
                  <td colspan="2" align="right">
                    <a href="#" class="text-secondary font-weight-medium">Δεν είναι το όχημα μου</a>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Vehicle Used -->
          <vehicle-used-fields
            :userVehicle="userVehicle"          
          />

          <!-- Driver Details -->
          <driver-detail-fields
            :userVehicle="userVehicle"          
          />
          
          <div class="first-step-scenario-a--action">
            <button type="button" class="btn btn-outline-secondary sm-padding" @click="goBack">       
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.27962 3.26455L4 7.99943L9.27962 12.7353C9.69721 13.1113 10.3474 13.0833 10.7311 12.6732C11.1128 12.2641 11.0853 11.6272 10.6667 11.2523L7.0426 7.99943L10.6667 4.7486C11.0853 4.37267 11.1128 3.73784 10.7311 3.32773C10.3474 2.91659 9.69721 2.88862 9.27962 3.26455ZM16 7.99951C16 12.4184 12.4177 16 8.00098 16C3.58234 16 0 12.4184 0 7.99951C0 3.58158 3.58234 0 8.00098 0C12.4177 0 16 3.58158 16 7.99951Z" fill="#F26E22"/>
              </svg>
            </button>
            <button type="submit" class="btn btn-secondary sm-padding">
              <span>
                <small>Συνεχεια</small>
                <br/>
                Επιλογη πακετου
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.08963 3.26455L12.6593 7.99943L7.08963 12.7353C6.6491 13.1113 5.9632 13.0833 5.55835 12.6732C5.15574 12.2641 5.18474 11.6272 5.62639 11.2523L9.44957 7.99943L5.62639 4.7486C5.18474 4.37267 5.15574 3.73784 5.55835 3.32773C5.9632 2.91659 6.6491 2.88862 7.08963 3.26455ZM0 7.99951C0 12.4184 3.58234 16 7.99902 16C12.4177 16 16 12.4184 16 7.99951C16 3.58158 12.4177 0 7.99902 0C3.58234 0 0 3.58158 0 7.99951Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="col-xs-4">
          <vehicle-review-container
            :userVehicle="userVehicle"          
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import mixinCommon from '@/helpers/mixinCommon'
import driverDetailFields from '@/components/steps/common/driverDetailFields.vue';
import vehicleUsedFields from '@/components/steps/common/vehicleUsedFields.vue';
import vehicleReviewContainer from '@/components/steps/common/vehicleReviewContainer.vue';

export default {
  name: 'firstStepScenarioA',
  components: { 
    driverDetailFields, 
    vehicleUsedFields,
    vehicleReviewContainer
  },
  mixins: [mixinCommon],
  props: {
    steps: {
      type: Object,
      required: true
    },
    userVehicle: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isInvalid: false,
    }
  },
  provide() {
    return {
      $validator: this.$validator,
    }
  },
  methods: {
    goBack() {
      this.isInvalid = false;
      this.$set(this.steps, 'modalStep1Show', true);
      Object.keys(this.userVehicle).forEach(e => { if(e !== 'licensePlate') this.$set(this.userVehicle, e, ''); })

      if(!this.steps.vehicleFound)
        this.$router.push({ name: 'pageHome' })
    },
    onSubmit() {
      
      this.$validator.validateAll().then(result => {
        if (!result) {
          this.isInvalid = true;
          return;
        }

        alert('success!')
      });
    }
  },
  
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
.first-step-scenario-a {
  padding: 2rem 0;
}

.first-step-scenario-a--table {
  max-width: 685px;
  margin: 0.85rem 0 1.5rem;
  border: 1px solid var(--info);

  thead th {
    border-bottom: 0;
    padding-top: 1.5rem;
    padding-bottom: 0.375rem;
    color: var(--gray);
    font-size: 0.875rem;
    font-weight: 400;
  }
  th, td {
    border: 0;
    padding: 0.75rem;
  }
  tbody tr:first-child td {
    padding-top: 0.375rem;
  }
  tbody tr:last-child td {
    padding-bottom: 1.5rem;
  }
  tfoot tr td {
    border-top: 1px solid var(--info);
    font-size: 0.87rem;
    color: var(--gray);
  }
  tfoot img {
    margin-right: 0.25rem;
  }
}

.first-step-scenario-a--plate {
  border-radius: 4px;
  border: 1px solid var(--info);
  display: flex;
  align-items: center;

  > img {
    margin-right: 0.5rem;
  }
}

.first-step-scenario-a--action {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 1.875rem;

  > .btn {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    text-align: left;
    line-height: 1;
  }
  > .btn:first-child {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    min-width: 55px;
    margin-right: 0.5rem;
    -webkit-box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  }
  > .btn:last-child {
    width: 100%;
    max-width: 275px;
  }
  > .btn:last-child span{
    font-size: 1.125rem;
  }
  > .btn:last-child small{
    font-weight: normal;
    font-size: 0.75rem;
  }
  > .btn:last-child svg {
    margin-left: 0.5rem;
  }
}
</style>