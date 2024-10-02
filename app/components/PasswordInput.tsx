import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
    FormControl,
    InputAdornment,
    IconButton,
    FormHelperText,
    TextField,
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
    placeholder?: string
    shrink?: boolean
}

export default function PasswordInput({
    className = '',
    name,
    label = 'Password',
    required = false,
    error = false,
    autoComplete = 'on',
    sx = {},
    helperText = '',
    placeholder = '',
    shrink = false,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
    }

    return (
        <FormControl
            sx={{ width: '100%', ...sx }}
            variant="outlined"
            className={className}
            error={error}
        >
            <TextField
                type={showPassword ? 'text' : 'password'}
                label={label}
                value={password}
                name={name}
                required={required}
                autoComplete={autoComplete}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={placeholder}
                InputLabelProps={{
                    shrink,
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {helperText !== '' && (
                <FormHelperText error={error}>{helperText}</FormHelperText>
            )}
        </FormControl>
    )
}
