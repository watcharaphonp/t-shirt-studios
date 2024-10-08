// app/components/Page.tsx
import type { FC, ReactNode } from 'react'
import React from 'react'

interface PageProps {
    children: ReactNode
}

const Page: FC<PageProps> = ({ children }) => {
    return <div style={{ height: '100vh', width: '100vw' }}>{children}</div>
}

export default Page
