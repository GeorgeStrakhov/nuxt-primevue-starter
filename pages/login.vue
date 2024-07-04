<script setup lang="ts">
    const { showToast, showSuccessToast, showErrorToast } = useCustomToast()
    const supabase = useSupabaseClient()
    const email = ref('')

    const isLoading = ref(false)

    const signInWithOtp = async () => {
        isLoading.value = true
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
            options: {
                emailRedirectTo: 'http://localhost:3000/confirm',
            }
        })
        if (error) showErrorToast(error.message)
        else showSuccessToast('One time code sent to your email')
        isLoading.value = false
    }
</script>

<template>
    <div class="grid text-center">
        <div class="col-12 pt-6">
            <InputText v-model="email" type="email"/>
        </div>
        <div class="col-12 p-0 pt-2">
            <Button label="Sign in with email" @click="signInWithOtp" :loading="isLoading" :disabled="isLoading" />
        </div>
    </div>
</template>

