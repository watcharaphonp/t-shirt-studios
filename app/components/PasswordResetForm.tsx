import React, { useEffect, useState } from 'react'
import { useFetcher, useNavigate } from '@remix-run/react'
import { Button, Typography, Box, TextField } from '@mui/material'
import { useAuth } from '~/contexts/authContext'
import type { PasswordResetFormData } from '~/types/form'
import { getFormData } from '~/utils/FormUtils'
import { PasswordResetSchema } from '~/schemas/password-reset'
import type { FirebaseError } from 'firebase/app'
import PasswordInput from './PasswordInput'

interface PasswordResetFormProps {
    email: string
    apiKey: string
    actionCode: string
}
export default function PasswordResetForm({
    email,
    apiKey,
    actionCode,
}: PasswordResetFormProps) {
    const fetcher = useFetcher() // use fetcher instead of normal form submission
    const navigate = useNavigate() // Initialize useNavigate
    const { user } = useAuth()
    const [passwordResetError, setPasswordResetError] = useState('')
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
    const [isEnablePasswordReset, setIsEnablePasswordReset] = useState(true)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsEnablePasswordReset(false)

        // Convert FormData to an object
        const values: PasswordResetFormData = getFormData()

        const result = PasswordResetSchema.safeParse(values)

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

            try {
                await fetcher.submit(result.data, {
                    method: 'post',
                    action: `/password-reset?apiKey=${apiKey}&&actionCode=${actionCode}`,
                })
                setPasswordResetError('')
                setIsEnablePasswordReset(true)
            } catch (error) {
                setPasswordResetError((error as FirebaseError).message)
            }
        }
    }

    useEffect(() => {
        if (user !== null) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h5" component="h5" gutterBottom>
                Update your password
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    disabled
                    fullWidth
                />
                <PasswordInput
                    name="password"
                    required
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    label="Password"
                    sx={{ mt: 2 }}
                    placeholder="Enter new password"
                    shrink
                    autoComplete="new-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!isEnablePasswordReset}
                    sx={{
                        borderRadius: '1px',
                        fontWeight: 'bold',
                        backgroundColor: '#000',
                        mt: 2,
                    }}
                >
                    Update password
                </Button>
                {passwordResetError && (
                    <Typography
                        color="error"
                        sx={{ mt: 4, textAlign: 'center' }}
                    >
                        {passwordResetError}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
