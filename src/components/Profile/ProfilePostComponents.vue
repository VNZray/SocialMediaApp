<template>
  <v-card elevation="4" style="padding: 30px; margin: 20px 10px; width: 100%">
    <v-col>
      <v-row align="center" justify="space-between">
        <!-- Left Section: User Info -->
        <v-row align="center">
          <v-avatar size="40" class="mr-3">
            <v-icon size="40">mdi-account-circle</v-icon>
          </v-avatar>
          <div>
            <strong>{{ postUser }}</strong>
            <p class="text-muted" style="margin: 0; font-size: 12px">
              Posted on {{ postDate }}
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
        <v-card
          width="100%"
          height="550"
          style="background-color: gray; border-radius: 6px"
        ></v-card>
      </v-row>
      <v-row style="margin-top: 25px">Caption:</v-row>

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
</template>

<script>
export default {
  data() {
    return {
      showComments: false,
      newComment: "",
      comments: [],
      postUser: "Rayven Clores",
      postDate: new Date().toLocaleDateString(), // Example date, can be dynamic
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
  },
};
</script>


