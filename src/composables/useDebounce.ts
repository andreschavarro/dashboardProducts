import { ref, watch } from 'vue'

export function useDebounce<T>(value: T, delay: number = 500) {
  const debouncedValue = ref<T>(value)
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  watch(
    () => value,
    (newValue) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
    },
    { immediate: true }
  )

  return debouncedValue
}
