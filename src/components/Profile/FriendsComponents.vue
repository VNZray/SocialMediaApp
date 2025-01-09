<template>
  <v-card elevation="4" style="padding: 30px; margin: 20px 10px; width: 100%">
    <v-col>
      <v-row align="center" justify="space-between">
        <!-- Left Section: User Info -->


        
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


