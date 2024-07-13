<template>
    <div class="grid">
        <div class="col-12 md:col-6 md:col-offset-3">
            <h2>What kind of question do you want to generate?</h2>
            <hr />

            <p>
            <p>GV model category:</p>
            <Select
                    v-model="selectedCategory"
                    :options="categories"
                    optionLabel="category"
                    placeholder="Select a Category"
                    @change="onCategoryChange"
                    />
            </p>

            <p>
            <p v-if="selectedCategory">GV model item:</p>
            <Select
                    v-if="selectedCategory"
                    v-model="selectedItem"
                    :options="filteredItems"
                    optionLabel="item"
                    placeholder="Select an Item"
                    />
            </p>

            <p v-if="selectedItemDescription">
                Definition: <br />{{ selectedItemDescription }}
            </p>

            <div v-if="selectedItem">
                <p>Company context:</p>
                <Textarea v-model="companyContext" rows="3" />

            </div>

            <div v-if="selectedItem && companyContext">
                <p>Question seed:</p>
                <InputText v-model="questionSeed" />
            </div>

            <div v-if="selectedItem && companyContext && questionSeed"> <p>OCE from OCEAN motivation model:</p>
                <Select
                    v-model="selectedOCE"
                    :options="OCEoptions"
                    optionLabel="label"
                    placeholder="Select an OCE"
                    />
            </div>


            <br /><br />

            <div v-if="selectedItem && companyContext && questionSeed && selectedOCE">
                <Button @click="handleClick" label="generate a question" :loading="isLoading" :disabled="isLoading" />
            </div>

            <div v-if="llmAnswer">
                <br />
                <hr />
                <br />
                <h3>Question generated:</h3>
                <pre>{{ llmAnswer }}</pre>
            </div>
        </div>
    </div>
</template>

<style>
/* Optional: Add some styling */
pre {
    padding: 10px;
    border-radius: 5px;
    overflow: auto;
}
</style>

<script setup>
    import { ref, computed } from 'vue'
    import { useCustomToast } from '@/composables/useCustomToast'

    const { showToast, showSuccessToast, showErrorToast } = useCustomToast()

    //OCE from OCEAN motivation model
    const OCEoptions = [
        { label: 'Openness', value: 'Openness' },
        { label: 'Conscientiousness', value: 'Conscientiousness' },
        { label: 'Extraversion', value: 'Extraversion' },
    ]

    const selectedOCE = ref('Openness')

    //our model
    const GVmodelParams = [
        { "category": "PERFORMANCE", "item": "Workload volume", "definition": "The amount of work assigned to an individual, impacting their ability to manage tasks effectively and maintain a healthy work-life balance." },
        { "category": "PERFORMANCE", "item": "Timing for tasks", "definition": "The scheduling and deadlines associated with tasks, affecting an individual's ability to plan and execute their work efficiently." },
        { "category": "PERFORMANCE", "item": "Workload stress", "definition": "The stress experienced due to the demands of the job, which can affect both mental and physical health." },
        { "category": "PERFORMANCE", "item": "Work intensity", "definition": "The level of effort and energy required to complete work tasks, influencing fatigue and overall job satisfaction." },
        { "category": "PERFORMANCE", "item": "Energy levels", "definition": "The individual's physical and mental stamina to perform work tasks effectively throughout the day." },
        { "category": "COMMUNITY", "item": "Organization support", "definition": "The degree of support and resources provided by the organization to help employees succeed in their roles." },
        { "category": "COMMUNITY", "item": "Trust levels", "definition": "The extent of trust between employees and management, which can enhance cooperation and morale." },
        { "category": "COMMUNITY", "item": "Collaboration", "definition": "The ability and willingness of employees to work together towards common goals, fostering a sense of teamwork." },
        { "category": "COMMUNITY", "item": "Conflict", "definition": "The presence and resolution of disagreements or disputes within the workplace, impacting the overall work environment." },
        { "category": "COMMUNITY", "item": "Relationships with manager", "definition": "The quality of the relationship between employees and their direct supervisors, which can affect job satisfaction and performance." },
        { "category": "OWNERSHIP", "item": "Professional autonomy", "definition": "The degree of control and discretion employees have over their work and decisions, contributing to a sense of empowerment." },
        { "category": "OWNERSHIP", "item": "Skill utilization", "definition": "The extent to which employees are able to use their skills and abilities in their job roles, enhancing job satisfaction and productivity." },
        { "category": "OWNERSHIP", "item": "Censorship", "definition": "The extent to which employees feel their ideas and expressions are restricted, impacting creativity and openness." },
        { "category": "OWNERSHIP", "item": "Technology use", "definition": "The availability and effectiveness of technology tools that support employees in performing their tasks efficiently." },
        { "category": "OWNERSHIP", "item": "Access to resources", "definition": "The availability of necessary resources, such as information, materials, and support, to perform job tasks effectively." },
        { "category": "ENGAGEMENT", "item": "Role clarity", "definition": "The extent to which employees understand their job responsibilities and expectations, reducing confusion and enhancing performance." },
        { "category": "ENGAGEMENT", "item": "Task diversity", "definition": "The variety of tasks and activities an employee engages in, which can prevent monotony and enhance job satisfaction." },
        { "category": "ENGAGEMENT", "item": "Meaning", "definition": "The sense of purpose and significance employees derive from their work, which can enhance motivation and engagement." },
        { "category": "ENGAGEMENT", "item": "Accomplishment", "definition": "The sense of achievement employees feel when they successfully complete tasks and reach goals, boosting morale and motivation." },
    ]

    const data = GVmodelParams

    const selectedCategory = ref(null);
    const selectedItem = ref(null);

    const categories = computed(() => {
        return [...new Set(data.map(entry => entry.category))].map(category => ({ category }));
    });

    const filteredItems = computed(() => {
        return data.filter(entry => entry.category === selectedCategory.value.category);
    });

    const companyContext = ref('')
    const questionSeed = ref('')

    const llmAnswer = ref('')
    const isLoading = ref(false)

    const onCategoryChange = () => {
        selectedItem.value = null;
    };

    const selectedItemDescription = computed(() => {
        return selectedItem.value ? selectedItem.value.definition : '';
    });

    const userInput = computed(() => {
        return JSON.stringify({
            category: selectedCategory.value.category,
            item: selectedItem.value.item,
            description: selectedItemDescription.value,
            companyContext: companyContext.value,
            questionSeed: questionSeed.value,
            OCE: selectedOCE.value.value
        })
    })
        
    const handleClick = async () => {
        isLoading.value = true
        console.log(userInput.value)

        const response = await $fetch('/api/generate_gv_question', {
            method: 'post',
            body: { userMessage: userInput.value }
          })

        llmAnswer.value = response.answer
        showSuccessToast('yay! question generated!')
        isLoading.value = false
    }

</script>
