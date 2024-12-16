<template>
  <div class="flex items-center py-4 border-b border-gray-700">
    <div class="flex-shrink-0">
      <img class="w-8 h-8 rounded-full" :src="avatarSrc" alt="avatar image">
    </div>
    <div class="flex-1 min-w-0 ms-4">
      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
        {{ title }}
      </p>
      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
        {{ subtitle }}
      </p>
    </div>
    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white ps-2">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  avatarSrc: string;
  title: string;
  subtitle: string;
  text: string;
}>()
</script>