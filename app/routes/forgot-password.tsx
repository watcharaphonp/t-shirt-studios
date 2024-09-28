import { Grid } from '@mui/material'
import type { ActionFunctionArgs } from '@remix-run/node'
import type { MetaFunction } from '@remix-run/react'
import { json } from '@remix-run/react'
import ForgotPasswordForm from '~/components/ForgotPasswordForm'
import { routeConfig } from '~/configs'
import { useGenerateMeta } from '~/hooks/useGenerateMeta'
import { getRequestFormData } from '~/utils/FormUtils'

export function loader() {
    return json({ ...routeConfig, pageName: 'Forgot Password' })
}

export const meta: MetaFunction = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const metaTags = useGenerateMeta()

    return metaTags
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await getRequestFormData(request)
    console.log('Form Data: ', formData)

    return json({ success: true })
}

export default function PasswordRecovery() {
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
                <ForgotPasswordForm />
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
