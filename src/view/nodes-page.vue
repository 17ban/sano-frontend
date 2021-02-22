<template>
  <!-- search bar for nid -->
  <div class="py-4 w-full max-w-md mx-auto">
    <search-bar
      placeholder="Node ID"
      :value="mainNidRef"
      :handler="searchHandler"
    ></search-bar>
  </div>

  <div
    v-if="mainNodeRef"
    :class="{ 
      'opacity-0': pageStatus !== 'loaded',
      'transition-all duration-500': useAnimation 
    }"
  >
    <!-- main node -->
    <div 
      class="main-node py-4"
      :key="mainNodeRef.nid"
    >
      <node
        :sano-node="mainNodeRef"
        :is-main="true"
        @post-new-node="refreshNodes(mainNidRef)"
        @click-link="clickLinkHandler"
      ></node>
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
          {{
            (childNodesRef && childNodesRef.length > 0) ? 
              `${childNodesRef.length} Child Node${childNodesRef.length === 1 ? '' : 's'}` :
              'No Child Node'
          }}
        </span>
      </div>
    </div>

    <!-- child nodes -->
    <div v-if="childNodesRef && childNodesRef.length > 0">
      <div
        v-for="(sanonode, index) in childNodesRef"
        :key="sanonode.nid"
        class="child-node my-4"
      >
        <node
          :sano-node="sanonode"
          :position="index + 1"
          @post-new-node="refreshNodes(mainNidRef)"
          @click-link="clickLinkHandler"
        ></node>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import {
  ref,
  watch,
  defineComponent,
  nextTick
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import {
  getNode,
  getNodes,
  cacheNodeBundle
} from '../store/nodes-cache'

import { delay } from '../utils'

import {
  Nid,
  SanoNode
} from '../types'



const mainNidRef = ref < Nid | undefined > ()
const mainNodeRef = ref < SanoNode | undefined > ()
const childNodesRef = ref < SanoNode[] | undefined > ()
const pageStatus = ref<'loaded' | 'loading'>('loading')
const useAnimation = ref<boolean>(false)


async function updateNodes(nid?: Nid): Promise<boolean> {
  if (!nid) {
    mainNodeRef.value = undefined
    childNodesRef.value = undefined
    return false
  }
  const mainNode = await getNode(nid)
  mainNodeRef.value = mainNode
  if (!mainNode) {
    childNodesRef.value = undefined
    return false
  }
  const childNodes: SanoNode[] = []
  const childNodesMap = await getNodes(mainNode.children)
  for (const nid in childNodesMap) {
    childNodes.push( < SanoNode > childNodesMap[nid])
  }
  childNodesRef.value = childNodes
  return true
}

async function updateNodesWithAnimation(nid?: Nid) {
  pageStatus.value = 'loading'
  await nextTick()
  await updateNodes(nid)
  useAnimation.value = true
  pageStatus.value = 'loaded'
  await nextTick()
  await delay(500)
  useAnimation.value = false
}


async function refreshNodes(nid?: Nid): Promise<boolean> {
  if(!nid) {
    return false
  }
  await cacheNodeBundle(nid)
  await updateNodes(nid)
  return true
}


watch(mainNidRef, async newNid => {
  const upperCase = newNid?.toUpperCase()
  if(mainNidRef.value !== upperCase) {
    mainNidRef.value = upperCase
    return
  }
  document.title = newNid ? `${newNid} - Sano` : 'Sano'
  
  await updateNodesWithAnimation(newNid)
})



function useRouterHandler() {
  const router = useRouter()
  const route = useRoute()
  watch(
    () => route.params.nid,
    async nid => {
      mainNidRef.value = <string>nid
    }
  )
  
  function searchHandler(event: KeyboardEvent) {
    if(event.target) {
      const nid = ( < HTMLInputElement > event.target).value
        .trim()
        .toUpperCase()
      if(nid) {
        router.push(`/node/${nid}`)
      } else {
        router.push(`/`)
      }
    }
  }

  async function clickLinkHandler(href: string) {
    pageStatus.value = 'loading'
    await router.push(href)
    window.scrollTo(0, 0)
  }
  return { searchHandler, clickLinkHandler }
}


import searchBar from './comp/search-bar.vue'
import node from "./comp/node.vue"
export default defineComponent({
  name: 'nodes-page',
  components: {
    searchBar,
    node
  },
  setup() {
    return {
      pageStatus,
      useAnimation,
      mainNidRef,
      mainNodeRef,
      childNodesRef,
      refreshNodes,
      ...useRouterHandler()
    }
  },
  beforeRouteEnter(to) {
    mainNidRef.value = <string>to.params.nid
  }
})
</script>
