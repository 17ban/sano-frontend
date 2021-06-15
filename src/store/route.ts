import { reactive, ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export function useRouteHistory() {
  const route = useRoute()
  const routeHistoryReactive = reactive<RouteLocationNormalizedLoaded[]>([])
  const pointer = ref(-1)

  const routeHistory = computed(() => routeHistoryReactive)
  const currentRoute = computed<RouteLocationNormalizedLoaded | undefined>(() => routeHistory.value[pointer.value])
  const prevRoute = computed<RouteLocationNormalizedLoaded | undefined>(() => routeHistory.value[pointer.value - 1])
  const nextRoute = computed<RouteLocationNormalizedLoaded | undefined>(() => routeHistory.value[pointer.value + 1])

  const pathHistory = computed(() => routeHistory.value.map(r => r.path))
  const currentPath = computed(() => currentRoute.value?.path)
  const prevPath = computed(() => prevRoute.value?.path)
  const nextPath = computed(() => nextRoute.value?.path)

  watchEffect(() => {
    if (route.path === prevPath.value) {
      pointer.value--
    }
    else if (route.path === nextPath.value) {
      pointer.value++
    }
    else {
      routeHistoryReactive.splice(++pointer.value)
      routeHistoryReactive.push(JSON.parse(JSON.stringify(route)))
    }
  })

  return {
    routeHistory,
    currentRoute,
    prevRoute,
    nextRoute,
    pathHistory,
    currentPath,
    prevPath,
    nextPath,
  }
}

export function useNid() {
  const route = useRoute()
  const nid = computed(() => route.params.nid as (string | undefined))
  return nid
}
