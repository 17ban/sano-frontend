import { ref, isRef } from 'vue'
import { asyncComputed } from '@vueuse/core'
import type { Ref } from 'vue'
import {
  SanoNid,
  SanoNode,
  SanoNodeBundle,
  SanoNodeMap,
} from '../types'

import {
  getNodes as getNodesApi,
  getNode as getNodeApi,
  getNodeBundle as getNodeBundleApi,
} from '../api/node'

const cachedSanoNodeMap = ref<SanoNodeMap>({})

async function cacheNode<NID extends SanoNid>(nid: NID): Promise<SanoNode | undefined> {
  const res = await getNodeApi(nid)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const node = await res.json()
  cachedSanoNodeMap.value[node.nid] = node
  return node
}

async function cacheNodes<NID extends SanoNid>(nids: NID[]): Promise<SanoNode[] | undefined> {
  if (nids.length === 0)
    return
  const res = await getNodesApi(nids)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const nodes = await res.json()
  for (const node of nodes)
    cachedSanoNodeMap.value[node.nid] = node
  return nodes
}

async function cacheNodeBundle<NID extends SanoNid>(nid: NID): Promise<SanoNodeBundle | undefined> {
  const res = await getNodeBundleApi(nid)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const nodeBundle = await res.json()
  const { mainNode, childNodes } = nodeBundle
  cachedSanoNodeMap.value[mainNode.nid] = mainNode
  for (const childNode of childNodes)
    cachedSanoNodeMap.value[childNode.nid] = childNode
  return nodeBundle
}

export async function ensureNode<NID extends SanoNid>(nid: NID, refresh = false) {
  const node = cachedSanoNodeMap.value[nid]
  if (node && !refresh)
    return node
  else
    return await cacheNode(nid)
}

export async function ensureNodes<NID extends SanoNid>(nids: NID[], refresh = false) {
  if (refresh)
    return await cacheNodes(nids) || []

  const uncachedNodeNids = nids.filter(nid => !cachedSanoNodeMap.value[nid])
  await cacheNodes(uncachedNodeNids)

  const nodes: SanoNode[] = []
  for (const nid of nids) {
    const node = cachedSanoNodeMap.value[nid]
    if (node) nodes.push(node)
  }
  return nodes
}

export async function ensureNodeBundle<NID extends SanoNid>(nid: NID, refresh = false) {
  if (refresh)
    return await cacheNodeBundle(nid)

  const mainNode = cachedSanoNodeMap.value[nid]
  if (!mainNode)
    return await cacheNodeBundle(nid)

  const childNodes = await ensureNodes(mainNode.children)
  return { mainNode, childNodes }
}

export function useNode<NID extends SanoNid>(nid: NID | Ref<NID | undefined>) {
  return asyncComputed(async() => {
    const _nid = isRef(nid) ? nid.value : nid
    if (!_nid)
      return undefined
    await ensureNode(_nid)
    return cachedSanoNodeMap.value[_nid]
  }, undefined)
}

export function useNodes<NID extends SanoNid>(nids: NID[] | Ref<NID[]>) {
  return asyncComputed(async() => {
    const _nids = isRef(nids) ? nids.value : nids
    await ensureNodes(_nids)
    const nodes = []
    for (const nid of _nids) {
      const node = cachedSanoNodeMap.value[nid]
      if (node) nodes.push(node)
    }
    return nodes
  }, [])
}

export function useNodeBundle<NID extends SanoNid>(nid: NID | Ref<NID | undefined>) {
  return asyncComputed(async() => {
    const _nid = isRef(nid) ? nid.value : nid
    if (!_nid)
      return undefined
    await ensureNodeBundle(_nid)
    const mainNode = cachedSanoNodeMap.value[_nid]
    if (!mainNode)
      return undefined
    const childNodes = []
    for (const childNids of mainNode.children) {
      const childNode = cachedSanoNodeMap.value[childNids]
      if (childNode) childNodes.push(childNode)
    }
    return { mainNode, childNodes }
  }, undefined)
}
