<template>
    <CustomToast />
    <div class="container">
        <div class="grid">
            <div class="col-12 md:col-4 md:col-offset-4">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
    import CustomToast from '@/components/CustomToast.vue'
</script>
