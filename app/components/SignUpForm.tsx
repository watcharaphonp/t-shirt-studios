import { Grid, TextField, Button, Typography } from '@mui/material'
import { Form } from '@remix-run/react'
import type { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '~/libs/firebase'
import { mapFirebaseAuthError } from '~/utils/FirebaseUtils'
import { getFormData } from '~/utils/FormUtils'

const SignUpForm = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Convert FormData to an object
        const values: any = getFormData()
        const { email, password } = values

        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            )
            setErrorMessage('')
            console.log(user)
            // sign up success
        } catch (error) {
            const errorMessage = mapFirebaseAuthError(
                (error as FirebaseError).code,
            )
            setErrorMessage(errorMessage)
        }
    }
    return (
        <div style={{ padding: '20vh 40vw', textAlign: 'center' }}>
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
