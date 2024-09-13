// app/components/Page.tsx
import type { FC, ReactNode } from 'react';
import React from 'react'

interface PageProps {
    children: ReactNode
}

const Page: FC<PageProps> = ({ children }) => {
    return <div>{children}</div>
}

export default Page
