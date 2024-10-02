import { Grid } from '@mui/material'
import { json, redirect, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getApp, initializeApp } from 'firebase/app'
import {
    applyActionCode,
    checkActionCode,
    getAuth,
    sendPasswordResetEmail,
    verifyPasswordResetCode,
} from 'firebase/auth'

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
        RECOVER_EMAIL = 'recoverEmail',
    }

    // Configure the Firebase SDK.
    const appName = 'authCallbackApp'
    initializeApp({ apiKey }, appName)
    const app = getApp(appName)

    if (!app) {
        throw new Error('Firebase is not initialized.')
    }

    const auth = getAuth(app)
    if (!auth) {
        throw new Error('Firebase Auth is not initialized.')
    }

    if (!oobCode) {
        return json({ pageName: 'Error', errorMessage: 'URL is invalid' })
    }

    switch (mode) {
        case AuthMode.VERIFY_EMAIL:
            applyActionCode(auth, oobCode)
                .then((resp) => {
                    // Email address has been verified.
                    return redirect('/verification-success')
                })
                .catch((error) => {
                    throw new Error('Email verification failed.')
                })
            break
        case AuthMode.RESET_PASSWORD:
            try {
                const email = await verifyPasswordResetCode(auth, oobCode ?? '')
                if (email) {
                    // Redirect to password reset page if email is verified
                    return redirect(`/password-reset${searchParamsString}`)
                }
            } catch (error) {
                throw new Error(
                    `Error from validation: ${(error as Error).message}`,
                )
            }
            break
        case AuthMode.RECOVER_EMAIL:
            try {
                let restoredEmail: string | null | undefined = null
                checkActionCode(auth, oobCode)
                    .then((info) => {
                        restoredEmail = info['data']['email']

                        return applyActionCode(auth, oobCode)
                    })
                    .then(() => {
                        // TODO: Display a confirmation message to the user.

                        sendPasswordResetEmail(auth, restoredEmail ?? '')
                            .then(() => {
                                return redirect('/password-reset-confirmation')
                            })
                            .catch((error) => {
                                throw new Error(
                                    'Error encountered while sending password reset code.',
                                )
                            })
                    })
                    .catch((error) => {
                        throw new Error('Invalid or expired code.')
                    })
            } catch (error) {
                return json({
                    pageName: 'Error',
                    errorMessage: (error as Error).message,
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

    return (
        <Grid container>
            <Grid
                item
                xs={12}
                md={12}
                lg={7}
                sx={{
                    '& > div': {
                        padding: {
                            xs: '4vh 16vw',
                            md: '6vh 20vw',
                            lg: '0 18vw',
                        },
                    },
                }}
            >
                <h1
                    style={{
                        textAlign: 'center',
                        paddingTop: '50vh',
                        color: '#939191',
                    }}
                >
                    {errorMessage}
                </h1>
            </Grid>
            <Grid item xs={0} md={0} lg={5}>
                <div
                    style={{
                        height: '100vh',
                        backgroundImage:
                            'url("/assets/images/signup-cover.jpg")',
                        backgroundSize: 'cover',
                    }}
                ></div>
            </Grid>
        </Grid>
    )
}
