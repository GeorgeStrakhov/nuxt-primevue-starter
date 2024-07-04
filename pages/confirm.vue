<script setup lang="ts">
    import CenterSpinner from '~/components/CenterSpinner.vue'
    const user = useSupabaseUser()

    // Get redirect path from cookies
    const cookieName = useRuntimeConfig().public.supabase.cookieName
    const redirectPath = useCookie(`${cookieName}-redirect-path`).value

    // Redirect to path if user is logged in
    watch(user, () => {
      if (user.value) {
          // Clear cookie
          useCookie(`${cookieName}-redirect-path`).value = null
          // Redirect to path
          return navigateTo(redirectPath || '/'); 
      }
    }, { immediate: true })
</script>

<template>
    <CenterSpinner />
</template>

