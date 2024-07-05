<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    const { showToast, showSuccessToast, showErrorToast } = useCustomToast()
    const supabase = useSupabaseClient()

    const isLoading = ref(false)
    const user = useSupabaseUser()

    const login = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'window.location.host' + '/confirm',
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

