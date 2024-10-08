import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Box,
} from '@mui/material'
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material'

interface PreBusinessSignupModalProps {
    open: boolean
    onClose: () => void
    onContinue: () => void
}

export default function PreBusinessSignupModal({
    open,
    onClose,
    onContinue,
}: PreBusinessSignupModalProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: 4,
                    overflow: 'hidden',
                },
            }}
        >
            <Box sx={{ display: 'flex', height: '100%' }}>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                    }}
                >
                    <DialogTitle
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                        }}
                    >
                        <Typography variant="h6" component="div">
                            WANT TO SELL YOUR DESIGNS?
                        </Typography>
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box sx={{ flex: 1, p: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                Let's verify your company
                            </Typography>
                            <Typography variant="body1" paragraph>
                                You need to be a registered business to proceed
                                with the business details set up.
                            </Typography>
                            <List>
                                {[
                                    'Sell your created products online',
                                    'Connect with Shopify',
                                    'Pay by invoice by the end of the month',
                                ].map((text, index) => (
                                    <ListItem key={index} disableGutters>
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <CheckIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={onContinue}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1,
                                    color: '#fff',
                                    backgroundColor: '#000',
                                }}
                            >
                                Continue
                            </Button>
                        </Box>
                    </DialogContent>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        position: 'relative',
                        background:
                            'url(/assets/images/pre-register-cover.jpg) center/cover',
                        display: { xs: 'none', md: 'block' },
                    }}
                    role="img"
                    aria-label="Person wearing a white sweatshirt and jeans, facing away from the camera"
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
        </Dialog>
    )
}
