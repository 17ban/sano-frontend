<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

import type { NodeCardStore } from './store'
import type { SanoNode } from '~/types'

const props = defineProps({
  cardStore: {
    type: Object as PropType<NodeCardStore>,
    required: true,
  },
  sanoNode: {
    type: Object as PropType<SanoNode>,
    required: true,
  },
})
</script>

<template>
  <div class="pt-4 pb-1 text-gray-50">
    <div
      v-if="props.sanoNode.type === 'text'"
      class="sano-node-content sano-node-content-text"
    >
      {{ props.sanoNode.content }}
    </div>
    <div
      v-else-if="props.sanoNode.type === 'md'"
      class="sano-node-content sano-node-content-md"
      v-html="props.sanoNode.content"
    />
  </div>
</template>
