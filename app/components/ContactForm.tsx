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

    const validatePhoneNumber = (
        phoneNumber: string,
        phonePrefix: string,
        countryCode: string,
    ) => {
        let isValid: boolean = false
        try {
            isValid = phoneUtil.isValidNumberForRegion(
                phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode),
                countryCode,
            )

            if (!isValid) {
                throw new Error(`${phoneNumber} is not a valid phone number`)
            }
        } catch (e) {
            throw new Error(`${phoneNumber} is not a valid phone number`)
        }
    }

    const validateContactUsFormData = () => {
        // Create a FormData object
        const form = document.querySelector('form')
        const formData = new FormData(form as HTMLFormElement)
        const characterLimit: number = 100
        const phoneNumberLimit: number = 15
        let isHasValidFormData: boolean = true

        // Convert FormData to an object
        const values: FormDataProps = Object.fromEntries(
            formData.entries(),
        ) as unknown as FormDataProps

        const fieldNames = Object.keys(values)
        const inputElementList = document.querySelectorAll(
            'input',
        ) as NodeListOf<HTMLInputElement>

        let newErrors: { [key: string]: string } = {}

        // Loop through each field and validate
        fieldNames.forEach((fieldName, index) => {
            const value = values[fieldName as keyof FormDataProps]

            if (inputElementList.length && inputElementList[index].labels) {
                const type = inputElementList[index].type
                const label = inputElementList[index].labels[0]?.innerText

                try {
                    switch (type) {
                        case 'text':
                            z.string({
                                invalid_type_error: `${label} must be a string`,
                            })
                                .min(1, `${label} is required`)
                                .max(
                                    characterLimit,
                                    `${label} must be at most ${characterLimit} characters long`,
                                )
                                .parse(value)

                            break

                        case 'email':
                            z.string({
                                invalid_type_error: `${label} must be a string`,
                            })
                                .min(1, `${label} is required`)
                                .email(`${label} must be a valid email`)
                                .parse(value)

                            break

                        case 'tel':
                            validatePhoneNumber(
                                value,
                                values.phonePrefix,
                                values.countryCode,
                            )
                            z.string({
                                invalid_type_error: `${label} must be a string`,
                            })
                                .min(1, `${label} is required`)
                                .max(
                                    phoneNumberLimit,
                                    `${label} must be at most ${phoneNumberLimit} characters long`,
                                )

                                .parse(value)

                            break

                        case 'default':
                            break
                    }
                } catch (err) {
                    const error = err as Error
                    const errorMessage =
                        error.message.startsWith('[') ||
                        error.message.startsWith('{')
                            ? JSON.parse(error.message)[0].message
                            : error.message
                    // Capture the error but continue with validation for other fields
                    newErrors[fieldName] = errorMessage
                    isHasValidFormData = false
                }
            }
        })

        // Update error state
        setFormErrors(newErrors)

        return isHasValidFormData
    }
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault() // Prevent form submission

        const isFormValid = validateContactUsFormData()

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
