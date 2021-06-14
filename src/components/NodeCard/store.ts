import { reactive } from 'vue'

export interface NodeCardStore {
  formVisible: boolean
  toggleForm(): void
}

const createStore = (): NodeCardStore => ({
  formVisible: false,
  toggleForm() {
    this.formVisible = !this.formVisible
  },
})

export const useNodeCardStore = () => {
  const store = reactive(createStore())
  return { store }
}
