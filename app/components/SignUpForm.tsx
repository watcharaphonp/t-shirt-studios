import { Grid, TextField, Button, Typography } from '@mui/material'
import { Form } from '@remix-run/react'
import type { FirebaseError } from 'firebase/app'
import type { UserCredential } from 'firebase/auth'
import { useState } from 'react'
import { FirebaseService } from '~/services/FirebaseService'
import { getFormData } from '~/utils/FormUtils'
import PasswordInput from './PasswordInput'

const SignUpForm = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Convert FormData to an object
        const values: any = getFormData()
        const { email, password } = values

        try {
            const user: UserCredential = await FirebaseService.signup(
                email,
                password,
            )
            setErrorMessage('')
            // sign up success
            await FirebaseService.sendVerificationEmail()
        } catch (error) {
            const errorMessage = FirebaseService.mapFirebaseAuthError(
                (error as FirebaseError).code,
            )
            setErrorMessage(errorMessage)
        }
    }
    return (
        <div style={{ padding: '20vh 40vw', textAlign: 'center' }}>
            <div style={{ padding: '20px 40px' }}>
                <Typography variant="h4">Signup</Typography>
            </div>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            type="email"
                            label="Email"
                            name="email"
                            required
                            fullWidth
                            error={errorMessage !== ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordInput
                            name="password"
                            required
                            error={errorMessage !== ''}
                            label="Password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordInput
                            name="confirm-password"
                            required
                            error={errorMessage !== ''}
                            label="Confirm password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">
                            Signup
                        </Button>
                    </Grid>
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Typography color="error">
                                {errorMessage}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Form>
        </div>
    )
}

export default SignUpForm
