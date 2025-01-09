<template>
  <v-card elevation="3" height="50px auto" style="padding: 14px 0">
    <v-row>
      <v-col cols="3" style="padding-left: 28px">
        <v-text-field prepend-inner-icon="mdi-magnify" placeholder="Search" variant="outlined" outlined dense
          hide-details class="search"></v-text-field>
      </v-col>

      <v-col cols="6">
        <v-container style="padding: 0; height: 100%">
          <v-tabs v-model="tabs" color="primary" grow style="height: 100%">
            <v-tab style="height: 100%" :value="1">
              <v-icon size="30">mdi-home</v-icon>
            </v-tab>
            <v-tab style="height: 100%" :value="2">
              <v-icon size="30">mdi-account-group</v-icon>
            </v-tab>
            <v-tab style="height: 100%" :value="3">
              <v-icon size="30">mdi-video</v-icon>
            </v-tab>
            <v-tab style="height: 100%" :value="4">
              <v-icon size="30">mdi-bell</v-icon>
            </v-tab>
          </v-tabs>
        </v-container>
      </v-col>

      <v-col cols="3" class="d-flex justify-end align-right">
        <v-container class="text-right" style="padding: 0; margin-right: 10px">
          <v-btn style="height: 100%" elevation="0">
            {{ user.firstName }} {{ user.lastName }}
            <v-avatar style="margin-left: 10px;" size="40">
              <img style="width: 40px;" :src="userProfile.profilePicture" alt="Profile Picture" />
            </v-avatar>
            <v-menu activator="parent">
              <v-list>
                <v-list-item link @click="routeToProfile">
                  <v-list-item-title>
                    <v-avatar size="40">
                      <img :src="userProfile.profilePicture" style="width: 40px;" alt="Profile Picture" />
                    </v-avatar>
                    {{ user.firstName }} {{ user.lastName }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link to="/">
                  <v-list-item-title>
                    <v-icon size="32" class="ml-2">mdi-logout</v-icon>
                    Log Out
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </v-container>
      </v-col>
    </v-row>
  </v-card>

  <v-row>
    <v-col cols="3"> </v-col>

    <v-col cols="6">
      <v-card elevation="0" style="padding: 0; margin: 5px 0px">
        <v-tabs-window v-model="tabs">
          <v-tabs-window-item v-if="tabs === 1" :key="1" :value="1">
            <v-container style="padding-top: 0;">
              <CreatePostComponent />
              <PostComponents />
            </v-container>
          </v-tabs-window-item>

          <v-tabs-window-item v-if="tabs === 2" :key="2" :value="2">
            <v-container style="padding-top: 0;">
              <FriendRequest />
              <FriendSuggestion :users="filteredUsers" />
            </v-container>
          </v-tabs-window-item>
          <v-tabs-window-item v-if="tabs === 3" :key="3" :value="3">
            Videos
          </v-tabs-window-item>
          <v-tabs-window-item v-if="tabs === 4" :key="4" :value="4">
            Notifications
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-col>

    <v-col cols="3"> </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  props: ['users'], // Accept the users prop here

  data() {
    return {
      tabs: 1,
      showComments: false,
      newComment: "",
      comments: [],
      postUser: "Rayven Clores",
      postDate: new Date().toLocaleDateString(), // Example date, can be dynamic
      user: {},
      userProfile: {},
      users: [], // Add this line to initialize the users array
    };
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    addComment() {
      if (this.newComment.trim() !== "") {
        this.comments.push(this.newComment.trim());
        this.newComment = "";
      }
    },
    routeToProfile() {
      const userId = this.$route.params.userId;
      this.$router.push(`/profile/${userId}`);
    },

    fetchUser() {
      const userId = this.$route.params.userId;
      axios
        .get(`http://127.0.0.1:8000/api/user/${userId}`)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.userProfile = response.data.data;
            this.user = response.data.data.userDetails;
          } else {
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    },
    async fetchUsers() {
      try {
        const response = await axios.get("/users"); // Endpoint to get all users
        if (response.data.statusCode === 200) {
          const userId = String(this.$route.params.userId);  // Ensure userId is a string

          // Filter out the user with the specified userId
          this.users = response.data.data.filter(user => String(user.userId) !== userId);
        } else {
          console.error("No users found or an error occurred.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
  },
  computed: {
    filteredUsers() {
      const userId = this.$route.params.userId;
      return this.users.filter(user => user.userId !== userId);
    },
  },

  created() {
    this.fetchUser();
    // this.fetchProfile();
    this.fetchUsers();
  },
};
</script>
