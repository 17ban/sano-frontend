<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useRouteHistory } from '~/store/route'
import { scrollIntoElement } from '~/utils/index'

const breakpoints = useBreakpoints(breakpointsTailwind)
const smaller = breakpoints.smaller('md')

const { prevPath, nextPath } = useRouteHistory()
</script>

<template>
  <div class="px-2 py-2 z-50 flex flex-col fixed bottom-8 md:bottom-64 right-4 md:right-10 lg:right-40 xl:right-64 2xl:right-96">
    <button
      v-if="!smaller"
      class="p-2 my-1 transition-colors outline-none bg-gray-600 text-gray-50 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
      :class="{ 'menu-btn-disable': !prevPath }"
      @click="$router.go(-1)"
    >
      <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
    <button
      v-if="!smaller"
      class="p-2 my-1 transition-colors outline-none bg-gray-600 text-gray-50 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
      :class="{ 'menu-btn-disable': !nextPath }"
      @click="$router.go(1)"
    >
      <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
    <button
      class="p-2 my-1 transition-colors outline-none bg-gray-600 text-gray-50 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
      @click="scrollIntoElement('body')"
    >
      <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.menu-btn-disable {
  pointer-events: none;
  color: rgb(176, 183, 192);
  background-color: rgb(107, 116, 133);
}
</style>
