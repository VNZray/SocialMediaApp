<template>
    <v-card elevation="0" style="padding-left:10px; margin: 20px 0">
      <v-layout>
        <v-navigation-drawer
          floating
          permanent
          width="300"
        >
          <v-list
            density="compact"
            nav
          >
            <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 250px"></v-main>
      </v-layout>
    </v-card>
  </template>