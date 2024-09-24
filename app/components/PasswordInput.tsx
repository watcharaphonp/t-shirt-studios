import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material'
import { useState } from 'react'

interface PasswordInputProps {
    errorMessage?: string
    name?: string
    required?: boolean
    error?: boolean
    label?: string
    autoComplete?: string
}

export default function PasswordInput({
    errorMessage = '',
    name,
    label = 'Password',
    required = false,
    error = false,
    autoComplete = 'new-password',
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    return (
        <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" error={error}>
                {`${label} ${required ? '*' : ''}`}
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                name={name}
                required
                fullWidth
                error={error}
                autoComplete={autoComplete}
            />
            {errorMessage !== '' && (
                <FormHelperText error={errorMessage !== ''}>
                    {errorMessage}
                </FormHelperText>
            )}
        </FormControl>
    )
}
