<template>
    <Toast position="top-right" />
</template>

<script setup>
    import { useToastStore } from '@/stores/toastStore'
    import { storeToRefs } from 'pinia'
    import { watch } from 'vue'
    import { useToast } from 'primevue/usetoast'

    const toast = useToast()
    const toastStore = useToastStore()
    const { toasts } = storeToRefs(toastStore)

    watch(toasts, (newToasts) => {
      newToasts.forEach(t => {
        toast.add(t)
        toastStore.removeToast(t.id)
      })
    }, { deep: true })
</script>
