import React, { useState } from 'react'
import { TextField, Autocomplete, Box, InputAdornment } from '@mui/material'
import { countries } from 'countries-list'

interface CountryOption {
    code: string
    name: string
    phone: string
}

const countryOptions: CountryOption[] = Object.entries(countries).map(
    ([code, country]) => ({
        code,
        name: country.name,
        phone: country.phone[0].toString(),
    }),
)

interface PhoneNumberFieldProps {
    error?: boolean
    helperText?: string
}

export default function PhoneNumberField({
    error = false,
    helperText = '',
}: PhoneNumberFieldProps) {
    const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
        countryOptions.find((country) => country.code === 'US') ||
            countryOptions[0],
    )
    const [phoneNumber, setPhoneNumber] = useState('')

    const filterOptions = (
        options: CountryOption[],
        { inputValue }: { inputValue: string },
    ) => {
        const searchTerm = inputValue.toLowerCase()
        return options.filter(
            (option) =>
                option.name.toLowerCase().includes(searchTerm) ||
                option.phone.includes(searchTerm) ||
                option.code.toLowerCase().includes(searchTerm),
        )
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Autocomplete
                disablePortal
                disableClearable
                options={countryOptions}
                value={selectedCountry}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setSelectedCountry(newValue)
                    }
                }}
                getOptionLabel={(option) => `+${option.phone}`}
                filterOptions={filterOptions}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        sx={{
                            '& > img': {
                                mr: 2,
                                flexShrink: 0,
                            },
                        }}
                        {...props}
                        key={`${option.code}-${option.phone}`}
                    >
                        <img
                            loading="lazy"
                            width="20"
                            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${option.code.toUpperCase()}.svg`}
                            srcSet={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${option.code.toUpperCase()}.svg`}
                            alt=""
                        />
                        +{option.phone}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Phone Prefix"
                        name="phonePrefix"
                        variant="outlined"
                        helperText={error ? ' ' : ''}
                        sx={{
                            width: '120px',
                            '& .MuiOutlinedInput-root': {
                                paddingRight: '8px',
                            },
                        }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.code.toUpperCase()}.svg`}
                                        srcSet={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.code.toUpperCase()}.svg`}
                                        alt=""
                                        style={{ marginRight: 8 }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
            <TextField
                variant="outlined"
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                type="tel"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
                sx={{
                    marginLeft: '-1px',
                    '& .MuiOutlinedInput-root': {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    },
                }}
                fullWidth
                error={error}
                helperText={helperText}
            />
            <TextField
                type="hidden"
                label="Country Code"
                name="countryCode"
                value={selectedCountry.code || ''}
                sx={{ display: 'none' }}
            />
        </Box>
    )
}
