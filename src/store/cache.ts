import { ref, isRef } from 'vue'
import { asyncComputed } from '@vueuse/core'
import type { Ref } from 'vue'
import {
  SanoNid,
  SanoNode,
  SanoNodeBundle,
  SanoNodeRecord,
} from '../types'

import {
  getNodes as getNodesApi,
  getNode as getNodeApi,
  getNodeBundle as getNodeBundleApi,
} from '../api/node'

const cachedSanoNodeRecord = ref<SanoNodeRecord>({})

async function cacheNode<NID extends SanoNid>(nid: NID): Promise<SanoNode | undefined> {
  const res = await getNodeApi(nid)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const node = await res.json()
  cachedSanoNodeRecord.value[node.nid] = node
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
    cachedSanoNodeRecord.value[node.nid] = node
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
  cachedSanoNodeRecord.value[mainNode.nid] = mainNode
  for (const childNode of childNodes)
    cachedSanoNodeRecord.value[childNode.nid] = childNode
  return nodeBundle
}

export async function ensureNode<NID extends SanoNid>(nid: NID, refresh = false) {
  const node = cachedSanoNodeRecord.value[nid]
  if (node && !refresh)
    return node
  else
    return await cacheNode(nid)
}

export async function ensureNodes<NID extends SanoNid>(nids: NID[], refresh = false) {
  if (refresh)
    return await cacheNodes(nids) || []

  const uncachedNodeNids = nids.filter(nid => !cachedSanoNodeRecord.value[nid])
  await cacheNodes(uncachedNodeNids)

  const nodes: SanoNode[] = []
  for (const nid of nids) {
    const node = cachedSanoNodeRecord.value[nid]
    if (node) nodes.push(node)
  }
  return nodes
}

export async function ensureNodeBundle<NID extends SanoNid>(nid: NID, refresh = false) {
  if (refresh)
    return await cacheNodeBundle(nid)

  const mainNode = cachedSanoNodeRecord.value[nid]
  if (!mainNode)
    return await cacheNodeBundle(nid)

  const childNodes = await ensureNodes(mainNode.children)
  return { mainNode, childNodes }
}

export function useNode<NID extends SanoNid>(nid: NID | Ref<NID | undefined>, beforeUpdate?: () => any, afterUpdate?: () => any) {
  return asyncComputed(async() => {
    beforeUpdate?.()
    const _nid = isRef(nid) ? nid.value : nid
    if (!_nid) {
      afterUpdate?.()
      return undefined
    }
    await ensureNode(_nid)
    afterUpdate?.()
    return cachedSanoNodeRecord.value[_nid]
  }, undefined)
}

export function useNodes<NID extends SanoNid>(nids: NID[] | Ref<NID[]>, beforeUpdate?: () => any, afterUpdate?: () => any) {
  return asyncComputed(async() => {
    beforeUpdate?.()
    const _nids = isRef(nids) ? nids.value : nids
    await ensureNodes(_nids)
    const nodes = []
    for (const nid of _nids) {
      const node = cachedSanoNodeRecord.value[nid]
      if (node) nodes.push(node)
    }
    afterUpdate?.()
    return nodes
  }, [])
}

export function useNodeBundle<NID extends SanoNid>(nid: NID | Ref<NID | undefined>, beforeUpdate?: () => any, afterUpdate?: () => any) {
  return asyncComputed(async() => {
    beforeUpdate?.()
    const _nid = isRef(nid) ? nid.value : nid
    if (!_nid) {
      afterUpdate?.()
      return undefined
    }
    await ensureNodeBundle(_nid)
    const mainNode = cachedSanoNodeRecord.value[_nid]
    if (!mainNode) {
      afterUpdate?.()
      return undefined
    }
    const childNodes = []
    for (const childNids of mainNode.children) {
      const childNode = cachedSanoNodeRecord.value[childNids]
      if (childNode) childNodes.push(childNode)
    }
    afterUpdate?.()
    return { mainNode, childNodes }
  }, undefined)
}
