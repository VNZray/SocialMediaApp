<template>
  <form @submit.prevent="createPost" method="post">
    <v-card elevation="4" style="padding: 30px; margin-top: 20px; width: 100%">
      <v-col>
        <v-row>
          <v-col
            cols="9"
            style="padding-left: 0; padding-top: 0; padding-bottom: 0"
          >
            <v-text-field
              v-model="post.caption"
              label="What's on your mind?"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
            style="padding-right: 0; padding-top: 0; padding-bottom: 0"
          >
            <v-file-input
              v-model="post.image"
              label="Upload File"
              prepend-icon="mdi-image"
              variant="outlined"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col style="padding: 0">
            <v-btn type="submit" color="primary">Post</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </form>
</template>
  
<script>
import axios from "axios";
import moment from "moment";

axios.defaults.baseURL = "http://127.0.0.1:8000/api"; // Set the base URL of your backend API
axios.defaults.headers.common["Content-Type"] = "application/json"; // Default Content-Type header

export default {
  data() {
    return {
      post: {
        caption: "",
        image: null,
      },
    };
  },
  methods: {
    async createPost() {
      const userId = this.$route.params.userId;
      // Reset error messages

      const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

      const formData = new FormData();

      const post = {
        caption: this.post.caption,
        createdAt: createdAt, //current date use moment
        user: { userId: userId }, // Send the user object instead of userId
    };

      formData.append("post", JSON.stringify(post)); // Add user data as JSON
      formData.append("imageFile", this.post.image); // Ensure you are adding the profile picture

      try {
        const response = await axios.post("/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          // refresh page
          window.location.reload();
        }
      } catch (error) {
        console.error("Error posting:", error.response || error);
        alert("Manually modify the type of image_data to mediumblob or longblob in xampp php admin");
      }
    },
  },
};
</script>
  
  