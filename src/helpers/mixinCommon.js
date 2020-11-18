export default {
  data () {
    return {

    }
  },
  created () {
    
  },
  computed: {
    
  },
  filters: {
    dateFormat (date) {
      if (!date) return '---'
      return date.replaceAll('-','/');
    },
    licensePlateFormat (value) {
      if (!value) return ''
      return `${value.toUpperCase().substring(0,3)} ${value.toUpperCase().substring(3)}`;
    }
  },
  methods: {
    validateState(ref) {
        if (
            this.veeFields[ref] &&
            (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) {
            return !this.veeErrors.has(ref);
        }
        return null;
    }
  }
}
