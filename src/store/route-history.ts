import { watchEffect, reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteHistory() {
  const route = useRoute()

  const routeHistory = reactive<string[]>([])
  const routeHistoryLength = computed(() => routeHistory.length)
  const routeHistoryIndex = ref(-1)

  watchEffect(() => {
    const path = route.path
    if (path === routeHistory[routeHistoryIndex.value - 1]) {
      routeHistoryIndex.value--
    }
    else if (path === routeHistory[routeHistoryIndex.value + 1]) {
      routeHistoryIndex.value++
    }
    else {
      routeHistory.splice(routeHistoryIndex.value + 1)
      routeHistory.push(path)
      routeHistoryIndex.value++
    }
  })

  return {
    routeHistory,
    routeHistoryLength,
    routeHistoryIndex,
  }
}
