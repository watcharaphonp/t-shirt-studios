import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { json, useLoaderData } from '@remix-run/react'
import { useAuth } from '~/contexts/authContext'

export function loader() {
    return json({ appName: process.env.APP_NAME })
}

function TopHeader() {
    const { user, isLoading, logout } = useAuth()
    const logoUrl = '/assets/icons/app-logo2.png'
    const data = useLoaderData<typeof loader>()
    const buttonStyles = {
        color: '#fff',
        fontSize: '28px',
        textTransform: 'none',
    }

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                zIndex: 999,
                position: 'absolute',
                padding: '4vh 0',
            }}
            className="transparent-header-bar"
        >
            <Toolbar>
                <img
                    src={logoUrl}
                    alt="Logo"
                    style={{
                        color: '#fff',
                        height: '50px',
                        marginRight: '16px',
                    }}
                />
                <Typography
                    component="div"
                    sx={{
                        flexGrow: 1,
                        color: 'white',
                        fontSize: 'calc(20px + 0.5vw)',
                    }}
                >
                    {data.appName}
                </Typography>
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'none',
                            lg: 'block',
                        },
                    }}
                >
                    {isLoading ? (
                        // While loading, show a spinner or nothing
                        <div />
                    ) : user ? (
                        <>
                            <Button
                                className="header-bar-btn"
                                sx={{
                                    ...buttonStyles,
                                    marginRight: '8vw !important',
                                }}
                                onClick={() => logout()} // Call sign out on click
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                className="header-bar-btn"
                                sx={{ ...buttonStyles, paddingRight: '20px' }}
                                href="/signup"
                            >
                                Sign up
                            </Button>
                            <Typography
                                className="header-bar-btn-sprt"
                                variant="body1"
                                component="span"
                                sx={{
                                    color: 'white',
                                    mx: 1,
                                    fontSize: '28px',
                                    lineHeight: '28px',
                                    position: 'relative',
                                    top: '8px',
                                }}
                            >
                                /
                            </Typography>
                            <Button
                                className="header-bar-btn"
                                sx={{ ...buttonStyles, mr: 15 }}
                                href="/login"
                            >
                                Log in
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default TopHeader
