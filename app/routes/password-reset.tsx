import { Grid } from '@mui/material'
import type { ActionFunctionArgs } from '@remix-run/node'
import type { MetaFunction } from '@remix-run/react'
import { json, redirect, useLoaderData } from '@remix-run/react'
import { getApp, initializeApp } from 'firebase/app'
import {
    confirmPasswordReset,
    getAuth,
    verifyPasswordResetCode,
} from 'firebase/auth'
import PasswordResetForm from '~/components/PasswordResetForm'
import { routeConfig } from '~/configs'
import { useGenerateMeta } from '~/hooks/useGenerateMeta'
import type { PasswordResetFormData } from '~/types/form'
import { getRequestFormData } from '~/utils/FormUtils'

const initialCallbackApp = (apiKey: string) => {
    const appName = 'authCallbackApp'
    let app = getApp(appName)
    if (!app) app = initializeApp({ apiKey }, appName)
    const auth = getAuth(app!)
    if (!auth) throw new Error('Firebase Auth is not initialized.')

    return auth
}

export async function loader({ request }: ActionFunctionArgs) {
    const url = new URL(request.url)
    const oobCode = url.searchParams.get('oobCode')
    const apiKey = url.searchParams.get('apiKey') ?? ''
    const lang = url.searchParams.get('lang') ?? 'en'

    const defaultComponent = <h2>Access denied</h2>

    try {
        const auth = initialCallbackApp(apiKey)
        const email = await verifyPasswordResetCode(auth!, oobCode ?? '')

        if (email) {
            console.log('email', email)
            return json({
                ...routeConfig,
                pageName: 'Reset Your Password',
                oobCode,
                apiKey,
                lang,
                email,
            })
        }
    } catch (err) {
        return defaultComponent
    }
}

export const meta: MetaFunction = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const metaTags = useGenerateMeta()

    return metaTags
}

export const action = async ({ request }: ActionFunctionArgs) => {
    console.log('action mode')
    try {
        const url = new URL(request.url)
        const actionCode = url.searchParams.get('actionCode')
        const apiKey = url.searchParams.get('apiKey') ?? ''

        if (!apiKey || !actionCode) {
            return json(
                {
                    errorMessage: `Missing ${apiKey === null ? 'apiKey' : 'actionCode'} in request header`,
                },
                { status: 400 },
            )
        }

        const auth = initialCallbackApp(apiKey)
        const formData: PasswordResetFormData =
            await getRequestFormData(request)

        // Save the new password.
        confirmPasswordReset(auth, actionCode, formData.password)
            .then((resp) => {
                return redirect('/login')
            })
            .catch((error) => {
                throw new Error((error as Error).message)
            })
    } catch (error) {
        throw new Error((error as Error).message)
    }

    return json({ success: true })
}

export default function PasswordReset() {
    const data: any = useLoaderData()
    const { email, apiKey, oobCode: actionCode } = data
    return email ? (
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
                <PasswordResetForm
                    email={email}
                    apiKey={apiKey}
                    actionCode={actionCode}
                />
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
    ) : (
        <h2>Access denied</h2>
    )
}
