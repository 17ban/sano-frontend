<script setup lang="ts">
import NProgress from 'nprogress'
import { useNodes } from '~/store/cache'
import { stickyNids } from '~/store/sticky'

import SanoNodeCard from '~/components/SanoNodeCard/index.vue'

const stickyNodes = useNodes(
  stickyNids,
  () => { NProgress.start() },
  () => { NProgress.done() },
)
</script>

<template>
  <div>
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
          {{ stickyNodes.length || 'No' }} Sticky Node{{ stickyNodes.length > 1 ? 's' : '' }}
        </span>
      </div>
    </div>

    <!-- sticky nodes -->
    <div
      v-for="node of stickyNodes"
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
  </div>
</template>
