<template>
  <div
    ref="parentRef"
    class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 overflow-auto"
  >
    <div
      class="relative w-full"
      :style="{ height: `${totalSize}px` }"
    >
      <div
        v-for="virtualRow in virtualRows"
        :key="virtualRow.index"
        class="absolute top-0 left-0 w-full"
        :style="{
          height: `${virtualRow.size}px`,
          transform: `translateY(${virtualRow.start}px)`,
        }"
      >
        <slot :item="items[virtualRow.index]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T">
import { useVirtualizer } from '@tanstack/vue-virtual'

const props = defineProps<{
  items: T[]
  initialOffset: number
}>()

const emit = defineEmits<{
  updateOffset: [number]
}>()

const parentRef = ref<HTMLElement | null>(null)

const rowVirtualizerOptions = computed(() => ({
  count: props.items.length,
  initialOffset: props.initialOffset,
  overscan: 10,
  getScrollElement: () => parentRef.value,
  estimateSize: () => 73,
}))

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

watch(() => rowVirtualizer.value.scrollOffset, (offset) => {
  if (offset) {
    emit('updateOffset', offset)
  }
})
</script>