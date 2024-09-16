import type { FC } from 'react'
import { Fragment, useEffect, useState } from 'react'
import type { Anchor, DrawerOpenState } from '../types/drawer'
import {
    Box,
    Button,
    Drawer,
    Grid,
    List,
    ListItemButton,
    Typography,
} from '@mui/material'

interface DynamicDrawerProps {
    position: Anchor
    isDrawerOpen: boolean
    onClose: () => void
}

const DynamicDrawer: FC<DynamicDrawerProps> = ({
    position,
    isDrawerOpen = false,
    onClose,
}) => {
    const [drawerPositionOpenState, setDrawerPositionOpenState] =
        useState<DrawerOpenState>({
            top: false,
            left: false,
            bottom: false,
            right: false,
        })

    useEffect(() => {
        console.log('isDrawerOpen', isDrawerOpen)
        setDrawerPositionOpenState({
            ...drawerPositionOpenState,
            [position]: isDrawerOpen,
        })
    }, [isDrawerOpen])

    const handleClose = () => {
        setDrawerPositionOpenState({
            ...drawerPositionOpenState,
            [position]: false,
        })

        onClose()
    }

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width:
                    anchor === 'top' || anchor === 'bottom'
                        ? '20vh'
                        : { lg: '20vw', md: '20vw', sm: '40vh', xs: '40vh' },
                height: '60vh',
                padding: 5,
                zIndex: '9999',
            }}
            role="presentation"
        >
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography
                        className="drawer-title"
                        variant="h5"
                        sx={{ marginBottom: 2, textTransform: 'uppercase' }}
                    >
                        This is your studio
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" onClick={handleClose}>
                        X
                    </Button>
                </Grid>
            </Grid>

            {/* Two-column text menu */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List>
                        <ListItemButton component="a" href="#simple-list">
                            <div className="menu-list-item">Contact Us</div>
                        </ListItemButton>
                    </List>
                </Grid>
            </Grid>

            {/* Sign Up and Log In buttons */}
            <Grid
                container
                spacing={2}
                sx={{
                    paddingTop:
                        anchor === 'bottom' || anchor === 'top'
                            ? '20vh'
                            : { md: '75vh', sm: '70vh', xs: '70vh' },
                }}
            >
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginBottom: 1 }}
                    >
                        Sign Up
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" color="primary" fullWidth>
                        Log In
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )

    return (
        <div>
            <Fragment key={position}>
                <Drawer
                    className="dynamic-drawer"
                    anchor={position}
                    open={drawerPositionOpenState[position]}
                    onClose={handleClose}
                >
                    {list(position)}
                </Drawer>
            </Fragment>
        </div>
    )
}

export default DynamicDrawer
