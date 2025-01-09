<template>
  <v-card elevation="4" style="padding: 30px; margin-top: 20px; width: 100%">
    <v-col>
      <!--Friend Request-->
      <v-row>
        <v-card-title style="padding-left: 0">People you may know</v-card-title>
        <v-divider></v-divider>
      </v-row>

      <!--Friend Request List-->
      <v-row v-for="(friend, index) in friendList" :key="index">
        <v-card style="width: 100%; padding-top: 15px; padding-bottom: 15px" elevation="0">
          <v-row>
            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
              <v-avatar style="margin-left: 0" size="50">
                <img style="width: 60px"
                  :src="friend.profilePicture || 'https://toolset.com/wp-content/uploads/2018/06/909657-profile_pic.png'"
                  alt="Profile Picture" />
              </v-avatar>
            </v-col>

            <v-col cols="5" style="padding-left: 0; padding-top: 16px; padding-bottom: 16px">
              <v-card-text style="padding: 3px 0; font-size: 16px; font-weight: bold">
                {{ friend.firstName }} {{ friend.lastName }}
              </v-card-text>
              <v-card-text v-if="friend.status !== 'PENDING' && friend.status !== 'ACCEPTED'"
                style="padding: 3px 0; font-size: 16px">Friend Suggestion</v-card-text>
              <v-card-text v-if="friend.status === 'PENDING'" style="padding: 3px 0; font-size: 16px">Send Friend
                Request</v-card-text>
              <v-card-text v-if="friend.status === 'ACCEPTED'" style="padding: 3px 0; font-size: 16px">You are now
                friends</v-card-text>
            </v-col>

            <v-col cols="3" style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"></v-col>

            <v-col cols="3" style="padding-top: 16px">
              <v-btn style="width: 100%;" v-if="friend.status !== 'PENDING' && friend.status !== 'ACCEPTED'"
                color="primary" @click="sendFriendRequest(friend.userId, index)">
                Add Friend
              </v-btn>

              <v-btn style="width: 100%;" v-else-if="friend.status === 'ACCEPTED'" color="error"
                @click="cancelFriendRequest(friend.friendshipId)">
                Remove Friend
              </v-btn>
            </v-col>
          </v-row>

          <v-divider></v-divider>
        </v-card>
      </v-row>
    </v-col>
  </v-card>
</template>

<script>

import axios from 'axios';
axios.defaults.baseURL = "http://127.0.0.1:8000/api"; // Set the base URL of your backend API

export default {
  data() {
    return {
      users: [],
      friendList: [], // User with friend request status
      requesterId: "", // Store the request
      loading: false, // Flag to indicate loading state
      error: null // Store error message if the request fails
    };
  },
  mounted() {
    this.getFriendList();
  },
  methods: {
    async getFriendList() {
      this.loading = true;
      this.error = null;

      const receiverId = this.$route.params.userId;

      try {
        const response = await axios.get(`/friendship/friends/${receiverId}`);
        this.friendList = response.data; // Set the fetched data to the friendList array

        // Use forEach to iterate over each request and extract necessary information
        this.friendList.forEach((request, index) => {
          // Assuming `request` has properties like `friendshipId`, `requesterId`, `receiverId`, etc.
          console.log(`Friendship ID: ${request.friendshipId}`);
          console.log(`Requester ID: ${request.requesterId}`);
          console.log(`Receiver ID: ${request.receiverId}`);
          console.log(`Status: ${request.status}`);
          console.log(`Created At: ${request.createdAt}`);
          console.log(`Updated At: ${request.updatedAt}`);
          this.fetchUser(request.requesterId, index)
        });

      } catch (error) {
        this.error = 'Failed to load friend requests';
      } finally {
        this.loading = false;
      }
    },
    async cancelFriendRequest(friendshipId) {
      try {
        const response = await axios.delete(`/friendship/remove/${friendshipId}`);
        this.getFriendList();
        if (response.status === 200) {

          this.getFriendList();
          console.log("Friend request canceled successfully:", response.data);
        } else {
          console.error("Error canceling friend request. Response status:", response.status);
        }
      } catch (error) {
        console.error("Error canceling friend request:", error);
      }
    },

    fetchUser(requesterId, requestIndex) {
      axios
        .get(`http://127.0.0.1:8000/api/user/${requesterId}`)
        .then((response) => {
          if (response.status === 200) {
            const userDetails = response.data.data.userDetails;
            const profilePicture = response.data.data.profilePicture;
            this.friendList[requestIndex] = {
              ...this.friendList[requestIndex],
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
              profilePicture: profilePicture,
            };
            console.log(
              `User details updated for post index ${requestIndex}:`,
              this.friendList[requestIndex]
            );

          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    },
  },
};
</script>
