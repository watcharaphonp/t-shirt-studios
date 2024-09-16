import React from 'react'
import { Box, Container, Typography, Link, IconButton } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'white',
                boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
                color: '#000',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    padding: '0 16px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: { xs: 2, md: 0 },
                    }}
                >
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{ mr: 2, fontWeight: 'bold' }}
                    >
                        VIBAL
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        © 2024, VIBAL
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        // justifyContent: 'center',

                        flexGrow: 1,
                        mb: { xs: 2, md: 1 },
                    }}
                >
                    <Link href="#" color="inherit" sx={{ mx: 1 }}>
                        Term & Condition
                    </Link>
                    <Link href="#" color="inherit" sx={{ mx: 1 }}>
                        Term of Service
                    </Link>
                    <Link href="#" color="inherit" sx={{ mx: 1 }}>
                        Privacy Policy
                    </Link>
                </Box>

                <Box>
                    <IconButton
                        color="inherit"
                        aria-label="Facebook"
                        component="a"
                        href="#"
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="Instagram"
                        component="a"
                        href="#"
                    >
                        <InstagramIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
