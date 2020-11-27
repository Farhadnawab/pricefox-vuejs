<template>
  <div class="first-step-modal" v-if="steps.vehicleFound">
    
    <img class="first-step--car-icon" :src="require('@/assets/images/car.svg')" />

    <div class="first-step--title">
      <h4>Βρήκαμε τα στοιχεία του οχήματoς σου.</h4>
      <p>Βεβαιωθείτε ότι τα στοιχεία του οχήματος σας είναι σωστά</p>
    </div>

    <table class="first-step-modal--table table">
      <tbody>
        <tr>
          <td scope="row">
            <div class="title">Πινακιδα</div>
            <div class="first-step-modal--plate">
              <img :src="require('@/assets/images/plate.png')" />
              {{ userVehicle.licensePlate | licensePlateFormat }}
            </div>
          </td>
          <td>
            <div class="title">Μάρκα</div>
            {{ car.make }}
          </td>
          <td>
            <div class="title">Μοντελο</div>
            {{ car.model }}
          </td>
          <td>
            <div class="title">Κυβικα</div>
            {{ car.cc }}
          </td>
          <td>
            <div class="title">Καυσιμο</div>
            {{ car.fuel }}
          </td>
          <td>
            <div class="title">Εκδοση</div>
            {{ car.type }}
          </td>
        </tr>
      </tbody>
      <tfoot class="text-center">
        <tr>
          <td colspan="6">
            <img :src="require('@/assets/images/question.svg')" />
            Πώς βρήκατε τα στοιχεία του οχήματος μου;
          </td>
        </tr>
      </tfoot>
    </table>

    <hr />
    
    <div class="first-step--action">
      <h4 class="first-step--action-title">Είναι αυτό το όχημα σου;</h4>

      <div class="first-step--action-buttons">
        <button type="button" class="btn btn-secondary" @click="nextStep(true)" v-if="steps.vehicleFound">Ναι, είναι</button>
        <button type="button" class="btn btn-default" @click="nextStep(false)">Όχι, θα το καταχωρήσω εγώ</button>
      </div>
    </div>

    <div class="first-step-modal--info-mobile hidden-sm">
      <img :src="require('@/assets/images/question.svg')" />
      Πώς βρήκατε τα στοιχεία του οχήματος μου;
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import mixinCommon from '@/helpers/mixinCommon'

export default {
  name: "firstStepModal",
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
      car: {},
    }
  },
  watch: {
    'steps.modalStep1Show': {
      handler: function (newVal, oldVal) {
        this.searchVehicle();
      },
      immediate: true
    },
  },
  methods: {
    ...mapActions([
      'getCarByLicensePlate'
    ]),
    searchVehicle() {
      this.getCarByLicensePlate(this.userVehicle.licensePlate).then(response => {
          if(!response.data.body.prods.cars || response.data.body.prods.cars.length === 0){
            this.nextStep(false)
            return;
          }

          this.$set(this.steps, 'vehicleFound', true);
          this.car = Object.assign({}, this.car,  response.data.body.prods.cars[0])
        })
        .catch(e => {
          console.log(e);
      });
    },
    nextStep(isYourVehicle) {
      
      this.$set(this.steps, 'modalStep1Show', false);
      this.$set(this.steps, 'customVehicle', isYourVehicle ? false: true);
      
      if(isYourVehicle) { // store vehicle data
        Object.keys(this.car).forEach(e => { this.$set(this.userVehicle, e, this.car[e]) })
      } else { //empty all fields
        Object.keys(this.userVehicle).forEach(e => { if(e !== 'licensePlate') this.$set(this.userVehicle, e, ''); })
        this.$set(this.steps, 'vehicleFound', false);
      }


    }
  },
};
</script>

<style lang="scss" scoped>
.first-step--car-icon {
  display: block;
  margin: auto;
  margin-bottom: 1.5rem;
}
.first-step--title {
  text-align: center;

  > * {
    font-weight: normal;
  }
}

.first-step--action {
  text-align: center;

  .first-step--action-title {
    font-weight: 400;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .first-step--action-buttons {
    align-items: center;
    flex-direction: column;
    display: flex;
  }
  .first-step--action-buttons .btn-default {
    margin-top: 1rem;
  }
}

.first-step-modal--info-mobile {
  margin-top: 2rem;
  text-align: center;
}
</style>

<style lang="scss">
.first-step-modal--table {
  max-width: 570px;
  margin: 1.5rem auto;
  border: 1px solid var(--info);

  tbody .title {
    border-bottom: 0;
    padding-bottom: 0.5rem;
    color: var(--gray);
    font-size: 0.875rem;
    font-weight: 400;
  }
  tbody td:first-child {
    border-right: 1px solid var(--info);
  }
  thead tr th, thead tr td,
  tbody tr th, tbody tr td,
  tfoot tr th, tfoot tr td {
    border: 0;
    padding: 1.5rem 0.75rem;
  }
  tfoot tr td {
    border-top: 1px solid var(--info);
    font-size: 0.87rem;
    color: var(--gray);
  }
  tfoot img {
    margin-right: 0.25rem;
  }

  @media only screen and (max-width: 767px) {
    max-width: 440px;
    border: 0;
    margin-bottom: 0;

    thead th:first-child, tbody td:first-child {
      border-right: 0;
    }

    tbody tr {
      display: flex;
      flex-wrap: wrap;

      > td {
        width: 50%;
        padding: 0.75rem;
      }
    }

    tfoot {
      display: none;
    }
  }
}

.first-step-modal--plate {
  border-radius: 4px;
  border: 1px solid var(--info);
  display: inline-flex;
  align-items: center;
  padding-right: 0.7rem;

  > img {
    margin-right: 0.5rem;
  }
}
</style>