<script setup lang="ts">
import dayjs from 'dayjs'
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
  isMain: {
    type: Boolean,
    default: false,
  },
  displayIndex: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="text-sm">
    <span class="inline-block pr-3 text-gray-300 select-all">
      {{ dayjs(props.sanoNode.time).format('YYYY/MM/DD HH:mm:ss') }}
    </span>
    <span
      v-if="props.displayIndex"
      class="inline-block pr-3 text-blue-300 select-all"
    >
      {{ `#${props.isMain ? 0 : props.sanoNode.index + 1}` }}
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
