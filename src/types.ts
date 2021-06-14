export type SanoNid = string

export type SanoNodeContentType = 'text' | 'md'

export type SanoNode<NID extends SanoNid = SanoNid> = {
  nid: NID
  depth: number
  index: number
  type: SanoNodeContentType
  content: string
  parent: SanoNid
  children: SanoNid[]
  time: number
  nickname?: string
}

export type SanoNodeRecord = Record<string, SanoNode | undefined>

export type SanoNodeBundle<NID extends SanoNid = SanoNid> = {
  mainNode: SanoNode<NID>
  childNodes: SanoNode[]
}

export interface JsonResponse<T> extends Response {
  json(): Promise<T>
}

export type JsonResponsePromise<T> = Promise<JsonResponse<T>>
