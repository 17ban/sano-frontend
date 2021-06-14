<script setup lang="ts">
import dayjs from 'dayjs'
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
  displayIndex: {
    type: Boolean,
    default: true,
  },
  shownIndex: {
    type: String,
  },
})
</script>

<template>
  <div class="text-sm">
    <span class="inline-block pr-3 text-gray-300 select-all">
      {{ dayjs(props.sanoNode.time).format('YYYY/MM/DD HH:mm:ss') }}
    </span>
    <span
      v-if="props.shownIndex && props.displayIndex"
      class="inline-block pr-3 text-blue-300 select-all"
    >
      {{ '#' + props.shownIndex }}
    </span>
    <span class="inline-block text-pink-300 select-all">
      {{ props.sanoNode.nid }}
    </span>
    <br>
    <span class="inline-block text-purple-300">
      {{ props.sanoNode.nickname || '(Anonymous)' }}
    </span>
  </div>
</template>
