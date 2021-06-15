<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import NProgress from 'nprogress'

import { useNodeBundle, ensureNodeBundle } from '~/store/cache'
import { useRouteHistory } from '~/store/route-history'

import NodeCard from '~/components/NodeCard/index.vue'
import NodeCardLoading from '~/components/NodeCardLoading.vue'

const route = useRoute()
const nid = computed(() => route.params.nid as (string | undefined))
const pageStatus = ref<'loaded' | 'loading'>('loading')

let prevNid: string | undefined
const nodeBundle = useNodeBundle(
  nid,
  () => {
    if (nid.value !== prevNid) {
      prevNid = nid.value
      window.scrollTo(0, 0)
    }
    pageStatus.value = 'loading'
    NProgress.start()
  },
  () => {
    NProgress.done()
    pageStatus.value = 'loaded'
  },
)
const mainNode = computed(() => nodeBundle.value?.mainNode)
const childNodes = computed(() => nodeBundle.value ? nodeBundle.value.childNodes : [])

const { prevPath } = useRouteHistory()
const prevPathIsParent = computed(() => {
  if (!prevPath.value)
    return false
  const prevNid = prevPath.value.split('/').pop()
  return prevNid === mainNode.value?.parent
})

async function refreshNodes() {
  if (!nid.value)
    return false
  await ensureNodeBundle(nid.value, true)
  return true
}
</script>

<template>
  <div v-if="pageStatus === 'loaded'">
    <div
      v-if="mainNode"
      :key="mainNode.nid"
      class="min-h-screen"
    >
      <!-- main node -->
      <div :key="mainNode.nid" class="py-4">
        <NodeCard
          :sano-node="mainNode"
          :is-main="true"
          :prev-path-is-parent="prevPathIsParent"
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
          <NodeCard
            :sano-node="childNode"
            @post-new-node="refreshNodes"
          />
        </div>
      </template>
    </div>
    <div
      v-else
      class="min-h-screen mt-10 mb-36 text-center"
    >
      <p class="pt-10 text-7xl font-bold text-purple-200">
        Unkown Node
      </p>
      <p class="pt-10 text-8xl font-bold text-pink-200">
        {{ nid }}
      </p>
    </div>
  </div>

  <!-- will be shown while loading -->
  <div v-else>
    <div class="py-4">
      <NodeCardLoading />
    </div>

    <div class="py-4 flex flex-col items-center">
      <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
      <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
      <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
    </div>

    <div class="py-4 flex flex-col items-center">
      <div class="text-center px-5 py-0.5 rounded-2xl shadow-md border-none bg-gray-600">
        <span class="text-gray-100 text-lg leading-8">
          No Child Node
        </span>
      </div>
    </div>
  </div>
</template>
