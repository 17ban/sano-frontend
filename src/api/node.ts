import type {
  SanoNid,
  SanoNode,
  JsonResponsePromise,
  SanoNodeBundle,
} from '../types'

import {
  queryStr,
} from '../utils/index'

export function getNode(nid: SanoNid): JsonResponsePromise<SanoNode> {
  const query = { nid }
  return fetch(`/api/node${queryStr(query)}`)
}

export function getNodes(nids: SanoNid[]): JsonResponsePromise<SanoNode[]> {
  const query = { nids: nids.join(',') }
  return fetch(`/api/nodes${queryStr(query)}`)
}

export function getStickyNids(): JsonResponsePromise<SanoNid[]> {
  return fetch('/api/sticky-nids')
}

export function getNodeBundle(nid: SanoNid): JsonResponsePromise<SanoNodeBundle> {
  const query = { nid }
  return fetch(`/api/nodebundle${queryStr(query)}`)
}

export function postNode(content: string, parent: SanoNid, nickname?: string | null): JsonResponsePromise<{ nid: SanoNid }> {
  const data = { content, parent, nickname }
  return fetch('/api/node', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
}
