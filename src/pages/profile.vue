<template>
  <v-row>
    <v-col cols="3"> </v-col>

    <v-col cols="6">
      <v-card elevation="0" style="padding: 0; margin: 0px">
        <v-container style="padding-top: 0; padding-bottom: 0">
          <v-card
            elevation="4"
            style="padding: 30px; margin: 0px 10px; width: 100%"
          >
            <v-row>
              <v-col cols="2">
                <img
                  style="
                    width: 100px;
                    border-radius: 50%;
                    background-color: gray;
                  "
                  src="../assets/logo.png"
                  alt=""
                />
              </v-col>

              <v-col cols="9" style="padding: 16px 0">
                <h2 style="margin-top: 20px">Rayven Clores</h2>
                <p>Hello World!</p>
              </v-col>

              <v-col cols="1">
                <v-btn icon @click="goBack" to="/home">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-container>

        <v-container style="padding-top: 0; padding-bottom: 0px">
          <v-card
            elevation="4"
            style="padding: 0px; margin: 0px 10px; width: 100%; height: 50px"
          >
            <v-tabs v-model="tabs" color="primary" grow style="height: 100%">
              <v-tab style="height: 100%" :value="1"> Posts </v-tab>
              <v-tab style="height: 100%" :value="2"> Friends </v-tab>
              <v-tab style="height: 100%" :value="3"> About </v-tab>
            </v-tabs>
          </v-card>
        </v-container>

        <v-tabs-window v-model="tabs" style="width: 100%">
          <v-tabs-window-item
            v-if="tabs === 1"
            :key="1"
            :value="1"
            style="width: 100%"
          >
            <v-container style="padding-top: 0"> <ProfilePostComponents /> </v-container>
          </v-tabs-window-item>

          <v-tabs-window-item
            v-if="tabs === 2"
            :key="2"
            :value="2"
            style="width: 100%"
          >
          <v-container style="padding-top: 0"> <FriendsComponents /> </v-container>
        </v-tabs-window-item>

          <v-tabs-window-item
            v-if="tabs === 3"
            :key="3"
            :value="3"
            style="width: 100%"
          >
          <v-container style="padding-top: 0"> <AboutComponents /> </v-container>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-col>

    <v-col cols="3"> </v-col>
  </v-row>
</template>

<script>

export default {
  data() {
    return {
      tabs: 1,
      showComments: false,
      newComment: "",
      comments: [],
      postUser: "Rayven Clores",
      postDate: new Date().toLocaleDateString(),
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