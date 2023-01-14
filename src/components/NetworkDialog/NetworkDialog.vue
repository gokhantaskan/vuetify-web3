<script setup lang="ts">
import { useOnboard } from "@web3-onboard/vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { NETWORK_ICON, SUPPORTED_NETWORKS } from "@/constants/blockchain";
import { useAppStore } from "@/stores/app";
import { hexToNumber, numberToHex } from "@/utils/format";

const { setChain, alreadyConnectedWallets } = useOnboard();
const { chainId } = storeToRefs(useAppStore());

const dialog = ref(false);
const overlay = ref(false);

const switchChain = async (
  network: (typeof SUPPORTED_NETWORKS)[keyof typeof SUPPORTED_NETWORKS]
) => {
  console.log(network.chainId);
  console.log(numberToHex(chainId.value));
  overlay.value = true;

  try {
    await setChain({
      chainId: network.chainId,
      wallet: alreadyConnectedWallets.value[0],
    });

    dialog.value = false;
  } catch (error) {
    console.error("Switch chain error: ", error);
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
    <v-card :elevation="2">
      <div class="tw-p-4">
        <h2 class="tw-mb-4">Select Network</h2>

        <div class="tw-grid tw-grid-col-1 md:tw-grid-cols-2 tw-gap-4">
          <template
            v-for="network in SUPPORTED_NETWORKS"
            :key="network"
          >
            <button
              :class="[
                'tw-transition-colors',
                'tw-p-2 tw-rounded tw-cursor-pointer',
                'tw-flex tw-items-center tw-justify-start tw-gap-2',
                network.chainId === numberToHex(chainId)
                  ? 'tw-border-sky-500 tw-bg-sky-500/10'
                  : [
                      'tw-border tw-border-slate-600',
                      'hover:tw-bg-slate-700 focus:tw-bg-slate-700',
                    ],
              ]"
              :disabled="network.chainId === numberToHex(chainId)"
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
                <span>{{ network.chainName }}</span>
              </div>
              <template v-if="network.chainId === numberToHex(chainId)">
                <div
                  class="tw-bg-green-500 tw-w-[16px] tw-h-[16px] tw-rounded-full"
                ></div>
              </template>
            </button>
          </template>
        </div>
      </div>

      <v-overlay
        v-model="overlay"
        contained
        class="tw-items-center tw-justify-center"
      >
        <v-progress-circular
          color="primary"
          indeterminate
          size="48"
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog-base>
</template>
