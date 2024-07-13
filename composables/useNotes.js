// composables/useNotes.js
import { ref } from 'vue'

export const useNotes = () => {
  const notes = useState('notes', () => [])
  const loading = useState('notesLoading', () => false)
  const error = useState('notesError', () => null)

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

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
      error.value = e.message || 'An unexpected error occurred'
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
        .select()
        .single()
      if (insertError) throw insertError
      notes.value = [data, ...notes.value]
    } catch (e) {
      error.value = e.message || 'An unexpected error occurred'
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
        .eq('id', id)
        .select()
        .single()
      if (updateError) throw updateError
      const index = notes.value.findIndex(note => note.id === id)
      if (index !== -1) {
        notes.value = [
          ...notes.value.slice(0, index),
          data,
          ...notes.value.slice(index + 1)
        ]
      }
    } catch (e) {
      error.value = e.message || 'An unexpected error occurred'
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
        .eq('id', id)
      if (deleteError) throw deleteError
      notes.value = notes.value.filter(note => note.id !== id)
    } catch (e) {
      error.value = e.message || 'An unexpected error occurred'
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
