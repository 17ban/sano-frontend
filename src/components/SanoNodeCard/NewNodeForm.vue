<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'
import type { PropType } from 'vue'

import type { SanoNodeCardStore } from './store'
import { postNode } from '~/api/node'
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
})

const emitPostNewNode = defineEmit<(e: 'submit', value: FormData) => void>()

async function postNewNode(event: Event): Promise<boolean> {
  const formElement = event.target as HTMLFormElement
  const formData = new FormData(formElement)

  const content = formData.get('content')
  const nickname = formData.get('nickname')

  // type check
  if (typeof content !== 'string' || (nickname && typeof nickname !== 'string')) {
    console.error('Fail to post new node😥', new Error('Type error.'))
    alert('Fail to post new node😥')
    return false
  }

  // post new node
  const res = await postNode(content, props.sanoNode.nid, nickname)
  if (!res.ok) {
    console.error('Fail to post new node😥', res)
    alert('Fail to post new node😥')
    return false
  }

  // reset form
  props.cardStore.formVisible = false
  formElement.reset()

  emitPostNewNode('submit', formData)
  return true
}
</script>

<template>
  <div
    class="overflow-hidden transition-all duration-300"
    :class="{ invisible: !props.cardStore.formVisible, 'opacity-50': !props.cardStore.formVisible, 'max-h-0': !props.cardStore.formVisible, 'max-h-96': props.cardStore.formVisible, 'mt-4': props.cardStore.formVisible, 'mt-0': !props.cardStore.formVisible }"
  >
    <div class="p-1 flex flex-col space-y-3">
      <h1 class="px-3.5 py-1 text-xl text-gray-100">
        New node on
        <span class="text-pink-300">
          {{ sanoNode.nid }}
        </span>
      </h1>
      <form
        :id="`new-node-form-${sanoNode.nid}`"
        class="flex-grow flex flex-col space-y-5"
        @submit.prevent="postNewNode"
      >
        <div class="relative text-gray-400 focus-within:text-gray-50 selection-deep-gray">
          <div class="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
            </svg>
          </div>
          <textarea
            class="h-48 py-2 px-4 resize-none bg-gray-600 placeholder-gray-400 text-gray-50 rounded-xl shadow-in appearance-none w-full block pl-9 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            placeholder="Content*"
            name="content"
            required
          ></textarea>
        </div>
        <div class="relative text-gray-400 focus-within:text-gray-50 selection-deep-gray">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            class="py-2 px-4 resize-none bg-gray-600 placeholder-gray-400 text-gray-50 rounded-xl shadow-in appearance-none w-full block pl-9 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            placeholder="Nickname"
            type="text"
            name="nickname"
          >
        </div>
        <div>
          <button
            class="py-1.5 px-3 cursor-pointer bg-gray-600 text-gray-50 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            type="submit"
          >
            <svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.shadow-in {
  box-shadow: 2px 2px 6px #444d5a inset
}
</style>
