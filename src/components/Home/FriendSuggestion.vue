<template>
    <v-card elevation="4" style="padding: 30px; margin-top: 20px; width: 100%">
        <v-col>
            <!--Friend Request-->
            <v-row>
                <v-card-title style="padding-left: 0">People you may know</v-card-title>
                <v-divider></v-divider>
            </v-row>

            <!--Friend Request List-->
            <v-row v-for="(user, index) in users" :key="index">
                <v-card style="width: 100%; padding-top: 15px; padding-bottom: 15px" elevation="0">
                    <v-row>
                        <v-col cols="1" style="padding-top: 16px; padding-bottom: 16px">
                            <v-avatar style="margin-left: 0" size="50">
                                <img style="width: 60px"
                                    :src="user.profilePicture || 'https://toolset.com/wp-content/uploads/2018/06/909657-profile_pic.png'"
                                    alt="Profile Picture" />
                            </v-avatar>
                        </v-col>

                        <v-col cols="5" style="padding-left: 0; padding-top: 16px; padding-bottom: 16px">
                            <v-card-text style="padding: 3px 0; font-size: 16px; font-weight: bold">
                                {{ user.firstName }} {{ user.lastName }}
                            </v-card-text>
                            <v-card-text v-if="user.friendshipStatus !== 'PENDING' && user.friendshipStatus !== 'ACCEPTED'" style="padding: 3px 0; font-size: 16px">Friend Suggestion</v-card-text>
                            <v-card-text v-if="user.friendshipStatus === 'PENDING'" style="padding: 3px 0; font-size: 16px">Send Friend Request</v-card-text>
                        </v-col>

                        <v-col cols="3" style="padding-left: 0; padding-top: 16px; padding-bottom: 16px"></v-col>

                        <v-col cols="3" style="padding-top: 16px">
                            <v-btn style="width: 100%;" v-if="user.friendshipStatus !== 'PENDING' && user.friendshipStatus !== 'ACCEPTED'"
                                color="primary" @click="sendFriendRequest(user.userId, index)">
                                Add Friend
                            </v-btn>

                            <v-btn style="width: 100%;"  v-else-if="user.friendshipStatus === 'PENDING'" color="error"
                            @click="cancelFriendRequest(user.userId, index)">
                            Cancel Request
                            </v-btn>

                            <v-btn style="width: 100%;"  v-else-if="user.friendshipStatus === 'ACCEPTED'" color="success" disabled>
                                Friends
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
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api"; // Set the base URL of your backend API
axios.defaults.headers.common["Content-Type"] = "application/json"; // Default Content-Type header

export default {
    data() {
        return {
            currentUserId: null, // ID extracted from the URL
            friendship: [], // User with friend request status
        };
    },
    methods: {
        async sendFriendRequest(receiverId, index) {
    try {
        // Update the user's friendshipStatus immediately
        this.users[index].friendshipStatus = 'PENDING';

        const response = await axios.post("/friendship/send", {
            requesterId: this.currentUserId,
            receiverId: receiverId,
        });

        // Check if the response is successful (status 201 for resource creation)
        if (response.status === 201) {
            console.log("Friend request sent successfully:", response.data);
            // No need to update friendshipStatus again as it's already updated
        } else {
            console.error("Error sending friend request. Response status:", response.status);
            // In case of failure, revert the friendship status
            this.users[index].friendshipStatus = 'NONE';
        }
    } catch (error) {
        console.error("Error sending friend request:", error);
        // In case of error, revert the friendship status
        this.users[index].friendshipStatus = 'NONE';
    }
}
,
async cancelFriendRequest(receiverId, index) {
    try {
        const response = await axios.delete(`/friendship/cancel/${this.currentUserId}/${receiverId}`);

        if (response.status === 200) {
            console.log("Friend request canceled successfully:", response.data);
            // Update the user's friendshipStatus to 'NONE'
            this.users[index].friendshipStatus = 'NONE';
        } else {
            console.error("Error canceling friend request. Response status:", response.status);
        }
    } catch (error) {
        console.error("Error canceling friend request:", error);
    }
},
        async fetchFriendship(userId, index) {
            try {
                // Fetch friendship status from the backend
                const response = await axios.get(`/friendship/status/full/${this.currentUserId}/${userId}`);

                this.users[index].friendshipStatus = response.data.status;

                console.log(response.data.status)
            } catch (error) {
                console.error("Error fetching friendship status:", error);
                // Optionally set a default value or handle error state
                this.users[index].friendshipStatus = "NONE";
            }
        },
    },
    props: {
        users: {
            type: Array,
            required: true,
        },
    },
    mounted() {
        this.currentUserId = this.$route.params.userId;
        this.users.forEach((user, index) => {
            console.log(user.userId, index)
            console.log(user.userId, index)
            console.log(user.userId, index)
            this.fetchFriendship(user.userId, index);
        });
    },
};
</script>