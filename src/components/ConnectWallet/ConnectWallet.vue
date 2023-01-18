<script setup lang="ts">
import { mdiContentCopy, mdiLogin, mdiOpenInNew, mdiPower } from "@mdi/js";
import { useClipboard } from "@vueuse/core";
import { debounce } from "lodash";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

import { useWeb3Provider } from "@/composables/useWeb3Provider";
import { SUPPORTED_NETWORKS } from "@/constants/blockchain";
import { useAppStore } from "@/stores/app";
import { useBalancesStore } from "@/stores/balances";
import { bigNumberToTrimmed, numberToHex } from "@/utils/format";
import { trimText } from "@/utils/trim_text";

const { web3Provider } = useWeb3Provider();
const { eth } = storeToRefs(useBalancesStore());
const { address, chainId } = storeToRefs(useAppStore());
const { connectToDapp, connectingToDapp, disconnectFromDapp } = useAppStore();
const { copy, copied, isSupported } = useClipboard({ source: address });

const dialog = ref(false);
const ens = ref<string | null>("");

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
          ens.value = await web3Provider?.lookupAddress(address.value);
        } catch (e: any) {
          ens.value = null;
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
    <v-tooltip text="Connect">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :loading="connectingToDapp"
          variant="tonal"
          @click="connectToDapp"
        >
          <v-icon :icon="mdiLogin"></v-icon>
        </v-btn>
      </template>
    </v-tooltip>
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
    <v-card
      :elevation="2"
      class="tw-p-4 tw-text-center"
    >
      <div v-if="web3Provider">
        <template v-if="ens">
          <p class="tw-text-xl tw-font-medium tw-leading-loose">{{ ens }}</p>
          <p>{{ trimText(address) }}</p>
        </template>
        <template v-else>
          <p class="tw-text-xl tw-font-medium tw-leading-loose">
            {{ trimText(address) }}
          </p>
        </template>

        <div class="tw-space-x-2 tw-mt-4">
          <!-- Clipboard -->
          <template v-if="isSupported">
            <v-tooltip :text="copied ? 'Copied!' : 'Copy Address'">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  color="default"
                  variant="tonal"
                  size="small"
                  icon
                  @click="() => copy()"
                >
                  <v-icon :icon="mdiContentCopy" />
                </v-btn>
              </template>
            </v-tooltip>
          </template>
          <!-- Explorer -->
          <template v-if="currentChain?.blockExplorerUrls[0]">
            <v-tooltip text="Open In Explorer">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  color="default"
                  variant="tonal"
                  size="small"
                  icon
                  :href="`${currentChain?.blockExplorerUrls[0]}/address/${address}`"
                  target="_blank"
                >
                  <v-icon :icon="mdiOpenInNew" />
                </v-btn>
              </template>
            </v-tooltip>
          </template>
          <!-- Disconnect -->
          <v-tooltip text="Disconnect">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="default"
                variant="tonal"
                size="small"
                icon
                @click="disconnectFromDapp"
              >
                <v-icon :icon="mdiPower" />
              </v-btn>
            </template>
          </v-tooltip>
        </div>

        <div class="tw-mt-8">
          <!-- Native Balance -->
          <template v-if="eth.raw">
            <p
              class="tw-max-w-fit tw-mx-auto tw-underline tw-underline-offset-1"
            >
              <span class="tw-inline-block">{{
                eth.loading
                  ? "..."
                  : bigNumberToTrimmed(
                      eth.raw,
                      currentChain?.nativeCurrency.decimals
                    )
              }}</span>
              <span class="tw-font-bold tw-mr-2 tw-inline-block tw-ml-2">{{
                currentChain?.nativeCurrency.symbol
              }}</span>
            </p>
          </template>
        </div>
      </div>
      <div v-else>Disconnecting...</div>
    </v-card>
  </v-dialog-base>
</template>
