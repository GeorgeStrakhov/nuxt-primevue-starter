<template>
    <CustomToast />
    <div class="min-h-screen flex flex-column">
        <div class="w-full flex justify-content-between flex-wrap gap-2 p-2">
            <Button
                @click="navigateTo('/')"
                label="Home"
                severity="secondary"
                class="p-button-sm"
                />
            <!--
            <Button
                @click="navigateTo('/about')"
                label="About"
                severity="secondary"
                class="p-button-sm"
                />
            <Button
                @click="navigateTo('/notes')"
                label="Notes"
                severity="secondary"
                class="p-button-sm"
                />
            -->
            <Button
                v-if="user"
                @click="logout"
                label="Logout"
                class="p-button-sm"
                />
            <Button
                    v-else
                    @click="login"
                    label="Login"
                    class="p-button-sm"
                    />
        </div>
        <div class="flex-grow-1 p-2">
            <slot />
        </div>

        <footer class="bg-gray-100 p-4 text-center opacity-40">
            <small>© 2024 My Nuxt App. All rights reserved.</small>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CustomToast from '@/components/CustomToast.vue'
import { useCustomToast } from '@/composables/useCustomToast'

const { showErrorToast } = useCustomToast()

const supabase = useSupabaseClient()
const user = useSupabaseUser()


const login = async () => {
    navigateTo('/login')
}

const logout = async () => {
    const { error } = await supabase.auth.signOut()
    navigateTo('/')
    if (error) {
        console.error('Error logging out:', error.message)
        showErrorToast('Error logging out... please try again later')
    }
}
</script>
