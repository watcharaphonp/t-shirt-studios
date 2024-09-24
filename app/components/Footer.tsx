import React from 'react'
import { Box, Typography, Link, IconButton } from '@mui/material'
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
                    <img
                        src="/assets/images/VIBAL-LOGO-DARK.png"
                        alt="VIBAL"
                        width="100px"
                        height="55px"
                    />
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
                        paddingTop: '6px',
                    }}
                >
                    <Link href="" color="inherit" sx={{ mx: 1 }}>
                        Term & Condition
                    </Link>
                    <Link href="" color="inherit" sx={{ mx: 1 }}>
                        Term of Service
                    </Link>
                    <Link href="" color="inherit" sx={{ mx: 1 }}>
                        Privacy
                    </Link>
                    <Link href="" color="inherit" sx={{ mx: 1 }}>
                        Help
                    </Link>
                </Box>

                <Box>
                    <IconButton
                        sx={{
                            color: '#fff',
                            backgroundColor: '#000',
                            margin: '0 6px',
                            '&:hover': {
                                backgroundColor: '#000',
                            },
                        }}
                        aria-label="Facebook"
                        component="a"
                        href="https://www.facebook.com/VIBALCORP"
                        target="_blank"
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: '#fff',
                            backgroundColor: '#000',
                            margin: '0 6px',

                            '&:hover': {
                                backgroundColor: '#000',
                            },
                        }}
                        aria-label="Instagram"
                        component="a"
                        href="https://www.instagram.com/vibalcorp"
                        target="_blank"
                    >
                        <InstagramIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
