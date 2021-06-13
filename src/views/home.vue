<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { getNodes, ensureNodes } from '~/store/nodes-cache'
import type { Nid } from '~/types'

import SanoNodeCard from '~/components/SanoNodeCard/index.vue'

const highlightNodeNids = ref<Nid[]>(['ROOT', 'TEST', 'T1Z8'])
const highlightNodes = computed(() => {
  const nodes = getNodes(highlightNodeNids.value)
  return nodes.value
})

watchEffect(async() => {
  await ensureNodes(highlightNodeNids.value)
})
</script>

<template>
  <!-- greeting -->
  <div class="mt-10 mb-36 text-center">
    <h1 class="font-bold text-purple-200 text-9xl">
      Hi
    </h1>
    <p class="pt-10 font-bold text-purple-200 text-7xl">
      Welcome to Sano
    </p>
  </div>

  <!-- division -->
  <hr class="mb-2 border-t-4 rounded-md border-gray-500">
  <div class="py-4 flex flex-col items-center">
    <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
    <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
    <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
  </div>

  <!-- the amount of sticky nodes -->
  <div class="py-4 flex flex-col items-center">
    <div class="text-center px-5 py-0.5 rounded-2xl shadow-md border-none bg-gray-600">
      <span class="text-gray-100 text-lg leading-8">
        {{ highlightNodes.length || 'No' }} Sticky Node{{ highlightNodes.length > 1 ? 's' : '' }}
      </span>
    </div>
  </div>

  <!-- sticky nodes -->
  <div
    v-for="node of highlightNodes"
    :key="node.nid"
    class="my-4"
  >
    <SanoNodeCard
      :sano-node="node"
      :is-main="false"
      :display-index="false"
      :display-new-node-btn="false"
    />
  </div>
</template>
