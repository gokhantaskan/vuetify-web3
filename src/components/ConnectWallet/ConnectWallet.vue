<script setup lang="ts">
import { mdiContentCopy, mdiLogin, mdiLogout, mdiOpenInNew } from "@mdi/js";
import { useOnboard } from "@web3-onboard/vue";
import { computed, ref, watch } from "vue";

import { useWeb3Provider } from "@/composables/useWeb3Provider";
import { useBalancesStore } from "@/stores/balances";
import { bigNumberToTrimmed } from "@/utils/format";
import { trimText } from "@/utils/trim_text";

const {
  connectWallet,
  connectingWallet,
  connectedWallet,
  alreadyConnectedWallets,
  disconnectConnectedWallet,
} = useOnboard();

const balancesStore = useBalancesStore();
const { web3Provider } = useWeb3Provider();

const ens = computed(() => connectedWallet.value?.accounts[0].ens?.name);
const address = computed(() => connectedWallet.value?.accounts[0].address);
const dialog = ref(false);

const connect = async () => {
  if (!alreadyConnectedWallets.value.length) await connectWallet();
};

const disconnect = async () => {
  await disconnectConnectedWallet();
};

watch(web3Provider, web3Provider => {
  if (!web3Provider) dialog.value = false;
});
</script>

<template>
  <template v-if="!connectedWallet">
    <v-tooltip text="Connect">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :loading="connectingWallet"
          variant="tonal"
          @click="connect"
        >
          <v-icon :icon="mdiLogin"></v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </template>
  <template v-else>
    <v-btn-group density="compact">
      <v-btn
        variant="tonal"
        color="white"
        @click="() => (dialog = true)"
      >
        {{ ens || trimText(address || "") }}
      </v-btn>
      <v-tooltip text="Disconnect">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="danger"
            variant="tonal"
            @click="disconnect"
          >
            <v-icon :icon="mdiLogout"></v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-btn-group>
  </template>
  <!-- Dialog -->
  <v-dialog-base v-model="dialog">
    <v-card
      :elevation="2"
      class="tw-p-4 tw-text-center"
    >
      <div>
        <template v-if="ens">
          <p class="tw-text-xl tw-font-medium tw-leading-loose">{{ ens }}</p>
          <p>{{ trimText(address || "") }}</p>
        </template>
        <template v-else>
          <p class="tw-text-xl tw-font-medium tw-leading-loose">
            {{ trimText(address || "") }}
          </p>
        </template>

        <div class="tw-space-x-2 tw-mt-4">
          <v-tooltip text="Copy Address">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="default"
                variant="tonal"
              >
                <v-icon :icon="mdiContentCopy" />
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Open In Explorer">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="default"
                variant="tonal"
              >
                <v-icon :icon="mdiOpenInNew" />
              </v-btn>
            </template>
          </v-tooltip>
        </div>

        <div class="tw-mt-8">
          <template v-if="balancesStore.ETH.raw">
            <v-tooltip :text="`Balance: ${balancesStore.ETH.str}`">
              <template #activator="{ props }">
                <p
                  class="tw-max-w-fit tw-mx-auto tw-underline tw-underline-offset-1"
                  v-bind="props"
                >
                  <span class="tw-font-bold tw-mr-2 tw-inline-block">Ξ</span>
                  <span class="tw-inline-block">{{
                    bigNumberToTrimmed(balancesStore.ETH.raw)
                  }}</span>
                </p>
              </template>
            </v-tooltip>
          </template>
        </div>
      </div>
    </v-card>
  </v-dialog-base>
</template>
