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
            <div className="first-section">
                <MainCarousel />
            </div>
            <div id="second-section" className="second-section">
                <div
                    className="second-section-title"
                    style={{ textAlign: 'center' }}
                >
                    <h1>Section 2</h1>
                </div>
            </div>
            <div
                id="third-section"
                className="third-section"
                style={{ textAlign: 'center' }}
            >
                <div className="second-section-title">
                    <h1>Section 3</h1>
                </div>
            </div>
        </Page>
    )
}
