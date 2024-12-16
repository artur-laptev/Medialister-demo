type SortOrder = 'asc' | 'desc';
type SortKey<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];

const SORT_ORDER: Record<string, SortOrder> = {
  ASC: 'asc',
  DESC: 'desc',
}

export const useSort = <T extends Record<string, unknown>>(source: MaybeRefOrGetter<T[]>) => {
  const sortedKey = ref<SortKey<T> | null>(null);
  const sortOrder = ref<SortOrder | null>(null);

  const isAscOrder = computed(() => sortOrder.value === SORT_ORDER.ASC);

  const isSorted = computed(() => !!sortOrder.value);

  const data = computed(() => {
    const array = [...toValue(source)];

    if (!isSorted.value) {
      return array;
    }

    return array.sort((a, b) => {
      const key = sortedKey.value;
      const order = sortOrder.value;

      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === SORT_ORDER.ASC ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  });

  const sortBy = (key: SortKey<T>) => {
    if (sortedKey.value === key) {
      sortOrder.value = sortOrder.value === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC;
    } else {
      sortedKey.value = key;
      sortOrder.value = SORT_ORDER.ASC;
    }
  };

  return {
    data,
    isAscOrder,
    isSorted,
    sortBy,
  };
}
