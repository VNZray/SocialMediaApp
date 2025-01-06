<template>
  <v-card elevation="4" style="padding: 30px; margin: 20px 10px; width: 100%">
    <v-col>
      <v-row>
        <v-card-title style="padding-left: 0">
          Contact Information
        </v-card-title>

        <v-divider></v-divider>
      </v-row>

      <v-row>
        <v-card style="width: 100%" elevation="0">
          <v-row>
            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
              <v-icon size="50" color="black">mdi-email</v-icon>
            </v-col>
            <v-col
              cols="10"
              style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
            >
              <v-card-text
                style="padding: 3px 0; font-size: 16px; font-weight: bold"
                >{{ user.email }}</v-card-text
              >
              <v-card-text style="padding: 3px 0; font-size: 14px"
                >Emaill Address</v-card-text
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-row>
            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
              <v-icon size="50" color="black">mdi-phone</v-icon>
            </v-col>
            <v-col
              cols="10"
              style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
            >
              <v-card-text
                style="padding: 3px 0; font-size: 16px; font-weight: bold"
                >{{ user.contactNo }}</v-card-text
              >
              <v-card-text style="padding: 3px 0; font-size: 14px"
                >Phone Number</v-card-text
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>
        </v-card>
      </v-row>

      <v-row>
        <v-card-title style="padding-left: 0"> Basic Information </v-card-title>
        <v-divider></v-divider>
      </v-row>

      <v-row>
        <v-card style="width: 100%" elevation="0">
          <v-row>
            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
              <v-icon size="50" color="black">mdi-account</v-icon>
            </v-col>
            <v-col
              cols="10"
              style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
            >
              <v-card-text
                style="padding: 3px 0; font-size: 16px; font-weight: bold"
                >{{ user.gender }}</v-card-text
              >
              <v-card-text style="padding: 3px 0; font-size: 14px"
                >Gender</v-card-text
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-row>
            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
              <v-icon size="50" color="black">mdi-calendar</v-icon>
            </v-col>
            <v-col
              cols="10"
              style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
            >
              <v-card-text
                style="padding: 3px 0; font-size: 16px; font-weight: bold"
                >{{ user.birthdate }}</v-card-text
              >
              <v-card-text style="padding: 3px 0; font-size: 14px"
                >Birthday</v-card-text
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>
        </v-card>
      </v-row>

      <v-row>
        <v-card-title style="padding-left: 0"> Address </v-card-title>
        <v-divider></v-divider>
      </v-row>

      <v-row>
        <v-card style="width: 100%" elevation="0">
          <v-row>
            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
              <v-icon size="50" color="black">mdi-earth</v-icon>
            </v-col>
            <v-col
              cols="10"
              style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
            >
              <v-card-text
                style="padding: 3px 0; font-size: 16px; font-weight: bold"
                >{{ user.country }}</v-card-text
              >
              <v-card-text style="padding: 3px 0; font-size: 14px"
                >Country</v-card-text
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-row>
            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
              <v-icon size="50" color="black">mdi-map</v-icon>
            </v-col>
            <v-col
              cols="10"
              style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
            >
              <v-card-text
                style="padding: 3px 0; font-size: 16px; font-weight: bold"
                >{{ user.province }}</v-card-text
              >
              <v-card-text style="padding: 3px 0; font-size: 14px"
                >Province</v-card-text
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-row>
            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
              <v-icon size="50" color="black">mdi-city</v-icon>
            </v-col>
            <v-col
              cols="10"
              style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
            >
              <v-card-text
                style="padding: 3px 0; font-size: 16px; font-weight: bold"
                >{{ user.hometown }}</v-card-text
              >
              <v-card-text style="padding: 3px 0; font-size: 14px"
                >Hometown</v-card-text
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-row>
            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
              <v-icon size="50" color="black">mdi-map-marker</v-icon>
            </v-col>
            <v-col
              cols="10"
              style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
            >
              <v-card-text
                style="padding: 3px 0; font-size: 16px; font-weight: bold"
                >{{ user.brgy }}</v-card-text
              >
              <v-card-text style="padding: 3px 0; font-size: 14px"
                >Barangay</v-card-text
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>
        </v-card>
      </v-row>
    </v-col>
  </v-card>
</template>

<script>

import axios from "axios";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    fetchUser() {
      const userId = this.$route.params.userId;

      axios
        .get(`http://127.0.0.1:8000/api/user/${userId}`)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.user = response.data.data;
          } else {
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>