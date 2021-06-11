<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
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
  displayNewNodeBtn: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()

</script>

<template>
  <div
    class="flex flex-row pt-3 text-sm"
    :class="{
      'flex-row-reverse': props.isMain,
      'flex-row': !props.isMain
    }"
  >
    <!-- new node button -->
    <div
      class="flex-grow flex items-center"
      :class="{
        'flex-row-reverse': props.isMain,
        'flex-row': !props.isMain
      }"
    >
      <button
        v-if="props.displayNewNodeBtn"
        class="p-2 mr-2 bg-gray-600 text-gray-50 rounded-2xl shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        :title="`New node on ${props.sanoNode.nid}`"
        @click="cardStore.toggleForm"
      >
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>
      </button>
    </div>

    <!-- parent button -->
    <div>
      <div
        v-if="props.isMain && props.sanoNode.depth !== 0"
        class="flex flex-row items-center"
      >
        <a
          class="py-1.5 px-4 bg-gray-600 text-gray-50 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          :href="`/node/${props.sanoNode.parent}`"
          @click.prevent="router.push(`/node/${props.sanoNode.parent}`)"
        >
          <svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" /></svg>
        </a>
      </div>
    </div>

    <!-- enter button -->
    <div
      v-if="!props.isMain"
      class="flex flex-row items-center"
    >
      <span
        v-if="props.sanoNode.children.length > 0"
        class="px-2 text-gray-100 bg-gray-400 rounded-md"
      >
        {{ `${props.sanoNode.children.length} node${props.sanoNode.children.length > 1 ? 's' : ''}` }}
      </span>
      <a
        class="py-1.5 px-4 ml-3 bg-gray-600 text-gray-50 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        :href="`/node/${props.sanoNode.nid}`"
        @click.prevent="router.push(`/node/${props.sanoNode.nid}`)"
      >
        <svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </a>
    </div>
  </div>
</template>
