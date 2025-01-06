<template>
  <div>
    <v-card
      elevation="4"
      style="padding: 30px; margin-top: 20px; width: 100%"
      v-for="(post, index) in posts"
      :key="index"
    >
      <v-col>
        <v-row align="center" justify="space-between">
          <!-- Left Section: User Info -->
          <v-row align="center">
            <v-avatar size="40" class="mr-3">
              <img
                width="40px"
                v-if="post.user.profilePicture"
                :src="post.user.profilePicture"
                alt="Profile Picture"
              />
              <v-icon v-else size="40">mdi-account-circle</v-icon>
            </v-avatar>
            <div>
              <strong
                >{{ post.user.firstName }} {{ post.user.lastName }}</strong
              >
              <p class="text-muted" style="margin: 0; font-size: 12px">
                Posted on {{ post.createdAt }}
              </p>
            </div>
          </v-row>

          <!-- Right Section: Menu -->
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
        </v-row>

        <v-divider class="my-4"></v-divider>

        <!-- Post Content -->
        <v-row>
          <img width="100%" height="550" :src="post.image" alt="" />
        </v-row>
        <v-row style="margin-top: 25px">{{ post.caption }}</v-row>

        <!-- Reactions Section -->
        <v-row>
          <v-card elevation="0" style="padding: 10px 0">
            <v-row>
              <v-col>
                <v-icon size="32" color="red">mdi-heart</v-icon> 100
              </v-col>
              <v-col>
                <v-icon size="32" color="blue" @click="toggleComments"
                  >mdi-comment-outline</v-icon
                >
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
              <v-text-field
                label="Write a comment..."
                v-model="newComment"
                auto-grow
                variant="outlined"
                dense
              ></v-text-field>
              <v-btn color="primary" class="mt-2" @click="addComment">
                Comment
              </v-btn>

              <v-divider class="my-4"></v-divider>

              <div v-if="comments.length > 0">
                <div
                  v-for="(comment, index) in comments"
                  :key="index"
                  style="margin-bottom: 10px"
                >
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
  </div>
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
      const userId = this.$route.params.userId;

      axios
        .get(`http://127.0.0.1:8000/api/posts/user/${userId}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            // Reverse the order of the posts array
            this.posts = response.data.reverse();

            // Fetch additional data for each post
            this.posts.forEach((post, index) => {
              console.log(this.posts[index]);
              this.fetchPostImage(post.postId, index); // Fetch images for each post
              this.fetchProfile(post.user.userId, index); // Fetch profile for each post
            });
          } else {
            console.error("No posts found");
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    },
    fetchPostImage(postId, index) {
      axios
        .get(`http://127.0.0.1:8000/api/posts/${postId}/image`, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          if (response.status === 200) {
            const imageBlob = new Blob([response.data], { type: "image/jpeg" });
            const imageUrl = URL.createObjectURL(imageBlob);

            console.log(this.posts[index]);
            // Update the image property of the specific post
            this.posts[index] = { ...this.posts[index], image: imageUrl };
          } else {
            console.error("Error: Invalid response for image");
          }
        })
        .catch((error) => {
          console.error("Error fetching post image:", error);
        });
    },
    fetchProfile(userId, postIndex) {
      axios
        .get(`http://127.0.0.1:8000/api/user/profile/${userId}`, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          if (response.status === 200) {
            const imageBlob = new Blob([response.data], { type: "image/jpeg" });
            const imageUrl = URL.createObjectURL(imageBlob);

            // Update the profile picture for the corresponding post
            this.posts[postIndex] = {
              ...this.posts[postIndex],
              user: { ...this.posts[postIndex].user, profilePicture: imageUrl },
            };
          } else {
            console.error("Error fetching profile picture");
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile picture:", error);
        });
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>


