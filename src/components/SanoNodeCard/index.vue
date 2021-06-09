<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'
import type { PropType } from 'vue'

import Meta from './Meta.vue'
import Content from './Content.vue'
import Toolbar from './Toolbar.vue'
import NewNodeForm from './NewNodeForm.vue'

import { useSanoNodeCardStore } from './store'
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
})

const { store: cardStore } = useSanoNodeCardStore()

const emitPostNewNode = defineEmit<(e: 'postNewNode') => void>()
function formSubmitHandler() {
  emitPostNewNode('postNewNode')
}
</script>

<template>
  <div
    :id="`nid-${props.sanoNode.nid}`"
    class="px-5 py-3 bg-gray-500 rounded-lg"
  >
    <Meta
      :card-store="cardStore"
      :sano-node="props.sanoNode"
      :is-main="props.isMain"
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
    />
    <NewNodeForm
      :card-store="cardStore"
      :sano-node="props.sanoNode"
      @submit="formSubmitHandler"
    />
  </div>
</template>
