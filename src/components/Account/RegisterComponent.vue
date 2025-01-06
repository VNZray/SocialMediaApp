<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card elevation="6" width="450" style="padding: 14px">
      <form>
        <v-tabs
          v-model="tabs"
          color="primary"
          grow
          style="height: 100%; display: none"
        >
          <v-tab style="height: 100%" :value="1"> Personal Information </v-tab>
          <v-tab style="height: 100%" :value="2"> Address </v-tab>
          <v-tab style="height: 100%" :value="3"> Set Profile Picture </v-tab>
          <v-tab style="height: 100%" :value="4"> Setup Password </v-tab>
        </v-tabs>

        <!-- Title -->
        <v-card-title class="text-center" style="font-size: 32px"
          >Sign Up</v-card-title
        >

        <v-tabs-window v-model="tabs" style="padding: 10px">
          <v-tabs-window-item v-if="tabs === 1" :key="1" :value="1">
            <v-card-title style="padding-left: 0"
              >Personal Information</v-card-title
            >
            <v-text-field variant="outlined" label="First Name:"></v-text-field>
            <v-text-field variant="outlined" label="Middle Name"></v-text-field>
            <v-text-field variant="outlined" label="Last Name:"></v-text-field>
            <v-text-field
              type="date"
              label="Birthday:"
              variant="outlined"
            ></v-text-field>
            <v-select
              variant="outlined"
              label="Gender:"
              :items="['Male', 'Female']"
            ></v-select>

            <v-btn
              color="primary"
              @click="nextTab"
              style="margin: 8px 0"
              width="100%"
              >Next</v-btn
            >
            <v-btn to="/" style="margin: 8px 0" width="100%">Back</v-btn>
          </v-tabs-window-item>

          <v-tabs-window-item v-if="tabs === 2" :key="2" :value="2">
            <v-card-title style="padding-left: 0">Address</v-card-title>
            <v-select
              variant="outlined"
              label="Country"
              :items="countries"
            ></v-select>
            <v-select
              variant="outlined"
              label="Province"
              :items="provinces"
            ></v-select>
            <v-text-field variant="outlined" label="Hometown"></v-text-field>
            <v-text-field variant="outlined" label="Brgy"></v-text-field>

            <v-btn
              color="primary"
              @click="nextTab"
              style="margin: 8px 0"
              width="100%"
              >Next</v-btn
            >
            <v-btn @click="prevTab" style="margin: 8px 0" width="100%"
              >Back</v-btn
            >
          </v-tabs-window-item>

          <v-tabs-window-item v-if="tabs === 3" :key="3" :value="3">
            <v-card-title style="padding-left: 0"
              >Set Profile Picture</v-card-title
            >
            <v-file-upload scrim="primary"></v-file-upload>

            <v-btn
              color="primary"
              @click="nextTab"
              style="margin: 8px 0"
              width="100%"
              >Next</v-btn
            >
            <v-btn @click="prevTab" style="margin: 8px 0" width="100%"
              >Back</v-btn
            >
          </v-tabs-window-item>

          <v-tabs-window-item v-if="tabs === 4" :key="4" :value="4">
            <v-card-title style="padding-left: 0">Setup Account</v-card-title>
            <v-text-field
              prepend-inner-icon="mdi-email"
              variant="outlined"
              label="Email"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-phone"
              variant="outlined"
              label="Contact No"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              label="Confirm Password"
              type="password"
            ></v-text-field>

            <v-btn style="margin: 8px 0" width="100%" color="success"
              >Create Account</v-btn
            >
            <v-btn @click="prevTab" style="margin: 8px 0" width="100%"
              >Back</v-btn
            >
          </v-tabs-window-item>
        </v-tabs-window>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabs: 1, // Tracks the current tab
      countries: [
        "United States",
        "Canada",
        "Philippines",
        "United Kingdom",
        "Australia",
        "India",
        "Germany",
        "France",
        "Japan",
        "China",
        "South Korea",
        "Brazil",
      ],

      provinces: [
        "Abra",
        "Agusan del Norte",
        "Agusan del Sur",
        "Aklan",
        "Albay",
        "Antique",
        "Apayao",
        "Aurora",
        "Basilan",
        "Bataan",
        "Batanes",
        "Batangas",
        "Benguet",
        "Biliran",
        "Bohol",
        "Bukidnon",
        "Bulacan",
        "Cagayan",
        "Camarines Norte",
        "Camarines Sur",
        "Camiguin",
        "Capiz",
        "Catanduanes",
        "Cavite",
        "Cebu",
        "Compostela Valley",
        "Cotabato",
        "Davao del Norte",
        "Davao del Sur",
        "Davao Occidental",
        "Davao Oriental",
        "Dinagat Islands",
        "Eastern Samar",
        "Guimaras",
        "Ifugao",
        "Ilocos Norte",
        "Ilocos Sur",
        "Iloilo",
        "Isabela",
        "Kalinga",
        "La Union",
        "Laguna",
        "Lanao del Norte",
        "Lanao del Sur",
        "Leyte",
        "Maguindanao",
        "Marinduque",
        "Masbate",
        "Misamis Occidental",
        "Misamis Oriental",
        "Mountain Province",
        "Negros Occidental",
        "Negros Oriental",
        "Northern Samar",
        "Nueva Ecija",
        "Nueva Vizcaya",
        "Occidental Mindoro",
        "Oriental Mindoro",
        "Palawan",
        "Pampanga",
        "Pangasinan",
        "Quezon",
        "Quirino",
        "Rizal",
        "Romblon",
        "Samar",
        "Sarangani",
        "Siquijor",
        "Sorsogon",
        "South Cotabato",
        "Southern Leyte",
        "Sultan Kudarat",
        "Sulu",
        "Surigao del Norte",
        "Surigao del Sur",
        "Tarlac",
        "Tawi-Tawi",
        "Zambales",
        "Zamboanga del Norte",
        "Zamboanga del Sur",
        "Zamboanga Sibugay",
      ], // List of Philippine provinces
    };
  },
  computed: {

  },
  mounted() {},
  watch: {},
  beforeDestroy() {},
  created() {},
  methods: {
    nextTab() {
      if (this.tabs < 4) this.tabs++;
    },
    prevTab() {
      if (this.tabs > 1) this.tabs--;
    },
  },
};
</script>
