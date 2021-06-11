<script setup lang="ts">
import { watchEffect, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { delay } from '~/utils/index'
import type { SanoNode } from '~/types'
import { getNode, getNodes, cacheNodeBundle } from '~/store/nodes-cache'

import SanoNodeCard from '~/components/SanoNodeCard/index.vue'

const route = useRoute()
const nid = computed(() => route.params.nid as (string | undefined))
const pageStatus = ref<'loading' | 'loaded'>('loading')
const mainNode = ref<SanoNode | undefined>()
const childNodes = ref<SanoNode[]>([])

async function updateNodes() {
  if (!nid.value) {
    mainNode.value = undefined
    childNodes.value = []
    return false
  }
  mainNode.value = await getNode(nid.value)
  if (!mainNode.value) {
    childNodes.value = []
    return false
  }
  const _childNodes: SanoNode[] = []
  const childNodesMap = await getNodes(mainNode.value.children)
  for (const nid of mainNode.value.children) {
    const n = childNodesMap[nid]
    if (n)
      _childNodes.push(n)
  }
  childNodes.value = _childNodes
  return true
}

async function refreshNodes() {
  if (!nid.value)
    return false
  await cacheNodeBundle(nid.value)
  await updateNodes()
  return true
}

watchEffect(async() => {
  pageStatus.value = 'loading'
  window.scroll(0, 0)
  await updateNodes()
  await delay() // Animation doesn't work without this line.
  pageStatus.value = 'loaded'
  document.title = `${nid.value || 'Home'} - Sano`
})
</script>

<template>
  <div
    v-if="mainNode"
    :key="mainNode.nid"
    :class="{ 'opacity-0': pageStatus !== 'loaded' }"
    class="transition-all duration-500"
  >
    <!-- main node -->
    <div :key="mainNode.nid" class="py-4">
      <SanoNodeCard
        :sano-node="mainNode"
        :is-main="true"
        @post-new-node="refreshNodes"
      />
    </div>

    <!-- division between main node and child nodes -->
    <div class="py-4 flex flex-col items-center">
      <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
      <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
      <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
    </div>

    <!-- the amount of nodes -->
    <div class="py-4 flex flex-col items-center">
      <div class="text-center px-5 py-0.5 rounded-2xl shadow-md border-none bg-gray-600">
        <span class="text-gray-100 text-lg leading-8">
          {{ `${childNodes.length || 'No'} Child Node${childNodes.length > 1 ? 's' : ''}` }}
        </span>
      </div>
    </div>

    <!-- child nodes -->
    <template v-for="childNode of childNodes" :key="childNode.nid">
      <div class="my-4">
        <SanoNodeCard
          :sano-node="childNode"
          @post-new-node="refreshNodes"
        />
      </div>
    </template>
  </div>
</template>
