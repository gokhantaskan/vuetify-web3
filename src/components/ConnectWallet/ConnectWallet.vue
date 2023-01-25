<script setup lang="ts">
import { debounce } from "lodash";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

import AccountDialog from "@/components/AccountDialog/AccountDialog.vue";
import ConnectBtn from "@/components/ConnectBtn/ConnectBtn.vue";
import JazzIcon from "@/components/JazzIcon/JazzIcon.vue";
import { useBreakpoints } from "@/composables/useBreakpoints";
import { useWeb3Provider } from "@/composables/useWeb3Provider";
import { SUPPORTED_NETWORKS } from "@/constants/blockchain";
import { useAppStore } from "@/stores/app";
import { numberToHex } from "@/utils/format";
import { trimText } from "@/utils/trim_text";

const { web3Provider } = useWeb3Provider();
const { isMobile, isDesktop } = useBreakpoints();
const { address, chainId, ens } = storeToRefs(useAppStore());

const dialog = ref(false);

const currentChain = computed(() =>
  Object.values(SUPPORTED_NETWORKS).find(
    n => n.chainId === numberToHex(chainId.value)
  )
);

watch(
  web3Provider,
  debounce(
    async web3Provider => {
      if (!web3Provider) {
        dialog.value = false;
      }
    },
    250,
    { leading: false, trailing: true }
  )
);
</script>

<template>
  <template v-if="!web3Provider">
    <ConnectBtn :icon="isMobile" />
  </template>
  <template v-else>
    <v-btn
      variant="tonal"
      color="white"
      :icon="isMobile"
      :size="isMobile ? 'small' : undefined"
      @click="() => (dialog = true)"
    >
      <span class="tw-inline-flex tw-items-center tw-gap-2">
        <JazzIcon :address="address" />
        <span v-if="isDesktop">{{ ens || trimText(address) }}</span>
      </span>
    </v-btn>
  </template>
  <!-- Dialog -->
  <v-dialog-base
    v-model="dialog"
    max-width="480px"
  >
    <AccountDialog :current-chain="currentChain" />
  </v-dialog-base>
</template>
