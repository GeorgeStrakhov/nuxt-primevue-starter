<template>
    <div>
        <h2>hello</h2>
        <InputText v-model="userInput" />

        <br />
        <br />

        <Button @click="handleClick" label="ask llm" />
        <div v-if="llmAnswer">
            <br />
            <hr />
            <br />
            <h3>llm says: {{ llmAnswer }}</h3>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const llmAnswer = ref('')
    const userInput = ref('')

    const handleClick = async () => {
        const response = await $fetch('/api/llm', {
            method: 'post',
            body: { userMessage: userInput.value }
          })

        llmAnswer.value = response.answer
    }

</script>
