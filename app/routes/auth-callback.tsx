import { json, redirect, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getApp, initializeApp } from 'firebase/app'
import { getAuth, verifyPasswordResetCode } from 'firebase/auth'

export async function loader({ request }: ActionFunctionArgs) {
    const url = new URL(request.url)
    const mode = url.searchParams.get('mode')
    const oobCode = url.searchParams.get('oobCode')
    const apiKey = url.searchParams.get('apiKey') ?? ''
    const lang = url.searchParams.get('lang') ?? 'en'
    const continueUrl = url.searchParams.get('continueUrl')
    const searchParamsString = `?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}&continueUrl=${continueUrl}`

    enum AuthMode {
        VERIFY_EMAIL = 'verifyEmail',
        RESET_PASSWORD = 'resetPassword',
    }

    // Configure the Firebase SDK.
    const appName = 'authCallbackApp'
    if (!getApp(appName)) {
        initializeApp({ apiKey }, appName)
    }
    const app = getApp(appName)

    if (!app) {
        throw new Error('Firebase is not initialized.')
    }

    const auth = getAuth(app)
    if (!auth) {
        throw new Error('Firebase Auth is not initialized.')
    }

    switch (mode) {
        case AuthMode.VERIFY_EMAIL:
            break
        case AuthMode.RESET_PASSWORD:
            try {
                const email = await verifyPasswordResetCode(auth, oobCode ?? '')
                console.log(email)
                if (email) {
                    // Redirect to password reset page if email is verified
                    return redirect(`/password-reset${searchParamsString}`)
                }
            } catch (error) {
                console.error(
                    `Error from validation: ${(error as Error).message}`,
                )
                return json({
                    pageName: 'Error',
                    errorMessage: 'Invalid or expired code.',
                })
            }
            break
        default:
            return json({ pageName: 'Error', errorMessage: 'URL is invalid' })
    }

    return json({
        pageName: 'Error',
        errorMessage: 'Unexpected error occurred.',
    })
}

export default function AuthCallback() {
    const data = useLoaderData<any>()
    const { errorMessage } = data

    return <h2>{errorMessage}</h2>
}
