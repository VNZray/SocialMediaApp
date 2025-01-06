<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card elevation="6" width="450" style="padding: 16px">
      <form @submit.prevent="logInAccount">
        <!-- Title -->
        <v-card-title class="text-center" style="font-size: 32px">Log In</v-card-title>

        <!-- Input Fields -->
        <v-text-field
          v-model="email"
          variant="outlined"
          label="Email"
          :error-messages="emailError ? 'Email is required' : ''"
        ></v-text-field>

        <v-text-field
          v-model="password"
          variant="outlined"
          label="Password"
          type="password"
          :error-messages="passwordError ? 'Password is required' : ''"
        ></v-text-field>

        <!-- Buttons -->
        <v-btn type="submit" color="primary" style="margin: -10px 0 8px 0" width="100%">Log In</v-btn>
        <v-btn color="secondary" to="register" style="margin: 8px 0" width="100%">Sign Up</v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      emailError: false,
      passwordError: false
    };
  },
  methods: {
    async logInAccount() {
      // Basic client-side validation
      this.emailError = !this.email;
      this.passwordError = !this.password;

      if (this.emailError || this.passwordError) return;

      const loginData = {
        email: this.email,
        password: this.password
      };

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);

        if (response.data.statusCode === 200) {
          alert("Login successful!");
          console.log(response.data.message);
          console.log("Status: " + response.data.statusCode);
          this.$router.push(`/home/${response.data.userId}`);
        } else {
          alert("Error: " + response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during login. Please try again later.");
      }
    }
  }
};
</script>
