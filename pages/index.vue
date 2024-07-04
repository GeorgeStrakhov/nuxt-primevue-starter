<template>
    <div class="grid">
        <div class="col-12 md:col-6 md:col-offset-3">
            <h2>hello</h2>
            <InputText v-model="userInput" />

            <br />
            <br />

            <Button @click="handleClick" label="ask llm" :loading="isLoading" :disabled="isLoading" />
            <div v-if="llmAnswer">
                <br />
                <hr />
                <br />
                <h3>llm says: {{ llmAnswer }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useCustomToast } from '@/composables/useCustomToast'

    const { showToast, showSuccessToast, showErrorToast } = useCustomToast()

    const llmAnswer = ref('')
    const userInput = ref('')
    const isLoading = ref(false)
        
    const handleClick = async () => {
        isLoading.value = true
        //check if user input is empty
        if (!userInput.value) {
            showErrorToast('Please enter a question')
            isLoading.value = false
            return
        }
        const response = await $fetch('/api/llm', {
            method: 'post',
            body: { userMessage: userInput.value }
          })

        llmAnswer.value = response.answer
        showSuccessToast('llm answered your question')
        isLoading.value = false
    }

</script>
