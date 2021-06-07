<template>
  <div class="relative selection-gray text-gray-400 focus-within:text-gray-600">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    </div>
    <input
      class="py-3 px-4 bg-gray-50 placeholder-gray-400 text-gray-600 rounded-lg shadow-md appearance-none w-full block pl-12 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      style="text-transform: uppercase;"
      :value="props.nid"
      :placeholder="props.placeholder"
      @keyup.enter="searchHandler"
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  nid: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

function searchHandler(evt: KeyboardEvent) {
  const target = evt.target as HTMLInputElement
  const nid = target.value
    .trim()
    .toUpperCase()
  if (nid)
    router.push(`/node/${nid}`)
  else
    router.push('/')
}
</script>
