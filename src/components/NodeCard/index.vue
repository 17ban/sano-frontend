<script setup lang="ts">
import { defineProps, defineEmit, computed } from 'vue'
import type { PropType } from 'vue'

import Meta from './Meta.vue'
import Content from './Content.vue'
import Toolbar from './Toolbar.vue'
import NewNodeForm from './NewNodeForm.vue'

import { useNodeCardStore } from './store'
import type { SanoNode } from '~/types'

const props = defineProps({
  sanoNode: {
    type: Object as PropType<SanoNode>,
    required: true,
  },
  isMain: {
    type: Boolean,
    default: false,
  },
  displayIndex: {
    type: Boolean,
    default: true,
  },
  displayNewNodeBtn: {
    type: Boolean,
    default: true,
  },
})

const { store: cardStore } = useNodeCardStore()

const shownIndex = computed<string>(() => {
  return `${props.isMain ? 0 : props.sanoNode.index + 1}`
})

const emitPostNewNode = defineEmit<(e: 'postNewNode') => void>()
function formSubmitHandler() {
  emitPostNewNode('postNewNode')
}
</script>

<template>
  <div
    :id="props.displayIndex ? shownIndex : undefined"
    class="px-5 py-3 bg-gray-500 rounded-lg"
  >
    <Meta
      :card-store="cardStore"
      :sano-node="props.sanoNode"
      :shown-index="shownIndex"
      :display-index="props.displayIndex"
    />
    <Content
      :card-store="cardStore"
      :sano-node="props.sanoNode"
    />
    <hr class="mt-5 border-t-2 border-gray-400">
    <Toolbar
      :card-store="cardStore"
      :sano-node="props.sanoNode"
      :is-main="props.isMain"
      :display-new-node-btn="props.displayNewNodeBtn"
    />
    <NewNodeForm
      :card-store="cardStore"
      :sano-node="props.sanoNode"
      @submit="formSubmitHandler"
    />
  </div>
</template>
