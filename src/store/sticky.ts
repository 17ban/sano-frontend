import { asyncComputed } from '@vueuse/core'
import { getStickyNids } from '~/api/node'

export const stickyNids = asyncComputed(async() => {
  const res = await getStickyNids()
  return await res.json()
}, [])
