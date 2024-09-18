import React, { useState } from 'react'
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
import { ContactUsFormSchema } from '../schemas/contact-us.schema'

interface FormDataProps {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    company: string
    phonePrefix: string
    countryCode: string
}

export default function ContactForm() {
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault() // Prevent form submission

        // Create a FormData object
        const form = document.querySelector('form')
        const formData = new FormData(form as HTMLFormElement)
        let isFormValid: boolean = false

        // Convert FormData to an object
        const values: FormDataProps = Object.fromEntries(
            formData.entries(),
        ) as unknown as FormDataProps

        const result = ContactUsFormSchema.safeParse(values)

        if (!result.success) {
            const formattedErrors = result.error.errors.reduce(
                (acc, error) => {
                    acc[error.path[0]] = error.message
                    return acc
                },
                {} as { [key: string]: string },
            )

            setFormErrors(formattedErrors)
        } else {
            setFormErrors({})
            isFormValid = true
        }

        if (isFormValid) {
            // Form is valid, submit the form
            const form = document.querySelector('form') as HTMLFormElement
            form.submit()
        }
    }

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
                            error={!!formErrors.firstName}
                            helperText={formErrors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            error={!!formErrors.lastName}
                            helperText={formErrors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company"
                            name="company"
                            variant="outlined"
                            error={!!formErrors.company}
                            helperText={formErrors.company}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="E-mail"
                            name="email"
                            type="email"
                            variant="outlined"
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PhoneInput
                            error={!!formErrors.phoneNumber}
                            helperText={formErrors.phoneNumber}
                        />
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
                            onClick={handleSubmit}
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
