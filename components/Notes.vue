<template>
    <div>
        <Toast />
        <div class="card">
            <h2>My Notes</h2>
            <DataTable :value="notes" :loading="loading" responsive-layout="scroll">
                <Column field="content" header="Note Content">
                    <template #body="slotProps">
                        <InputText v-if="editingNote && editingNote.id === slotProps.data.id"
                            v-model="editingNote.content"
                            @keyup.enter="saveEdit"
                            autofocus
                        />
                        <span v-else>{{ slotProps.data.content }}</span>
                    </template>
                </Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                            @click="startEdit(slotProps.data)"
                        />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                            @click="confirmDelete(slotProps.data)"
                        />
                    </template>
                </Column>
            </DataTable>
        </div>

        <div class="card mt-4">
            <h3>Add New Note</h3>
            <div class="p-inputgroup">
                <InputText v-model="newNoteContent" placeholder="Enter your note" 
                    @keyup.enter="addNewNote"
                />
                <Button label="Add Note" @click="addNewNote" />
            </div>
        </div>

        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNotes } from '~/composables/useNotes'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const toast = useToast()
const confirm = useConfirm()

const { notes, loading, error, fetchNotes, addNote, updateNote, deleteNote } = useNotes()

const newNoteContent = ref('')
const editingNote = ref(null)

onMounted(() => {
    fetchNotes()
})

const addNewNote = async () => {
    if (newNoteContent.value.trim()) {
        await addNote(newNoteContent.value)
        newNoteContent.value = ''
        toast.add({ severity: 'success', summary: 'Success', detail: 'Note added', life: 3000 })
    }
}

const startEdit = (note) => {
    editingNote.value = { ...note }
}

const saveEdit = async () => {
    if (editingNote.value && editingNote.value.content.trim()) {
        await updateNote(editingNote.value.id, editingNote.value.content)
        editingNote.value = null
        toast.add({ severity: 'success', summary: 'Success', detail: 'Note updated', life: 3000 })
    }
}

const confirmDelete = (note) => {
    confirm.require({
        message: 'Are you sure you want to delete this note?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => deleteNoteConfirmed(note),
    })
}

const deleteNoteConfirmed = async (note) => {
    await deleteNote(note.id)
    toast.add({ severity: 'success', summary: 'Success', detail: 'Note deleted', life: 3000 })
}
</script>

<style scoped>
.card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}
</style>
