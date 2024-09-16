import { Fab } from '@mui/material'
import DynamicDrawer from './DynamicDrawer'
import { useState } from 'react'
import type { Anchor } from '../types/drawer'
import MenuIcon from '@mui/icons-material/Menu'

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
                    width: { lg: '56px', md: '50px', sm: '35px', xs: '35px' },
                    height: { lg: '56px', md: '50px', sm: '35px', xs: '35px' },
                    borderRadius: '1px',
                    '&:hover': {
                        backgroundColor: '#f5f5f5',
                    },
                }}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
                <MenuIcon />
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
