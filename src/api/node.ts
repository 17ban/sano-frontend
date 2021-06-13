import type {
  SanoNid,
  SanoNode,
  JsonResponse,
  SanoNodeBundle,
} from '../types'

import {
  queryStr,
} from '../utils/index'

export function getNode(nid: SanoNid): Promise<JsonResponse<SanoNode>> {
  const query = { nid }
  return fetch(`/api/node${queryStr(query)}`)
}

export function getNodes(nids: SanoNid[]): Promise<JsonResponse<SanoNode[]>> {
  const query = { nids: nids.join(',') }
  return fetch(`/api/nodes${queryStr(query)}`)
}

export function getNodeBundle(nid: SanoNid): Promise<JsonResponse<SanoNodeBundle>> {
  const query = { nid }
  return fetch(`/api/nodebundle${queryStr(query)}`)
}

export function postNode(content: string, parent: SanoNid, nickname?: string | null): Promise<JsonResponse<{ nid: SanoNid }>> {
  const data = { content, parent, nickname }
  return fetch('/api/node', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
}
