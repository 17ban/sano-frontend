<template>
  <div class="py-12 min-h-screen  mx-auto md:w-3/4 lg:w-7/12 xl:w-1/2 2xl:w-5/12 font-mono selection-dark" id="main-view">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <div>
          <component :is="Component" />
        </div>
      </keep-alive>
    </router-view>
  </div>
  <footer class="h-screen mt-16 font-mono flex flex-row items-center selection-dark" >
    <h1 class="flex-grow text-purple-300 text-7xl text-center">
      Sano
    </h1>
  </footer>
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

<style>

footer{
  background: -webkit-linear-gradient(rgb(33, 33, 33, 0), rgb(33, 33, 33, 0.8));
  background: -o-linear-gradient(rgb(33, 33, 33, 0), rgb(33, 33, 33, 0.8));
  background: -moz-linear-gradient(rgb(33, 33, 33, 0), rgb(33, 33, 33, 0.8));
  background: -mos-linear-gradient(rgb(33, 33, 33, 0), rgb(33, 33, 33, 0.8));
  background: linear-gradient(rgb(33, 33, 33, 0), rgb(33, 33, 33, 0.8));
}
</style>
