import {
  Nid,
  SanoNode,
  SanoNodeMap,
  JsonResponse
} from '../types'

import {
  queryStr
} from '../utils'



export function getNode<NID extends Nid>(nid: NID)
: Promise<JsonResponse<SanoNode<NID>>>
{
  const query = { nid }
  return fetch('/api/node' + queryStr(query))
}


export function getNodes<NID extends Nid>(nids: NID[])
: Promise<JsonResponse<SanoNodeMap<NID>>>
{
  const query = { nids: nids.join(',') }
  return fetch('/api/nodes' + queryStr(query))
}


export function getNodeBundle(nid: Nid) 
: Promise<JsonResponse<SanoNodeMap>>
{
  const query = { nid }
  return fetch('/api/nodebundle' + queryStr(query))
}


export function postNode(content: string, parent: Nid, username?: string | null)
: Promise<JsonResponse<{ nid: Nid }>>
{
  const data = { content, parent, username }
  return fetch('/api/node', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  })
}
