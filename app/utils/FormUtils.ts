import { useFetcher } from '@remix-run/react'

export const getForm = (): HTMLFormElement => {
    const form = document.querySelector('form') as HTMLFormElement
    return form
}

export const getFormData = () => {
    const form: HTMLFormElement = getForm()
    const formData = new FormData(form)
    return Object.fromEntries(formData.entries())
}

export const resetForm = () => {
    const form: HTMLFormElement = getForm()
    form.reset()
}

export const submitForm = (data?: any, action?: string) => {
    if (!action) {
        const form: HTMLFormElement = getForm()
        form.submit()
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const fetcher = useFetcher()
        const formData = data ?? getFormData()

        fetcher.submit(formData, {
            method: 'post',
            action,
        })
    }

    resetForm()
}

export const getRequestFormData = async (request: Request) => {
    if (request.method !== 'POST') {
        throw new Error('Method not allowed')
    }

    return Object.fromEntries((await request.formData()).entries())
}
