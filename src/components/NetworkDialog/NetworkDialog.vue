<script setup lang="ts">
import { mdiPulse } from "@mdi/js";
import { useOnboard } from "@web3-onboard/vue";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

import DialogCard from "@/components/DialogCard/DialogCard.vue";
import { NETWORK_ICON, SUPPORTED_NETWORKS } from "@/constants/blockchain";
// import { switchToNetwork } from "@/utils/network";
import { supportedNetworks } from "@/plugins/onboard";
import { useAppStore } from "@/stores/app";
import { hexToNumber, numberToHex } from "@/utils/format";

type Network = (typeof SUPPORTED_NETWORKS)[keyof typeof SUPPORTED_NETWORKS];

const { setChain, settingChain, alreadyConnectedWallets } = useOnboard();
// const { web3Provider } = useWeb3Provider();
const { chainId } = storeToRefs(useAppStore());

const dialog = ref(false);
const overlay = ref(false);
const snackbar = ref(false);
const errorMsg = ref("");

const networkIds = Object.values(SUPPORTED_NETWORKS).map(network =>
  network.chainId.toLowerCase()
);

const isNetworkSupported = computed(() =>
  networkIds.includes(numberToHex(chainId.value).toLowerCase())
);

const isCurrentNetwork = (network: Network) => {
  return (
    network.chainId.toLowerCase() === numberToHex(chainId.value).toLowerCase()
  );
};

const switchChain = async (network: Network) => {
  overlay.value = true;

  try {
    await setChain({
      chainId: network.chainId,
      wallet: alreadyConnectedWallets.value[0],
    });
    // const provider = web3Provider.value?.provider;

    // if (provider)
    //   await switchToNetwork({
    //     provider,
    //     chainId: hexToNumber(network.chainId),
    //   });

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
    v-if="alreadyConnectedWallets[0]"
    icon
    size="small"
    :color="isNetworkSupported ? 'default' : 'danger'"
    :variant="isNetworkSupported ? undefined : 'flat'"
    @click="() => (dialog = true)"
  >
    <template v-if="isNetworkSupported">
      <img
        :src="NETWORK_ICON[chainId]"
        alt=""
        height="28"
      />
    </template>
    <template v-else>
      <v-icon :icon="mdiPulse"></v-icon>
    </template>
  </v-btn>

  <v-dialog-base
    v-model="dialog"
    max-width="640px"
  >
    <DialogCard
      title="Select Network"
      class="tw-relative"
      @close="() => (dialog = false)"
    >
      <div class="tw-grid tw-grid-col-1 md:tw-grid-cols-2 tw-gap-4">
        <div
          v-if="settingChain"
          class="tw-col-span-1 md:tw-col-span-2"
        >
          <v-alert
            color="success"
            variant="tonal"
          >
            Switching...
          </v-alert>
        </div>
        <template
          v-for="network in supportedNetworks"
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
                class="tw-bg-green-500 tw-w-[12px] tw-h-[12px] tw-mr-[12px] tw-rounded-full"
              ></div>
            </template>
          </button>
        </template>
      </div>
    </DialogCard>
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
