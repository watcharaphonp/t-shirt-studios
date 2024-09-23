import {
    Grid,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from '@mui/material'
import { Form } from '@remix-run/react'
import type { FirebaseError } from 'firebase/app'
import { UserCredential } from 'firebase/auth'
import { useState } from 'react'
import { FirebaseService } from '~/services/FirebaseService'
import { getFormData } from '~/utils/FormUtils'

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [isFormSubmitable, setIsFormSubmitable] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Convert FormData to an object
        const values: any = getFormData()
        const { email, password } = values

        try {
            setIsLoggedIn(false)
            setIsFormSubmitable(false)
            setIsLoading(true)
            const user: UserCredential = await FirebaseService.signIn(
                email,
                password,
            )
            console.log(user)
            setIsFormSubmitable(true)
            setIsLoading(false)
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
    return (
        <div style={{ padding: '20vh 40vw', textAlign: 'center' }}>
            <div style={{ padding: '20px 40px' }}>
                <Typography variant="h4">Login</Typography>
            </div>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            required
                            fullWidth
                            error={errorMessage !== ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            required
                            fullWidth
                            error={errorMessage !== ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!isFormSubmitable}
                        >
                            Login
                        </Button>
                    </Grid>
                    {isLoading && (
                        <Grid item xs={12}>
                            <CircularProgress color="inherit" />
                        </Grid>
                    )}
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Typography color="error">
                                {errorMessage}
                            </Typography>
                        </Grid>
                    )}
                    {isLoggedIn && (
                        <Grid item xs={12}>
                            <Typography color="success">
                                Login successful
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Form>
        </div>
    )
}

export default LoginForm
