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
import { z } from 'zod'
import { PhoneNumberUtil } from 'google-libphonenumber'

interface FormDataProps {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    company: string
    phonePrefix: string
    countryCode: string
}

const phoneUtil = PhoneNumberUtil.getInstance()

export default function ContactForm() {
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
    const characterLimit: number = 100
    const phoneNumberLimit: number = 15

    const contactUsFormSchema = z
        .object({
            firstName: z
                .string({
                    invalid_type_error: 'First Name must be a string',
                })
                .min(1, 'First Name is required')
                .max(
                    characterLimit,
                    `First Name must be at most ${characterLimit} characters long`,
                ),
            lastName: z
                .string({
                    invalid_type_error: 'Last Name must be a string',
                })
                .min(1, 'Last Name is required')
                .max(
                    characterLimit,
                    `Last Name must be at most ${characterLimit} characters long`,
                ),
            company: z
                .string({
                    invalid_type_error: 'Company must be a string',
                })
                .min(1, 'Company is required')
                .max(
                    characterLimit,
                    `Company must be at most ${characterLimit} characters long`,
                ),
            email: z
                .string({
                    invalid_type_error: 'email must be a string',
                })
                .min(1, 'email is required')
                .email('email must be a valid email'),
            phoneNumber: z
                .string({
                    invalid_type_error: 'Phone number must be a string',
                })
                .min(1, 'Phone number is required')
                .max(
                    phoneNumberLimit,
                    `Phone number must be at most ${phoneNumberLimit} characters long`,
                )
                // Custom validation: Phone number must be numeric
                .refine((phoneNumber) => /^\d+$/.test(phoneNumber), {
                    message: 'Phone number must contain only digits',
                }),
            phonePrefix: z.string().min(1, 'Phone Prefix is required'),
            countryCode: z.string().min(1, 'Country Code is required'),
        })
        .superRefine((data, ctx) => {
            const { phonePrefix, countryCode, phoneNumber } = data

            const isValid = phoneUtil.isValidNumberForRegion(
                phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode),
                countryCode,
            )

            if (!isValid) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['phoneNumber'],
                    message: `${phonePrefix}${phoneNumber} is not valid phone number`,
                })
            }
        })

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

        const result = contactUsFormSchema.safeParse(values)

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
