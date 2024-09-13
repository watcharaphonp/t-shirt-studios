import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { json, useLoaderData } from '@remix-run/react'

export function loader() {
    return json({ appName: process.env.APP_NAME })
}

function TopHeader() {
    const logoUrl =
        'https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80'
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
                padding: '2vh 0',
            }}
            className="transparent-header-bar"
        >
            <Toolbar>
                <img
                    src={logoUrl}
                    alt="Logo"
                    style={{
                        height: '40px',
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
                    <Button className="header-bar-btn" sx={buttonStyles}>
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
                    >
                        Log in
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default TopHeader
