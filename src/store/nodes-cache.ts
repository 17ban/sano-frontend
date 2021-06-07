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

export const sanoNodeMapRef = ref<SanoNodeMap>({})

async function _cacheNode<NID extends Nid>(nid: NID) {
  const res = await getNodeApi(nid)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const node = await res.json()
  sanoNodeMapRef.value[node.nid] = node
  return node
}

async function _cacheNodes<NID extends Nid>(nids: NID[]) {
  const res = await getNodesApi(nids)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const nodes = await res.json()
  Object.assign(sanoNodeMapRef.value, nodes)
  return nodes
}

export async function cacheNodeBundle(nid: Nid) {
  const res = await getNodeBundleApi(nid)
  if (!res.ok) {
    console.error('请求失败😥', res)
    return
  }
  const nodes = await res.json()
  Object.assign(sanoNodeMapRef.value, nodes)
  return nodes
}

export async function getNode<NID extends Nid>(nid: NID): Promise<SanoNode | undefined> {
  return <SanoNode | undefined>sanoNodeMapRef.value[nid] || await _cacheNode(nid)
}

export async function getNodes<NID extends Nid>(nids: NID[]): Promise<SanoNodeMap> {
  const nodes: SanoNodeMap = { }
  const getList: Nid[] = []
  for (const nid of nids) {
    if (sanoNodeMapRef.value[nid])
      nodes[nid] = sanoNodeMapRef.value[nid]
    else
      getList.push(nid)
  }
  if (getList.length > 0)
    Object.assign(nodes, await _cacheNodes(getList))

  return nodes
}
