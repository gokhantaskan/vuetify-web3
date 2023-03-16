<script setup lang="ts">
import { mdiContentCopy, mdiOpenInNew, mdiPower } from "@mdi/js";
import { useClipboard } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { PropType } from "vue";

import JazzIcon from "@/components/JazzIcon/JazzIcon.vue";
import type { SupportedNetwork } from "@/constants/blockchain";
import { useAppStore } from "@/stores/app";
import { useBalancesStore } from "@/stores/balances";
import { bigNumberToTrimmed } from "@/utils/format";
import { trimText } from "@/utils/trim_text";

defineProps({
  currentChain: {
    type: Object as PropType<SupportedNetwork | undefined>,
    required: true,
  },
});

const { eth } = storeToRefs(useBalancesStore());
const { address, ens, wallet } = storeToRefs(useAppStore());
const { disconnectFromDapp } = useAppStore();
const { copy, copied, isSupported } = useClipboard({ source: address });

const iconSize = 36;
</script>

<template>
  <v-card
    :elevation="2"
    class="tw-p-4 tw-text-center"
  >
    <div v-if="currentChain && address">
      <!-- Avatar -->
      <div>
        <span
          class="tw-inline-block tw-relative"
          :style="{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }"
        >
          <JazzIcon
            :address="address"
            :size="iconSize"
          />
          <div
            :class="[
              'tw-absolute',
              'tw-inline-flex tw-items-center tw-justify-center',
              'tw-rounded-full',
              'tw-bg-white',
              'tw-p-[2px]',
            ]"
            :style="{
              width: `${iconSize / 2}px`,
              height: `${iconSize / 2}px`,
              bottom: `-${iconSize / 8}px`,
              right: `-${iconSize / 8}px`,
            }"
            v-html="wallet.icon"
          ></div>
        </span>
      </div>
      <!-- /Avatar -->
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
        <template v-if="currentChain?.blockExplorerUrls?.[0]">
          <v-tooltip text="Open In Explorer">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                color="default"
                variant="tonal"
                size="small"
                icon
                :href="`${currentChain?.blockExplorerUrls?.[0]}/address/${address}`"
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
          <p class="tw-max-w-fit tw-mx-auto tw-underline tw-underline-offset-1">
            <span class="tw-inline-block">{{
              eth.loading
                ? "..."
                : bigNumberToTrimmed(
                    eth.raw,
                    currentChain?.nativeCurrency.decimals,
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
</template>
