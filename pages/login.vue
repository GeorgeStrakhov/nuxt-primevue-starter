<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    const { showToast, showSuccessToast, showErrorToast } = useCustomToast()
    const supabase = useSupabaseClient()

    const isLoading = ref(false)
    const user = useSupabaseUser()

    const getURL = () => {
        let url =
            process?.env?.NUXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
            process?.env?.NUXT_ENV_VERCEL_URL ?? // Automatically set by Vercel.
            'http://localhost:3000/'
        // Make sure to include `https://` when not localhost.
        url = url.startsWith('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.endsWith('/') ? url : `${url}/`
        return url
    }

    const login = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getURL(),
        },
      })
    }

    onMounted(() => {
        if (user.value) {
            navigateTo('/')
        }
    })

</script>

<template>
    <div class="grid text-center">
        <div class="col-12 p-0 pt-8">
            <Button label="Sign in with google" @click="login" :loading="isLoading" :disabled="isLoading" />
        </div>
    </div>
</template>

