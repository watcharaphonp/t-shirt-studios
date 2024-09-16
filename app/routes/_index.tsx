import * as React from 'react'
import type { MetaFunction, LinksFunction } from '@remix-run/node'
import { json, Link as RemixLink } from '@remix-run/react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import styles from '../main.css'
import DynamicDrawer from '../components/DynamicDrawer'
import type { Anchor } from '../types/drawer'
import { useGenerateMeta } from '~/hooks/useGenerateMeta'
import Header from '~/components/Header'
import HamburgerButton from '~/components/HamburgerButton'
import MainCarousel from '~/components/MainCarousel'
import Page from '~/components/Page'
import { Grid } from '@mui/material'
import ContactForm from '~/components/ContactForm'
import Footer from '~/components/Footer'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export function loader() {
    return json({ appName: process.env.APP_NAME })
}

export const meta: MetaFunction = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const metaTags = useGenerateMeta('routes/_index', 'Home')

    return metaTags
}

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
    const position: Anchor = 'right'
    const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false)

    const handleDrawerClose = () => {
        setIsDrawerOpen(false)
    }
    return (
        <Page>
            <Header />
            <HamburgerButton />
            <DynamicDrawer
                position={position}
                isDrawerOpen={isDrawerOpen}
                onClose={handleDrawerClose}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MainCarousel />
                </Grid>
                <Grid item xs={12}>
                    <Grid className="contact-us-container" container>
                        <Grid
                            className="contact-us-form-container"
                            item
                            xs={12}
                            md={6}
                        >
                            <ContactForm />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{ display: { xs: 'none', md: 'block' } }}
                        >
                            <div className="contact-us-cover-container">
                                <img
                                    className="contact-us-cover"
                                    src="assets/images/contact-us-cover.jpg"
                                    alt="contact-us-cover"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Page>
    )
}
