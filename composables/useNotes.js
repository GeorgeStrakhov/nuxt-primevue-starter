// composables/useNotes.js
import { ref } from 'vue'

export const useNotes = () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const notes = ref([])
    const loading = ref(false)
    const error = ref(null)

    const setError = (e) => {
        console.error('Error:', e)
        error.value = e.message || 'An unexpected error occurred'
    }

    const fetchNotes = async () => {
        loading.value = true
        error.value = null
        try {
            const { data, error: fetchError } = await supabase
                .from('notes')
                .select('*')
                .order('created_at', { ascending: false })

            if (fetchError) throw fetchError
            notes.value = data
        } catch (e) {
            setError(e)
        } finally {
            loading.value = false
        }
    }

    const addNote = async (content) => {
        loading.value = true
        error.value = null
        try {
            if (!user.value) throw new Error('User not authenticated')

            const { data, error: insertError } = await supabase
                .from('notes')
                .insert({ content, user_id: user.value.id })
                .single()

            if (insertError) throw insertError
            notes.value.unshift(data)
        } catch (e) {
            setError(e)
        } finally {
            loading.value = false
        }
    }

    const updateNote = async (id, content) => {
        loading.value = true
        error.value = null
        try {
            const { data, error: updateError } = await supabase
                .from('notes')
                .update({ content, updated_at: new Date() })
                .match({ id, user_id: user.value.id })
                .single()

            if (updateError) throw updateError
            const index = notes.value.findIndex(note => note.id === id)
            if (index !== -1) notes.value[index] = data
        } catch (e) {
            setError(e)
        } finally {
            loading.value = false
        }
    }

    const deleteNote = async (id) => {
        loading.value = true
        error.value = null
        try {
            const { error: deleteError } = await supabase
                .from('notes')
                .delete()
                .match({ id, user_id: user.value.id })

            if (deleteError) throw deleteError
            notes.value = notes.value.filter(note => note.id !== id)
        } catch (e) {
            setError(e)
        } finally {
            loading.value = false
        }
    }

    return {
        notes,
        loading,
        error,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote
    }
}
