<template>
  <v-card elevation="4" style="padding: 30px; margin-top: 20px; width: 100%" v-for="(post, index) in posts"
    :key="index">
    <v-col>
      <v-row align="center" justify="space-between">
        <!-- Left Section: User Info -->
        <v-col>
          <v-row align="center">
            <v-avatar size="40" class="mr-3">
              <img width="40px" v-if="post.profilePicture" :src="post.profilePicture" />
              <v-icon v-else size="40">mdi-account-circle</v-icon>
            </v-avatar>
            <div>
              <strong>{{ post.firstName }} {{ post.lastName }}</strong>
              <p class="text-muted" style="margin: 0; font-size: 12px">
                Posted on {{ post.postedAt }}
              </p>
            </div>
          </v-row>
        </v-col>

        <v-col cols="1" style="padding-right: 0">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>Edit Post</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Delete Post</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Report Post</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <!-- Right Section: Menu -->
      </v-row>

      <v-divider class="my-4"></v-divider>

      <!-- Post Content -->
      <v-row>
        <v-card width="100%" style="height: 700px">
          <img width="100%" height="100%" :src="post.postImage" alt="" />
        </v-card>
      </v-row>
      <v-row style="margin-top: 25px">{{ post.caption }}</v-row>

      <!-- Reactions Section -->
      <v-row>
        <v-card elevation="0" style="padding: 10px 0; width: 30%">
          <v-row>
            <v-col>
              <v-icon @click="updateReactCounter(post.postId, post.reactionCount + 1)" size="32"
                color="red">mdi-heart</v-icon>
              {{ post.reactionCount }}
            </v-col>
            <v-col>
              <v-icon size="32" color="blue" @click="toggleComments">mdi-comment-outline</v-icon>
              100
            </v-col>
            <v-col>
              <v-icon size="32" color="green">mdi-share</v-icon> 100
            </v-col>
          </v-row>
        </v-card>
      </v-row>

      <!-- Comment Section -->
      <v-row v-if="showComments" style="margin-top: 25px">
        <v-col style="padding: 0">
          <v-card elevation="0" style="padding: 15px 0">
            <v-text-field label="Write a comment..." v-model="newComment" auto-grow variant="outlined"
              dense></v-text-field>
            <v-btn color="primary" class="mt-2" @click="addComment">
              Comment
            </v-btn>

            <v-divider class="my-4"></v-divider>

            <div v-if="comments.length > 0">
              <div v-for="(comment, index) in comments" :key="index" style="margin-bottom: 10px">
                <v-card style="padding: 10px">
                  <p>
                    <strong>User {{ index + 1 }}</strong>
                  </p>
                  <p>{{ comment }}</p>
                </v-card>
              </div>
            </div>

            <div v-else>
              <p class="text-center text-muted">
                No comments yet. Be the first to comment!
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showComments: false,
      newComment: "",
      comments: [],
      postUser: "Rayven Clores",
      postDate: new Date().toLocaleDateString(),
      posts: [], // Initialize as an array
      users: [], // Initialize as an array
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
    fetchPosts() {
      axios
        .get("http://127.0.0.1:8000/api/posts")
        .then((response) => {
          // Reverse the order of the posts array
          this.posts = response.data.data.reverse();
          console.log("Posts fetched:", this.posts);
          this.posts.forEach((post, index) => {
            // Fetch the user details for each post
            this.fetchUser(post.users.userId, index);
          });
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    },
    fetchUser(userId, postIndex) {
      axios
        .get(`http://127.0.0.1:8000/api/user/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            const userDetails = response.data.data.userDetails;
            const profilePicture = response.data.data.profilePicture;
            // Update the post with user details directly
            this.posts[postIndex] = {
              ...this.posts[postIndex],
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                profilePicture: profilePicture,
            };
            console.log(
              `User details updated for post index ${postIndex}:`,
              this.posts[postIndex]
            );
            
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    },
    updateReactCounter(postId, reactionCount) {
      axios
        .put(`/post/react/${postId}`, {
          reactionCount: reactionCount, // Integer value
        })
        .then((response) => {
          console.log("Reaction counter updated successfully:", response.data);
        })
        .catch((error) => {
          console.error(
            "Error updating reaction counter:",
            error.response?.data || error.message
          );
        });
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>
