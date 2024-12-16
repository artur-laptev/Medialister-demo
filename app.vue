<template>
  <div class="pt-6">
    <VSpinner v-if="isPending" />
    <p v-else-if="isError">Error: {{ error?.message }}</p>
    <div v-else class="w-full max-w-4xl mx-auto">
      <div>
        <div class="flex items-center justify-between mb-4 px-8">
          <div class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Companies
          </div>

          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="sortBy('views')"
          >
            Sort by views
            <svg
              v-if="isSorted"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              class="w-3.5 h-3.5 ms-2"
              :class="[isAscOrder ? '-rotate-90' : 'rotate-90']"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        </div>

        <VVirtualList
          :items="sortedRows"
          :has-next-page="hasNextPage"
          :is-fetching-next-page="isFetchingNextPage"
          class="h-[85vh]"
          @load-more="fetchNextPage"
        >
          <template #default="{ item }">
            <VListItem
              :avatar-src="item.avatar"
              :title="item.name"
              :subtitle="item.website"
              :text="formatNumber(item.views)"
            />
          </template>
        </VVirtualList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { class: 'h-full' },
  bodyAttrs: { class: 'h-full bg-white dark:bg-slate-800 antialiased' },
})

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  isError,
  suspense,
} = useInfiniteQuery({
  queryKey: ['companies'],
  queryFn: () => $fetch('/api/companies'),
  initialPageParam: true,
  getNextPageParam: () => true
})

const allRows = computed(() => data.value ? data.value.pages.flatMap((p) => p.data) : [])

const {
  data: sortedRows,
  isAscOrder,
  isSorted,
  sortBy,
} = useSort(allRows);

onServerPrefetch(async () => {
  await suspense()
})
</script>