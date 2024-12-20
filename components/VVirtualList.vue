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
        <template v-if="virtualRow.index + 1 > items.length - 1">
          <div
            v-if="hasNextPage"
            class="flex justify-center items-center pt-5"
          >
            <VSpinner />
          </div>
          <template v-else>
            Nothing more to load
          </template>
        </template>
        <template v-else>
          <slot :item="items[virtualRow.index]" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T">
import { useVirtualizer } from '@tanstack/vue-virtual'

const props = defineProps<{
  items: T[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
}>()

const emit = defineEmits<{
  loadMore: []
}>()

const parentRef = ref<HTMLElement | null>(null)

const rowVirtualizerOptions = computed(() => ({
  count: props.items.length,
  overscan: 3,
  getScrollElement: () => parentRef.value,
  estimateSize: () => 73,
}))

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

watchEffect(() => {
  const [lastItem] = [...virtualRows.value].reverse()

  if (!lastItem) {
    return
  }

  if (lastItem.index >= props.items.length - 1 && props.hasNextPage && !props.isFetchingNextPage) {
    emit('loadMore');
  }
})
</script>