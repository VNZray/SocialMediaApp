<template>
    <v-card elevation="4" style="padding: 30px; margin-top: 20px; width: 100%">
        <v-col>
            <!-- Friend Request -->
            <v-row>
                <v-card-title style="padding-left: 0"> Friend Request </v-card-title>
                <v-divider></v-divider>
            </v-row>

            <v-row v-for="(request, index) in friendRequests" :key="index">
                <v-col >
                    <v-card style="width: 100%; padding-top: 15px; padding-bottom: 15px" elevation="0">
                        <v-row>
                            <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                                <v-avatar style="margin-left: 0" size="50">
                                    <img style="width: 60px" :src="request.profilePicture" alt="Profile Picture" />
                                </v-avatar>
                            </v-col>
                            <v-col cols="5" style="padding-left: 0; padding-top: 16px; padding-bottom: 16px">
                                <v-card-text style="padding: 3px 0; font-size: 16px; font-weight: bold">
                                    {{ request.firstName }} {{ request.lastName }}
                                </v-card-text>
                                <v-card-text style="padding: 3px 0; font-size: 16px">Sent you a Friend
                                    Request</v-card-text>
                            </v-col>

                            <v-col cols="3" style="padding-left: 0; padding-top: 16px; padding-bottom: 16px">
                                <v-btn @click="deleteRequest(request.friendshipId)" style="height: 70%;" width="100%"
                                    color="grey">Delete Request</v-btn>
                            </v-col>

                            <v-col cols="3"
                                style="padding-left: 0; padding-top: 16px; padding-bottom: 16px">
                                <v-btn variant="outlined" @click="acceptRequest(request.friendshipId)" style="height: 70%;" width="100%"
                                    color="primary">Confirm</v-btn>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Error Message -->
            <v-row v-if="error">
                <v-col cols="12" class="text-center">
                    <v-alert type="error">{{ error }}</v-alert>
                </v-col>
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
            friendRequests: [], // Store the friend requests
            requesterId: "", // Store the request
            loading: false, // Flag to indicate loading state
            error: null // Store error message if the request fails
        };
    },
    mounted() {
        this.getFriendRequests();
    },
    methods: {
        async getFriendRequests() {
            this.loading = true;
            this.error = null;

            const receiverId = this.$route.params.userId;

            try {
                const response = await axios.get(`/friendship/requests/${receiverId}`);
                this.friendRequests = response.data; // Set the fetched data to the friendRequests array

                // Use forEach to iterate over each request and extract necessary information
                this.friendRequests.forEach((request, index) => {
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

        fetchUser(requesterId, requestIndex) {
      axios
        .get(`http://127.0.0.1:8000/api/user/${requesterId}`)
        .then((response) => {
          if (response.status === 200) {
            const userDetails = response.data.data.userDetails;
            const profilePicture = response.data.data.profilePicture;
            this.friendRequests[requestIndex] = {
              ...this.friendRequests[requestIndex],
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                profilePicture: profilePicture,
            };
            console.log(
              `User details updated for post index ${requestIndex}:`,
              this.friendRequests[requestIndex]
            );
            
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    },

        async deleteRequest(requestId) {
            try {
                await axios.delete(`/friendship/cancel/${requestId}`);
                this.getFriendRequests(); // Refresh the list after deletion
            } catch (error) {
                this.error = 'Failed to delete friend request';
            }
        },
        async acceptRequest(requestId) {
            try {
                await axios.post(`/friendship/accept/${requestId}`);
                this.getFriendRequests(); // Refresh the list after acceptance
            } catch (error) {
                this.error = 'Failed to accept friend request';
            }
        }
    }
};
</script>