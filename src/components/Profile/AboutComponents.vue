<template>
  <form @submit.prevent="updateProfile" method="post">
    <v-card elevation="4" style="padding: 30px; margin: 20px 10px; width: 100%">
      <v-col>
        <v-row>
          <v-card-title style="padding-left: 0">
            Contact Information
          </v-card-title>
        </v-row>

        <v-row>
          <v-card style="width: 100%" elevation="0">
            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-email</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.email"
                    label="Email Address"
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.email }}
                  </v-card-text>
                </template>
                <v-card-text style="padding: 3px 0; font-size: 14px"
                  >Emaill Address</v-card-text
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-phone</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.contactNo"
                    label="Phone Number"
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.contactNo }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Phone Number</v-card-text
                  >
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-row>

        <v-row>
          <v-card-title style="padding-left: 0">
            Basic Information
          </v-card-title>
        </v-row>

        <v-row>
          <v-card style="width: 100%" elevation="0">
            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-account</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.firstName"
                    label="First Name: "
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.firstName }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >First Name</v-card-text
                  >
                </template>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-account-outline</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.lastName"
                    label="Last Name: "
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.lastName }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Last Name</v-card-text
                  >
                </template>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-book-open</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.bio"
                    label="Bio: "
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.bio }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Bio</v-card-text
                  >
                </template>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-gender-male-female</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.gender"
                    label="Gender"
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.gender }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Gender</v-card-text
                  >
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-calendar</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.birthdate"
                    label="Birthdate"
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ formatDate(user.birthdate) }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Birthdate</v-card-text
                  >
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-human-cane</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <v-card-text
                  style="padding: 3px 0; font-size: 16px; font-weight: bold"
                  >{{ calculateAge(user.birthdate) }}</v-card-text
                >
                <v-card-text style="padding: 3px 0; font-size: 14px"
                  >Age</v-card-text
                >
              </v-col>
            </v-row>
          </v-card>
        </v-row>

        <v-row>
          <v-card-title style="padding-left: 0"> Address </v-card-title>
        </v-row>

        <v-row>
          <v-card style="width: 100%" elevation="0">
            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-earth</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.country"
                    label="Country"
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.country }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Country</v-card-text
                  >
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-map</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.province"
                    label="Province"
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.province }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Province</v-card-text
                  >
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-city</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.hometown"
                    label="Hometown"
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.hometown }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Hometown</v-card-text
                  >
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-map-marker</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    v-model="user.brgy"
                    label="Barangay"
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >{{ user.brgy }}</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Barangay</v-card-text
                  >
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-row>

        <v-row>
          <v-card-title style="padding-left: 0">
            Account Settings
          </v-card-title>
        </v-row>

        <v-row>
          <v-card style="width: 100%" elevation="0">
            <v-row>
              <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                <v-icon size="50" color="blue">mdi-lock</v-icon>
              </v-col>
              <v-col
                cols="10"
                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"
              >
                <template v-if="isEditing">
                  <v-text-field
                    type="password"
                    v-model="user.password"
                    label="Password"
                    variant="outlined"
                    dense
                  ></v-text-field>

                  <v-text-field
                    type="password"
                    v-model="newPassword"
                    label="New Password"
                    variant="outlined"
                    dense
                  ></v-text-field>
                </template>
                <template v-else>
                  <v-card-text
                    style="padding: 3px 0; font-size: 16px; font-weight: bold"
                    >********</v-card-text
                  >
                  <v-card-text style="padding: 3px 0; font-size: 14px"
                    >Password</v-card-text
                  >
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>

      <v-col v-if="isEditing" style="padding: 0">
        <v-row style="margin: 20px 0 0 0">
          <v-col style="padding-left: 0">
            <v-btn width="100%" @click="isEditing = false" color="red"
              >Cancel Edit</v-btn
            >
          </v-col>
          <v-col style="padding-right: 0">
            <v-btn type="submit" width="100%" color="primary"
              >Save Changes</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-card>

    <v-card elevation="4" style="padding: 30px; margin: 20px 10px; width: 100%">
      <v-row style="margin: 20px 0">
        <v-btn width="100%" @click="isEditing = true" color="secondary"
          >Edit Profile</v-btn
        >
      </v-row>

      <v-row style="margin: 20px 0">
        <v-btn width="100%" color="red" @click="deleteUser"
          >Delete Profile</v-btn
        >
      </v-row>

      <v-row style="margin: 20px 0">
        <v-btn width="100%" color="white">Log Out</v-btn>
      </v-row>
    </v-card>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
      isEditing: false,
      newPassword: "",
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

    formatDate(birthdate) {
      if (!birthdate) return "N/A"; // Handle empty or null birthdates
      const date = new Date(birthdate);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    calculateAge(birthdate) {
      if (!birthdate) return null; // Handle null or undefined input
      const birthDateObj = new Date(birthdate);
      const today = new Date();

      let age = today.getFullYear() - birthDateObj.getFullYear();
      const isBeforeBirthday =
        today.getMonth() < birthDateObj.getMonth() ||
        (today.getMonth() === birthDateObj.getMonth() &&
          today.getDate() < birthDateObj.getDate());

      // Subtract 1 if the current date is before the birthday
      if (isBeforeBirthday) {
        age -= 1;
      }

      return age;
    },

    deleteUser() {
      const userId = this.$route.params.userId;

      if (
        confirm(
          "Are you sure you want to delete this profile? This action cannot be undone."
        )
      ) {
        axios
          .delete(`http://127.0.0.1:8000/api/user/${userId}`)
          .then((response) => {
            if (response.data.statusCode === 200) {
              alert("User successfully deleted.");
              this.$router.push("/users"); // Redirect to users list or another route
            } else {
              console.error(response.data.message);
              alert("Failed to delete user. Please try again.");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
          });
      }
    },

    updateProfile() {
      const userId = this.$route.params.userId;

      // Make sure to handle the API URL and data structure
      axios
        .put(`http://127.0.0.1:8000/api/user/${userId}`, this.user)
        .then((response) => {
          if (response.data.statusCode === 200) {
            alert("Profile successfully updated.");
            this.isEditing = false; // Exit edit mode after successful update
            this.fetchUser();
          } else {
            this.fetchUser();
            this.isEditing = false; // Exit edit mode after successful update
          }
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          alert("An error occurred while updating the profile.");
        });
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>