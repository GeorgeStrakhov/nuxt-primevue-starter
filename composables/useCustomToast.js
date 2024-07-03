import { useToastStore } from '@/stores/toastStore';

export const useCustomToast = () => {
    const toastStore = useToastStore()

    const defaultOptions = {
        life: 3000,
        severity: 'success'
    }

    const showToast = (options) => {
        const id = Date.now()
        const mergedOptions = { ...defaultOptions, ...options, id }
        toastStore.addToast(mergedOptions)
    }

    const showSuccessToast = (message, title = 'Success') => {
        showToast({
            severity: 'success',
            summary: title,
            detail: message
        })
    }

    const showErrorToast = (message, title = 'Error') => {
        showToast({
            severity: 'error',
            summary: title,
            detail: message,
            life: 5000 // Errors might need more time to read
        })
    }

    const showInfoToast = (message, title = 'Information') => {
        showToast({
            severity: 'info',
            summary: title,
            detail: message
        })
    }

    const showWarningToast = (message, title = 'Warning') => {
        showToast({
            severity: 'warn',
            summary: title,
            detail: message,
            life: 4000 // Warnings might need slightly more time to read
        })
    }

    return {
        showToast,
        showSuccessToast,
        showErrorToast,
        showInfoToast,
        showWarningToast
    }
}
