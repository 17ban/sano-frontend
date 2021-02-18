<template>
  <div class="flex flex-col p-3 shadow-md bg-gray-500 rounded-lg">
    <div class="text-sm">
      <div class="inline-block">
        <span class="text-gray-300">
          {{ dayjs(sanoNode.time).format('YYYY/MM/DD HH:mm:ss') }}
        </span>
      </div>
      <div class="inline-block px-3">
        <span class="text-blue-300">
          {{ `#${position === 0 ? 'main' : position}` }}
        </span>
      </div>
      <div class="inline-block">
        <router-link
          class="text-pink-300"
          :class="{ 'pointer-events-none' : isMain }"
          :to="`/node/${sanoNode.nid}`"
        >
          {{ sanoNode.nid }}
        </router-link>
      </div>
    </div>

    <div class="text-sm">
      <div class="inline-block">
        <span class="text-purple-300">
          {{ sanoNode.username || '(Anonymous)' }}
        </span>
      </div>
    </div>

    <div class="pt-4 pb-1 text-base">
      <p class="text-gray-50">{{ sanoNode.content }}</p>
    </div>

    <hr class="mt-5 border-t-2 border-gray-400 ">

    <div class="flex flex-row pt-3 text-sm">
      <div
        v-if="isMain && sanoNode.depth !== 0"
        class="flex flex-row items-center"
      >
        <router-link
          class="py-1.5 px-4 bg-gray-600 text-gray-50 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          :to="`/node/${sanoNode.parent}`"
        >
          <svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          parent node
        </router-link>
      </div>
      <div
        v-if="isMain"
        class="flex-grow flex flex-row-reverse items-center"
      >
        <button
          class="p-2 mr-2 bg-gray-600 text-gray-50 rounded-2xl shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          @click="triggerForm"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div
        v-if="!isMain"
        class="flex-grow flex flex-row items-center"
      >
        <button
          class="p-2 mr-2 bg-gray-600 text-gray-50 rounded-2xl shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          @click="triggerForm"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div 
        v-if="!isMain && sanoNode.children.length > 0"
        class="flex flex-row-reverse items-center"
      >
        <router-link
          class="py-1.5 px-4 ml-3 bg-gray-600 text-gray-50 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          :to="`/node/${sanoNode.nid}`"
        >
          enter
          <svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </router-link>
        <span class="px-2 text-gray-100 bg-gray-400 rounded-md">
          {{ `${sanoNode.children.length} child node${sanoNode.children.length === 1 ? '' : 's'}` }}
        </span>
      </div>
    </div>

    <div
      class="overflow-hidden transition-all duration-300"
      :class="{ invisible: !formVisible, 'opacity-50': !formVisible, 'max-h-0': !formVisible, 'max-h-96': formVisible, 'mt-4': formVisible, 'mt-0': !formVisible }"
    >
      <div class="p-1 flex flex-col space-y-3">
        <h1 class="px-3.5 py-1 text-xl text-gray-100">
          New node on
          <span class="text-pink-300">
            {{ sanoNode.nid }}
          </span>
        </h1>
        <form
          @submit.prevent="postNewNode($event, sanoNode.nid).then(ok => ok ? $emit('post-new-node'): null)"
          class="flex-grow flex flex-col space-y-5"
        >
          <div class="relative text-gray-400 focus-within:text-gray-50">
            <div class="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>    
            </div>
            <textarea
              class="h-40 py-2 px-4 resize-none bg-gray-600 placeholder-gray-400 text-gray-50 rounded-xl shadow-in appearance-none w-full block pl-9 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              placeholder="Content*"
              name="content"
              required
            ></textarea>
          </div>
          <div class="relative text-gray-400 focus-within:text-gray-50">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              class="py-2 px-4 resize-none bg-gray-600 placeholder-gray-400 text-gray-50 rounded-xl shadow-in appearance-none w-full block pl-9 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              placeholder="Nickname"
              type="text"
              name="username"
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
  </div>
</template>


<script lang="ts">
import {
  defineComponent,
  PropType,
  ref
} from 'vue'

import { postNode } from '../api/node'


import {
Nid,
  SanoNode
} from "../types"

import dayjs from "dayjs"



function useNewNodeForm() {
  const formVisible = ref<boolean>(false)

  function triggerForm() {
    formVisible.value = !formVisible.value
  }

  function resetForm(formElement: HTMLFormElement) {
    formVisible.value = false
    formElement.reset()
  }

  async function postNewNode(event: Event, parent: Nid): Promise<boolean> {
    const formElement = <HTMLFormElement | null>event.target
    if(!formElement) {
      console.error('Fail to post new node😥', event)
      alert('Fail to post new node😥')
      return false
    }

    const formData = new FormData(formElement)
    const content = formData.get('content')
    const username =  formData.get('username')

    //type check
    if(typeof content !== 'string' || username instanceof File) {
      console.error('Fail to post new node😥', new Error('Type error.'))
      alert('Fail to post new node😥')
      return false
    }

    let res = await postNode(content, parent, username)
    if(!res.ok) {
      console.error('Fail to post new node😥', res)
      alert('Fail to post new node😥')
      return false
    }

    resetForm(formElement)
    return true
  }

  return {
    formVisible,
    triggerForm,
    postNewNode,
    resetForm
  }
}


export default defineComponent({
  name: "node",
  props: {
    sanoNode: {
      type: Object as PropType<SanoNode>,
      required: true
    },
    isMain: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return {
      ...useNewNodeForm(),
      dayjs
    }
  },
  emits: ['post-new-node']
})
</script>


<style>
.shadow-in {
  box-shadow: 2px 2px 6px #444d5a inset
}
</style>
