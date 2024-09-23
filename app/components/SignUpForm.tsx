import { Grid, TextField, Button, Typography } from '@mui/material'
import { Form } from '@remix-run/react'
import type { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { FirebaseService } from '~/services/FirebaseService'
import { getFormData } from '~/utils/FormUtils'

const SignUpForm = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Convert FormData to an object
        const values: any = getFormData()
        const { email, password } = values

        try {
            const user = await FirebaseService.signup(email, password)
            setErrorMessage('')
            console.log(user)
            // sign up success
        } catch (error) {
            console.log(error)
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
