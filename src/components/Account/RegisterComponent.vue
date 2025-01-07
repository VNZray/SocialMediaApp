<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card elevation="6" width="450" style="padding: 14px">
      <form @submit.prevent="createAccount" method="post">
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
            <v-text-field
              variant="outlined"
              v-model="user.first_name"
              label="First Name:"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              v-model="user.middle_name"
              label="Middle Name"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              v-model="user.last_name"
              label="Last Name:"
            ></v-text-field>
            <v-text-field
              type="date"
              v-model="user.birthdate"
              label="Birthday:"
              variant="outlined"
            ></v-text-field>
            <v-select
              v-model="user.gender"
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
              v-model="user.country"
              variant="outlined"
              label="Country"
              :items="countries"
            ></v-select>
            <v-select
              v-model="user.province"
              variant="outlined"
              label="Province"
              :items="provinces"
            ></v-select>
            <v-text-field
              variant="outlined"
              v-model="user.hometown"
              label="Hometown"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              v-model="user.brgy"
              label="Brgy"
            ></v-text-field>

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
            <!-- <v-file-input
              :rules="rules"
              v-model="user.profile_picture"
              accept="image/png, image/jpeg, image/bmp"
              label="Avatar"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              variant="outlined"
            ></v-file-input> -->

            <v-file-upload
            v-model="user.profile_picture"
              accept="image/png, image/jpeg, image/bmp"
              scrim="primary"
            ></v-file-upload>

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
              v-model="user.email"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              label="Email"
            ></v-text-field>
            <v-text-field
              type="number"
              v-model="user.contact_no"
              prepend-inner-icon="mdi-phone"
              variant="outlined"
              label="Contact No"
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              label="Confirm Password"
              type="password"
            ></v-text-field>

            <v-btn
              type="submit"
              style="margin: 8px 0"
              width="100%"
              color="primary"
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
import axios from "axios";
import moment from "moment";

axios.defaults.baseURL = "http://127.0.0.1:8000/api"; // Set the base URL of your backend API
axios.defaults.headers.common["Content-Type"] = "application/json"; // Default Content-Type header

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

      confirmPassword: "",
      passwordMismatch: "",

      user: {
        first_name: "", // Changed to snake_case
        middle_name: "", // Changed to snake_case
        last_name: "", // Changed to snake_case
        birthdate: "",
        age: "",
        gender: null,
        country: null,
        province: null,
        hometown: null,
        brgy: null,
        profile_picture: null, // Changed to snake_case
        email: "",
        contact_no: "", // Changed to snake_case
        password: "",
      },

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
  computed: {},
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

    async createAccount() {
      if (this.user.password !== this.confirmPassword) {
        this.passwordMismatch = "Passwords do not match";
        return;
      }

      // Reset error messages
      this.passwordMismatch = "";

      const formData = new FormData();

      const user = {
        firstName: this.user.first_name,
        middleName: this.user.middle_name,
        lastName: this.user.last_name,
        birthdate: moment(this.user.birthdate).format("YYYY-MM-DD"), // Format the date
        age: this.user.age,
        gender: this.user.gender,
        country: this.user.country,
        province: this.user.province,
        hometown: this.user.hometown,
        brgy: this.user.brgy,
        email: this.user.email,
        contactNo: this.user.contact_no,
        password: this.user.password,
      };

      formData.append("user", JSON.stringify(user)); // Add user data as JSON
      formData.append("imageFile", this.user.profile_picture); // Ensure you are adding the profile picture

      try {
        const response = await axios.post("/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          this.$router.push("/");
        }
      } catch (error) {
        console.error("Error creating account:", error.response || error);
        alert("Manually modify the type of image_data to mediumblob or longblob in xampp php admin");
      }
    },
  },
};
</script>

<style scoped>
.v-tabs-window {
  height: 100%;
}
</style>
