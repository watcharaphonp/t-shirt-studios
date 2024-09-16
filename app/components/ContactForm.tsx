import React from 'react'
import { Form } from '@remix-run/react'
import {
    TextField,
    Checkbox,
    Button,
    Grid,
    FormControlLabel,
    Typography,
    Link,
    Box,
} from '@mui/material'
import PhoneInput from './PhoneNumberInput'

export default function ContactForm() {
    return (
        <Box sx={{ maxWidth: '80%', margin: 'auto', padding: 2 }}>
            <Form method="post">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company"
                            name="company"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="E-mail"
                            name="email"
                            type="email"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PhoneInput />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox name="agreeToPolicy" />}
                            label={
                                <Typography
                                    variant="body2"
                                    style={{ color: '#000' }}
                                >
                                    You agree to our friendly{' '}
                                    <Link href="#" underline="always">
                                        Privacy Policy
                                    </Link>
                                </Typography>
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: 'black',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                },
                            }}
                        >
                            Contact us
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Box>
    )
}
