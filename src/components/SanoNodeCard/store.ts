import { reactive } from 'vue'

export interface SanoNodeCardStore {
  formVisible: boolean
  toggleForm(): void
}

const createStore = (): SanoNodeCardStore => ({
  formVisible: false,
  toggleForm() {
    this.formVisible = !this.formVisible
  },
})

export const useSanoNodeCardStore = () => {
  const store = reactive(createStore())
  return { store }
}
