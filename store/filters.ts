import { useRoute } from '#vue-router'

export const useFilterStore = defineStore('filtersStore', () => {
  const route = useRoute()
  const filters = ref(null)
  const pendingFilters = ref(false)

  const isFilersEmpty = ref(false)

  return {
    filters,
    pendingFilters,
    isFilersEmpty,
  }
})
