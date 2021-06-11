<script script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SearchBar from '~/components/SearchBar.vue'

const route = useRoute()
const nid = computed(() => route.params.nid as (string | undefined))
</script>

<template>
  <div class="font-mono selection-dark">
    <div class="py-12 px-4 min-h-screen mx-auto md:w-3/4 lg:w-7/12 xl:w-1/2 2xl:w-5/12">
      <!-- search bar for nid -->
      <div class="pt-4 pb-8 w-full max-w-md mx-auto">
        <SearchBar :nid="nid" placeholder="Node ID" />
      </div>
      <!-- page -->
      <div>
        <router-view />
      </div>
    </div>
    <footer class="h-screen mt-36 flex flex-row items-center">
      <h1 class="flex-grow font-bold text-purple-300 text-7xl text-center">
        Sano
      </h1>
    </footer>
  </div>
</template>
