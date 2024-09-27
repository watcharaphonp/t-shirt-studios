import { TextField, Button, Typography, Box } from '@mui/material'
import { useNavigate } from '@remix-run/react'
import type { FirebaseError } from 'firebase/app'
import { useEffect, useState } from 'react'
import { useAuth } from '~/contexts/authContext'
import { FirebaseService } from '~/services/FirebaseService'
import { getFormData } from '~/utils/FormUtils'

const LoginForm = () => {
    const navigate = useNavigate() // Initialize useNavigate
    const { login, user } = useAuth()
    const [errorMessage, setErrorMessage] = useState('')
    const [isFormSubmitable, setIsFormSubmitable] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Convert FormData to an object
        const values: any = getFormData()
        const { email, password } = values

        try {
            setIsLoggedIn(false)
            setIsFormSubmitable(false)
            await login(email, password)
            setIsFormSubmitable(true)
            setIsLoggedIn(true)
            setErrorMessage('')
        } catch (error) {
            console.log((error as FirebaseError).code)
            const errorMessage = FirebaseService.mapFirebaseAuthError(
                (error as FirebaseError).code,
            )
            setErrorMessage(errorMessage)
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
                textAlign: 'center',
            }}
        >
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    name="email"
                    required
                    fullWidth
                    error={errorMessage !== ''}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    required
                    fullWidth
                    error={errorMessage !== ''}
                    margin="normal"
                />
                <Button
                    sx={{ mt: 4, borderRadius: '1px', backgroundColor: '#000' }}
                    type="submit"
                    variant="contained"
                    disabled={!isFormSubmitable}
                    fullWidth
                >
                    Login
                </Button>
                {errorMessage && (
                    <Typography color="error">{errorMessage}</Typography>
                )}
                {isLoggedIn && (
                    <Typography color="success">Login successful</Typography>
                )}
            </Box>
        </Box>
    )
}

export default LoginForm
