<script setup lang="ts">
import { reactive } from "vue";

import AppDialog from "@/components/AppDialog/AppDialog.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";

const msg = `
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
  Dignissimos eius dolores omnis animi similique necessitatibus, 
  provident totam, eum velit, eos ad delectus vero sint earum impedit amet. 
  Accusantium, facere sed.
`;

const state = reactive({
  isDialogOpen: false,
});
</script>

<template>
  <BaseLayout
    title="Overview"
    class="tw-space-y-4"
  >
    <p v-text="msg"></p>
    <div
      class="tw-border tw-rounded tw-border-gray-400 tw-p-4 tw-space-x-2 w-fit"
    >
      <v-btn @click="state.isDialogOpen = true">Dialog</v-btn>
      <v-btn-base>Useless</v-btn-base>
    </div>
  </BaseLayout>

  <AppDialog
    :visible="state.isDialogOpen"
    title="Title can be really long like this one and it should be fit"
    @close="state.isDialogOpen = false"
  >
    <p
      v-for="i in 10"
      :key="i"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quis?
      Exercitationem quod aspernatur perferendis tempora molestiae voluptatum
      doloribus commodi iste aliquid, esse repellendus eaque cum numquam,
      praesentium odit, dolor at molestias eius voluptatibus. Unde aliquid sed
      vero iste repellendus a officiis, repudiandae natus itaque fugiat
      doloribus velit voluptatum illo. Nisi?
    </p>
    <template #actions>
      <v-btn @click="state.isDialogOpen = false">Button</v-btn>
    </template>
  </AppDialog>
</template>
