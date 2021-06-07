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
  <div class="pt-4 pb-1">
    <p class="text-gray-50">
      {{ props.sanoNode.content }}
    </p>
  </div>
</template>
