/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Import Vuetify Labs components
import { VCalendar } from 'vuetify/labs/VCalendar'
import { VDateInput } from 'vuetify/labs/VDateInput'

// Composables
import { createVuetify } from 'vuetify'
import { VFileUpload } from 'vuetify/labs/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VCalendar,
    VDateInput,
    VFileUpload,
  },
})