import { TextField, Button, Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { FirebaseService } from '~/services/FirebaseService'
import { getFormData } from '~/utils/FormUtils'
import PasswordInput from './PasswordInput'
import { SignupSchema } from '~/schemas/sign-up'
import type { SignupFormData } from '~/types/form'
import { useAuth } from '~/contexts/authContext'
import { useNavigate } from '@remix-run/react'

const SignUpForm = () => {
    const navigate = useNavigate() // Initialize useNavigate
    const { login, user } = useAuth()
    const [signupError, setSignupError] = useState('')
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Convert FormData to an object
        const values: SignupFormData = getFormData()

        // Validate form data with Zod schema
        const result = SignupSchema.safeParse(values)

        if (!result.success) {
            // Collect errors from Zod validation
            const formattedErrors = result.error.errors.reduce(
                (acc: Record<string, string>, error) => {
                    acc[error.path[0]] = error.message
                    return acc
                },
                {},
            )
            setFormErrors(formattedErrors)
        } else {
            setFormErrors({}) // Clear form errors if validation passed

            try {
                const { email, password } = values

                await FirebaseService.signup(email, password)

                setSignupError('') // Reset signup error

                // sign-up success, send verification email
                await FirebaseService.sendVerificationEmail()
                await login(email, password)
            } catch (error) {
                setSignupError((error as Error).message)
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
                maxHeight: '100vh',
                mx: 'auto',
                mt: 4,
                p: 2,
            }}
        >
            <Typography variant="overline" display="block" gutterBottom>
                LET'S GET STARTED
            </Typography>
            <Typography variant="h5" component="h1" gutterBottom>
                Sign up to Creator T-Shirt
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    type="text"
                    label="Full name"
                    name="fullName"
                    required
                    fullWidth
                    error={!!formErrors.fullName}
                    helperText={formErrors.fullName}
                    autoComplete="name"
                    margin="normal"
                />
                <TextField
                    type="email"
                    label="Email"
                    name="email"
                    required
                    fullWidth
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    autoComplete="email"
                    margin="normal"
                />

                <PasswordInput
                    name="password"
                    required
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    label="Password"
                    sx={{ mt: 2 }}
                />
                <Typography variant="caption" display="block" gutterBottom>
                    Your password needs to be at least 8 characters including at
                    least 3 of the following 4 types of characters: a lower case
                    letter, an upper case letter, a number, a special character
                    (such as !@#$%&).
                </Typography>
                <PasswordInput
                    name="confirmPassword"
                    required
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                    label="Confirm password"
                    sx={{ mt: 2 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: '1px',
                        fontWeight: 'bold',
                        backgroundColor: '#000',
                        mt: 4,
                    }}
                >
                    Continue
                </Button>

                {signupError && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {signupError}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default SignUpForm
