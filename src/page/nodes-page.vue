<template>
  <div class="p-4 w-full max-w-md mx-auto space-x-3">
    <div class="relative selection-gray text-gray-400 focus-within:text-gray-600">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </div>
      <input
        class="py-3 px-4 bg-gray-50 placeholder-gray-400 text-gray-600 rounded-lg shadow-md appearance-none w-full block pl-12 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        :value="mainNidRef"
        @keyup.enter="search($event)"
        placeholder="Node ID"
        style="text-transform:uppercase;"
      >
    </div>
  </div>

  <div class="p-4" v-if="mainNodeRef">
    <div class="py-3 main-node" :id="`nid-${mainNodeRef.nid}`">
      <node
        :sano-node="mainNodeRef"
        :is-main="true"
        @post-new-node="refreshNodes"
      ></node>
    </div>

    <div class="py-3 flex flex-col items-center">
      <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
      <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
      <div class="w-1 h-4 my-2 rounded-md bg-gray-600"></div>
    </div>
    
    <div class="py-3 flex flex-col items-center">
      <div class="text-center px-5 py-0.5 rounded-2xl shadow-md border-none bg-gray-600">
        <p class="text-gray-100 text-lg leading-8">
          {{
            (childNodesRef && childNodesRef.length > 0) ? 
              `${childNodesRef.length} Child Node${childNodesRef.length === 1 ? '' : 's'}` :
              'No Child Node'
          }}
        </p>
      </div>
    </div>


    <div class="child-nodes" v-if="childNodesRef && childNodesRef.length > 0">
      <div
        class="child-node my-4"
        v-for="(sanonode, index) in childNodesRef"
        :id="`nid-${sanonode.nid}`"
        :key="sanonode.nid"
      >
        <node
          :sano-node="sanonode"
          :position="index + 1"
          @post-new-node="refreshNodes"
        ></node>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import {
  ref,
  defineComponent
} from 'vue'

import {
  getNode,
  getNodes,
  cacheNodeBundle
} from '../store/nodes-cache'

import {
  Nid,
  SanoNode
} from '../types'


const mainNidRef = ref < Nid | undefined > ()
const mainNodeRef = ref < SanoNode | undefined > ()
const childNodesRef = ref < SanoNode[] | undefined > ()

async function updateNodes() {
  if (!mainNidRef.value) {
    mainNodeRef.value = undefined
    childNodesRef.value = undefined
    return
  }
  const mainNode = await getNode(mainNidRef.value)
  mainNodeRef.value = mainNode
  if (mainNode) {
    const childNodes: SanoNode[] = []
    const childNodesMap = await getNodes(mainNode.children)
    for (const nid in childNodesMap) {
      childNodes.push( < SanoNode > childNodesMap[nid])
    }
    childNodesRef.value = childNodes
  } else {
    childNodesRef.value = undefined
  }
}

async function refreshNodes() {
  if(mainNidRef.value) {
    await cacheNodeBundle(mainNidRef.value)
    await updateNodes()
  }
}



import node from "../comp/node.vue"
export default defineComponent({
  name: 'nodes-page',
  components: {
    node
  },
  setup() {
    return {
      mainNidRef,
      mainNodeRef,
      childNodesRef,
      refreshNodes
    }
  },
  methods: {
    search(event: KeyboardEvent) {
      if(event.target) {
        const nid = ( < HTMLInputElement > event.target).value
          .trim()
          .toUpperCase()
        if(nid) {
          this.$router.push(`/node/${nid}`)
        } else {
          this.$router.push(`/`)
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(async () => {
      mainNidRef.value = < string > to.params.nid
      await updateNodes()
      document.title = `${mainNodeRef.value?.nid || 'Index'} - Sano`
      window.scrollTo(0, 0)
    })
  },
  async beforeRouteUpdate(to, from, next) {
    next()
    mainNidRef.value = < string > to.params.nid
    await updateNodes()
    document.title = `${mainNodeRef.value?.nid || 'Index'} - Sano`
    window.scrollTo(0, 0)
  },
  async beforeRouteLeave(to, from, next) {
    next()
  }
})
</script>
