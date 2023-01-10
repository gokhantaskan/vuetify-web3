<script setup lang="ts">
import { mdiMagnify } from "@mdi/js";
import { ref } from "vue";

const drawer = ref<boolean>(false);
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon :icon="mdiMagnify"></v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <!--  -->
    </v-navigation-drawer>

    <v-main :scrollable="true">
      <div class="tw-container tw-mx-auto">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>
