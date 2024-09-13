import { Fab } from '@mui/material'
import DynamicDrawer from './DynamicDrawer'
import { useState } from 'react'
import type { Anchor } from '../types/drawer'
import { Add as AddIcon } from '@mui/icons-material'

function HamburgerButton() {
    const position: Anchor = 'right'
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

    const handleDrawerClose = () => {
        setIsDrawerOpen(false)
    }

    return (
        <>
            <Fab
                sx={{
                    position: 'fixed',
                    top: 'calc(32px)',
                    right: 'calc(40px)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '1px',
                    '&:hover': {
                        backgroundColor: '#f5f5f5',
                    },
                }}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
                <AddIcon />
            </Fab>
            <DynamicDrawer
                position={position}
                isDrawerOpen={isDrawerOpen}
                onClose={handleDrawerClose}
            />
        </>
    )
}

export default HamburgerButton
