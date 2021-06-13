import { computed, ComputedRef, ref } from 'vue'
import {
  Nid,
  SanoNode,
  SanoNodeMap,
} from '../types'

import {
  getNodes as getNodesApi,
  getNode as getNodeApi,
  getNodeBundle as getNodeBundleApi,
} from '../api/node'

interface ComputedSanoNodeBundle {
  mainNode: ComputedRef<SanoNode | undefined>
  childNodes: ComputedRef<SanoNode[]>
}

const cachedSanoNodeMap = ref<SanoNodeMap>({})
const sanoNodeBundleMap: Record<Nid, ComputedSanoNodeBundle | undefined> = {}

async function cacheNode<NID extends Nid>(nid: NID): Promise<SanoNode | undefined> {
  const res = await getNodeApi(nid)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const node = await res.json()
  cachedSanoNodeMap.value[node.nid] = node
  return node
}

async function cacheNodes<NID extends Nid>(nids: NID[]): Promise<SanoNodeMap | undefined> {
  if (nids.length === 0)
    return
  const res = await getNodesApi(nids)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const nodes = await res.json()
  Object.assign(cachedSanoNodeMap.value, nodes)
  return nodes
}

async function cacheNodeBundle<NID extends Nid>(nid: NID): Promise<SanoNodeMap | undefined> {
  const res = await getNodeBundleApi(nid)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const nodes = await res.json()
  Object.assign(cachedSanoNodeMap.value, nodes)
  return nodes
}

export async function ensureNode<NID extends Nid>(nid: NID, refresh = false) {
  const node = cachedSanoNodeMap.value[nid]
  if (node && !refresh)
    return node
  else
    return await cacheNode(nid)
}

export async function ensureNodes<NID extends Nid>(nids: NID[], refresh = false) {
  if (refresh)
    return await cacheNodes(nids)

  const uncachedNodeNids = []
  for (const nid of nids) {
    const node = cachedSanoNodeMap.value[nid]
    if (!node)
      uncachedNodeNids.push(nid)
  }
  return await cacheNodes(uncachedNodeNids)
}

export async function ensureNodeBundle<NID extends Nid>(nid: NID, refresh = false) {
  if (refresh)
    return await cacheNodeBundle(nid)

  const mainNode = await ensureNode(nid)
  if (!mainNode)
    return undefined

  const childNodes = await ensureNodes(mainNode.children)
  if (!childNodes)
    return undefined

  return { mainNode: mainNode.nid, ...childNodes }
}

export function getNode<NID extends Nid>(nid: NID) {
  return computed(() => cachedSanoNodeMap.value[nid])
}

export function getNodes<NID extends Nid>(nids: NID[]) {
  return computed(() => {
    const nodes: SanoNode[] = []
    for (const nid of nids) {
      const node = cachedSanoNodeMap.value[nid]
      if (node)
        nodes.push(node)
    }
    return nodes
  })
}

export function getNodeBundle<NID extends Nid>(nid: NID): ComputedSanoNodeBundle {
  let nodeBundle = sanoNodeBundleMap[nid]
  if (nodeBundle)
    return nodeBundle

  // create and cache nodeBundle
  const mainNode = getNode(nid)
  const childNodes = computed(() => {
    const _childNodes: SanoNode[] = []
    if (!mainNode.value)
      return _childNodes
    for (const childNodeNid of mainNode.value.children) {
      const childNode = cachedSanoNodeMap.value[childNodeNid]
      if (childNode)
        _childNodes.push(childNode)
    }
    return _childNodes
  })
  nodeBundle = { mainNode, childNodes }
  sanoNodeBundleMap[nid] = nodeBundle
  return nodeBundle
}
