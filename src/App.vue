<template>
  <div class="selection-dark py-12 container mx-auto lg:w-7/12 font-mono" id="main-view">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>


<script lang="ts">
  import {
    defineComponent
  } from 'vue'
  import nodesPage from './page/nodes-page.vue'

  export default defineComponent({
    name: 'App',
    components: {
      nodesPage
    }
  })
</script>
