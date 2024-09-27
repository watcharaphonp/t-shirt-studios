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
    className?: string
    name?: string
    required?: boolean
    error?: boolean
    label?: string
    autoComplete?: string
    sx?: any
    helperText?: string
}

export default function PasswordInput({
    className = '',
    name,
    label = 'Password',
    required = false,
    error = false,
    autoComplete = 'new-password',
    sx = {},
    helperText = '',
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    return (
        <FormControl
            sx={{ width: '100%', ...sx }}
            variant="outlined"
            className={className}
        >
            <InputLabel htmlFor="outlined-adornment-password" error={error}>
                {`${label} ${required ? '*' : ''}`}
            </InputLabel>
            <OutlinedInput
                inputProps={{ autoComplete }}
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
            />
            {helperText !== '' && (
                <FormHelperText error={helperText !== ''}>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    )
}
