import { Grid } from '@mui/material'
import type { MetaFunction } from '@remix-run/react'
import { json } from '@remix-run/react'
import Page from '~/components/Page'
import { routeConfig } from '~/configs'
import { useGenerateMeta } from '~/hooks/useGenerateMeta'

export function loader() {
    return json({ ...routeConfig, pageName: 'Password Reset Confirmation' })
}

export const meta: MetaFunction = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const metaTags = useGenerateMeta()

    return metaTags
}

export default function PasswordResetConfirmation() {
    return (
        <Page>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={7}
                    sx={{
                        '& > div': {
                            maxWidth: { xs: 'none', md: 'none', lg: '36vw' },
                            padding: {
                                xs: '4vh 16vw',
                                md: '6vh 20vw',
                                lg: '0 4vw',
                            },
                        },
                    }}
                >
                    <h1
                        style={{
                            textAlign: 'center',
                            paddingTop: '50vh',
                            color: '#17a84a',
                        }}
                    >
                        Password reset confirmation sent. Please check your
                        inbox.
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
        </Page>
    )
}
