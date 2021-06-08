<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

import type { SanoNodeCardStore } from './store'
import type { SanoNode } from '~/types'

const props = defineProps({
  cardStore: {
    type: Object as PropType<SanoNodeCardStore>,
    required: true,
  },
  sanoNode: {
    type: Object as PropType<SanoNode>,
    required: true,
  },
})
</script>

<template>
  <div class="sano-node-content pt-4 pb-1 text-gray-50">
    <p v-if="props.sanoNode.type === 'text'">
      {{ props.sanoNode.content }}
    </p>
    <p
      v-else-if="props.sanoNode.type === 'md'"
      v-html="props.sanoNode.content"
    />
  </div>
</template>
