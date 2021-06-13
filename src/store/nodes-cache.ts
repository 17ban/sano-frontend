import { ref } from 'vue'
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

export const cachedSanoNodeMap = ref<SanoNodeMap>({})

export async function cacheNode<NID extends Nid>(nid: NID): Promise<SanoNode | undefined> {
  const res = await getNodeApi(nid)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const node = await res.json()
  cachedSanoNodeMap.value[node.nid] = node
  return node
}

export async function cacheNodes<NID extends Nid>(nids: NID[]): Promise<SanoNodeMap | undefined> {
  const res = await getNodesApi(nids)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const nodes = await res.json()
  Object.assign(cachedSanoNodeMap.value, nodes)
  return nodes
}

export async function cacheNodeBundle<NID extends Nid>(nid: NID): Promise<SanoNodeMap | undefined> {
  const res = await getNodeBundleApi(nid)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const nodes = await res.json()
  Object.assign(cachedSanoNodeMap.value, nodes)
  return nodes
}

export async function getNode<NID extends Nid>(nid: NID) {
  return cachedSanoNodeMap.value[nid] || await cacheNode(nid)
}

export async function getNodes<NID extends Nid>(nids: NID[]) {
  const nodes: SanoNodeMap = { }
  const getList: Nid[] = []
  for (const nid of nids) {
    if (cachedSanoNodeMap.value[nid])
      nodes[nid] = cachedSanoNodeMap.value[nid]
    else
      getList.push(nid)
  }
  if (getList.length > 0)
    Object.assign(nodes, await cacheNodes(getList))

  return nodes
}

export async function getNodeBundle<NID extends Nid>(nid: NID) {
  const node = await getNode(nid)
  if (!node)
    return
  const nodeMap = await getNodes(node.children)
  nodeMap[nid] = node
  return nodeMap
}
