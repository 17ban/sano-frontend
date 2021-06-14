<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  isMain: {
    type: Boolean,
    default: true,
  },
  displayIndex: {
    type: Boolean,
    default: true,
  },
  displayNewNodeBtn: {
    type: Boolean,
    default: true,
  },
  shownIndex: {
    type: String,
    default: '0',
  },
})
</script>

<template>
  <div class="px-5 py-3 bg-gray-500 rounded-lg">
    <!-- meta -->
    <div class="text-sm">
      <span class="inline-block pr-3 text-gray-300 select-all">
        YYYY/MM/DD HH:mm:ss
      </span>
      <span
        v-if="props.shownIndex && props.displayIndex"
        class="inline-block pr-3 text-blue-300 select-all"
      >
        {{ '#' + props.shownIndex }}
      </span>
      <span class="inline-block text-pink-300 select-all">
        LOADING
      </span>
      <br>
      <span class="inline-block text-purple-300">
        (Loading)
      </span>
    </div>

    <!-- content -->
    <div class="pt-4 pb-1 text-gray-50">
      <div class="sano-node-content sano-node-content-md">
        &nbsp;
      </div>
    </div>

    <hr class="mt-5 border-t-2 border-gray-400">

    <!-- toolbar -->
    <div
      class="flex flex-row pt-3 text-sm"
      :class="{
        'flex-row-reverse': props.isMain,
        'flex-row': !props.isMain
      }"
    >
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
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>
        </button>
      </div>

      <div v-if="props.isMain">
        <div class="flex flex-row items-center">
          <a class="py-1.5 px-4 bg-gray-600 text-gray-50 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
            <svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" /></svg>
          </a>
        </div>
      </div>

      <div
        v-if="!props.isMain"
        class="flex flex-row items-center"
      >
        <a class="py-1.5 px-4 ml-3 bg-gray-600 text-gray-50 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
          <svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </a>
      </div>
    </div>
  </div>
</template>
