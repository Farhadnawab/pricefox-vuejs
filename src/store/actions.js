import api from "@/helpers/API";

const actions = {
  // Responds with an car data object that matches
  // the given license plate
  async getCarByLicensePlate({ dispatch }, payload) {
    try {
      return await api.get('/car-insurance/car-plate', {
        params: {
          licensePlate: payload
        }
      });
    } catch (e) {
      dispatch('setMessage', {
        type: 'error',
        message: 'Error saving: ' + e.message
      })
      throw e
    }
  },

  // Responds with a list of all known cars makers
  async getAllCarMakers({ dispatch }) {
    try {
      return await api.get('/car-insurance/v2/cars');
    } catch (e) {
      dispatch('setMessage', {
        type: 'error',
        message: 'Error saving: ' + e.message
      })
      throw e
    }
  },

  // Responds with a list of known models of given maker
  async getCarModelsByCarMaker({ dispatch }, payload) {
    try {
      return await api.get('/car-insurance/v2/cars', {
        params: {
          make: payload
        }
      });
    } catch (e) {
      dispatch('setMessage', {
        type: 'error',
        message: 'Error saving: ' + e.message
      })
      throw e
    }
  },

  // Responds with the car fuel type for respective maker and model
  async getCarFuelTypeByCarMakerModel({ dispatch }, {model, make}) {
    try {
      return await api.get('/car-insurance/v2/cars', {
        params: {
          make: make,
          model: model
        }
      });
    } catch (e) {
      dispatch('setMessage', {
        type: 'error',
        message: 'Error saving: ' + e.message
      })
      throw e
    }
  },

  // DRY method to update entry in database
  // Payload: { url, data }
  async axiosUpdateData ({ dispatch }, payload) {
    try {
      return await api.put(payload.url, payload.data)
    } catch (e) {
      dispatch('setMessage', {
        type: 'error',
        message: 'Error saving: ' + e.message
      })
      throw e
    }
  }
}

export default actions
