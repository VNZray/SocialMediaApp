<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card elevation="6" width="450" style="padding: 16px">
      <form action="">
        <!-- Title -->
        <v-card-title class="text-center" style="font-size: 32px"
          >Log In</v-card-title
        >

        <!-- Input Fields -->
        <v-text-field variant="outlined" label="Email"></v-text-field>
        <v-text-field
          variant="outlined"
          label="Password"
          type="password"
        ></v-text-field>

        <!-- Checkboxes -->
        <v-checkbox style="margin-top: -10px;" label="Remember Me"></v-checkbox>

        <!-- Buttons -->
        <v-btn color="primary" style="margin:-10px 0 8px 0" width="100%">Log In</v-btn>
        <v-btn color="secondary" to="register" style="margin: 8px 0" width="100%">Sign Up</v-btn>
      </form>
    </v-card>
  </v-container>
</template>
  