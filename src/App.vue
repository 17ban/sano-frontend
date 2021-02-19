<template>
  <div class="py-12 mx-auto md:w-3/4 lg:w-7/12 xl:w-1/2 2xl:w-5/12 font-mono selection-dark" id="main-view">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <div>
          <component :is="Component" />
        </div>
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
