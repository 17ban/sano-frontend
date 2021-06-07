import type {
  Nid,
  SanoNode,
  SanoNodeMap,
  JsonResponse,
} from '../types'

import {
  queryStr,
} from '../utils/index'

export function getNode(nid: Nid): Promise<JsonResponse<SanoNode>> {
  const query = { nid }
  return fetch(`/api/node${queryStr(query)}`)
}

export function getNodes(nids: Nid[]): Promise<JsonResponse<SanoNodeMap>> {
  const query = { nids: nids.join(',') }
  return fetch(`/api/nodes${queryStr(query)}`)
}

export function getNodeBundle(nid: Nid): Promise<JsonResponse<SanoNodeMap>> {
  const query = { nid }
  return fetch(`/api/nodebundle${queryStr(query)}`)
}

export function postNode(content: string, parent: Nid, nickname?: string | null): Promise<JsonResponse<{ nid: Nid }>> {
  const data = { content, parent, nickname }
  return fetch('/api/node', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
}
