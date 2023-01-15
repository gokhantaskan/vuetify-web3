<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { useWeb3Provider } from "@/composables/useWeb3Provider";
import { NETWORK_ICON, SUPPORTED_NETWORKS } from "@/constants/blockchain";
import { useAppStore } from "@/stores/app";
import { hexToNumber, numberToHex } from "@/utils/format";
import { switchToNetwork } from "@/utils/network";

type Network = (typeof SUPPORTED_NETWORKS)[keyof typeof SUPPORTED_NETWORKS];

const { web3Provider } = useWeb3Provider();
const { chainId } = storeToRefs(useAppStore());

const dialog = ref(false);
const overlay = ref(false);
const snackbar = ref(false);
const errorMsg = ref("");

const isCurrentNetwork = (network: Network) => {
  return (
    network.chainId.toLowerCase() === numberToHex(chainId.value).toLowerCase()
  );
};

const switchChain = async (network: Network) => {
  overlay.value = true;

  try {
    const provider = web3Provider.value?.provider;

    if (provider)
      await switchToNetwork({
        provider,
        chainId: hexToNumber(network.chainId),
      });

    dialog.value = false;
  } catch (error: any) {
    console.error("Switch chain error: ", error);

    snackbar.value = true;
    errorMsg.value = error.message;
  } finally {
    overlay.value = false;
  }
};
</script>

<template>
  <v-btn
    icon
    size="small"
    color="default"
    @click="() => (dialog = true)"
  >
    <img
      :src="NETWORK_ICON[chainId]"
      alt=""
      height="28"
    />
  </v-btn>

  <v-dialog-base
    v-model="dialog"
    max-width="640px"
  >
    <v-card
      :elevation="2"
      class="tw-relative"
    >
      <div class="tw-p-4">
        <h2 class="tw-mb-4">Select Network</h2>

        <div class="tw-grid tw-grid-col-1 md:tw-grid-cols-2 tw-gap-4">
          <template
            v-for="network in SUPPORTED_NETWORKS"
            :key="network"
          >
            <button
              v-ripple
              :class="[
                'tw-transition-colors',
                'tw-p-2 tw-rounded tw-border',
                'tw-flex tw-items-center tw-justify-start tw-gap-2',
                isCurrentNetwork(network)
                  ? 'tw-border-sky-500 tw-bg-sky-500/10'
                  : [
                      'tw-cursor-pointer',
                      'tw-border tw-border-slate-600',
                      'hover:tw-bg-slate-600/10 focus:tw-bg-slate-600/10',
                    ],
              ]"
              :disabled="isCurrentNetwork(network)"
              @click="switchChain(network)"
            >
              <div
                class="tw-flex tw-items-center tw-justify-start tw-gap-2 tw-flex-1"
              >
                <img
                  :src="NETWORK_ICON[hexToNumber(network.chainId)]"
                  :alt="network.chainName"
                  height="48"
                />
                <p>
                  <span class="tw-inline-block">{{ network.chainName }}</span>
                </p>
              </div>
              <template v-if="isCurrentNetwork(network)">
                <div
                  class="tw-bg-green-500 tw-w-[12px] tw-h-[12px] tw-rounded-full"
                ></div>
              </template>
            </button>
          </template>
        </div>
      </div>
    </v-card>
  </v-dialog-base>

  <v-snackbar
    v-model="snackbar"
    color="danger"
    :timeout="1231323"
  >
    {{ errorMsg }}

    <template #actions>
      <v-btn @click="() => (snackbar = false)"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
