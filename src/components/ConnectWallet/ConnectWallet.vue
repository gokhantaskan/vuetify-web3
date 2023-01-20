<script setup lang="ts">
import { debounce } from "lodash";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

import { useWeb3Provider } from "@/composables/useWeb3Provider";
import { SUPPORTED_NETWORKS } from "@/constants/blockchain";
import { useAppStore } from "@/stores/app";
import { numberToHex } from "@/utils/format";
import { trimText } from "@/utils/trim_text";

import AccountDialog from "../AccountDialog/AccountDialog.vue";
import ConnectBtn from "../ConnectBtn/ConnectBtn.vue";

const { web3Provider } = useWeb3Provider();
const { address, chainId, ens } = storeToRefs(useAppStore());
const { setEns } = useAppStore();

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
      } else {
        try {
          setEns(await web3Provider?.lookupAddress(address.value));
        } catch (e: any) {
          setEns(null);
          console.error("ENS resolve error: ", e);
        }
      }
    },
    250,
    { leading: false, trailing: true }
  )
);
</script>

<template>
  <template v-if="!web3Provider">
    <ConnectBtn icon-only />
  </template>
  <template v-else>
    <v-btn
      variant="tonal"
      color="white"
      @click="() => (dialog = true)"
    >
      {{ ens || trimText(address) }}
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
