import React, {
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from 'react'
import {
    TextField,
    Select,
    MenuItem,
    Box,
    FormHelperText,
    InputLabel,
    FormControl,
    OutlinedInput,
} from '@mui/material'
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material'
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
    name?: string
    label?: string
    onPhoneNumberChange?: (phoneNumber: string) => void
    onPhonePrefixChange?: (prefix: string) => void
    onPhoneCountryChange?: (country: string) => void
    value?: string
    specificCountry?: string
}

const PhoneNumberField = forwardRef(function PhoneNumberField(
    {
        error = false,
        helperText = '',
        name = 'phoneNumber',
        label = 'Phone',
        onPhonePrefixChange,
        onPhoneNumberChange,
        onPhoneCountryChange,
        value,
        specificCountry,
    }: PhoneNumberFieldProps,
    ref,
) {
    const defaultCountryOption =
        countryOptions.find((country) => country.code === 'TH') ||
        countryOptions[0]

    const [selectedCountry, setSelectedCountry] =
        useState<CountryOption>(defaultCountryOption)
    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        if (
            defaultCountryOption &&
            onPhonePrefixChange &&
            onPhoneCountryChange
        ) {
            onPhonePrefixChange(`+${defaultCountryOption.phone}`)
            onPhoneCountryChange(defaultCountryOption.code)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const countryOption = countryOptions.find(
            (country) => country.code === specificCountry,
        )

        if (countryOption && Object.keys(countryOption).length > 0) {
            setSelectedCountry(countryOption)
        }
    }, [specificCountry])

    const handleCountryChange = useCallback(
        (event: any) => {
            const country = countryOptions.find(
                (c) => c.code === event.target.value,
            )
            if (country) {
                setSelectedCountry(country)

                if (onPhonePrefixChange)
                    onPhonePrefixChange(`+${country.phone}`)

                if (onPhoneCountryChange) onPhoneCountryChange(country.code)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [phoneNumber],
    )

    const handlePhoneNumberChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneNumber(event.target.value)
            if (onPhoneNumberChange) onPhoneNumberChange(event.target.value)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCountry.code],
    )

    // Expose resetPhoneNumber via ref
    useImperativeHandle(ref, () => ({
        resetPhoneNumber: () => {
            setPhoneNumber('')
            // setSelectedCountry(defaultCountryOption)
        },
    }))

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
                <FormControl>
                    <InputLabel
                        htmlFor="select-input"
                        id="phone-number-label"
                        shrink
                    >
                        {label}
                    </InputLabel>
                    <Select
                        name="phoneCountryCode"
                        value={selectedCountry.code}
                        onChange={handleCountryChange}
                        sx={{
                            width: '116px',
                            height: '-webkit-fill-available !important',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRightWidth: 0,
                            },
                            '& .MuiSelect-select': {
                                paddingY: '10.5px',
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 300,
                                    maxWidth: 270,
                                    marginLeft: '40px',
                                },
                            },
                        }}
                        IconComponent={KeyboardArrowDownIcon}
                        renderValue={(value) => {
                            const country = countryOptions.find(
                                (c) => c.code === value,
                            )
                            return (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        loading="lazy"
                                        width="20"
                                        height="15"
                                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country?.code.toUpperCase()}.svg`}
                                        alt=""
                                        style={{ marginRight: 8 }}
                                    />
                                    +{country?.phone}
                                </Box>
                            )
                        }}
                        input={
                            <OutlinedInput
                                notched
                                label={label}
                                id="select-input"
                            />
                        }
                    >
                        {countryOptions.map((option) => (
                            <MenuItem key={option.code} value={option.code}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        loading="lazy"
                                        width="20"
                                        height="15"
                                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${option.code.toUpperCase()}.svg`}
                                        alt=""
                                        style={{ marginRight: 8 }}
                                    />
                                    +{option.phone} {option.name}
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    name={name}
                    variant="outlined"
                    value={value ?? phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter your phone number"
                    error={error}
                    fullWidth
                    sx={{
                        pl: 2.9,
                        '& .MuiOutlinedInput-root': {
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                        },
                    }}
                />
                <TextField
                    type="hidden"
                    label="Phone prefix"
                    name="phonePrefix"
                    value={`+${selectedCountry.phone}`}
                    sx={{ display: 'none' }}
                />
            </Box>
            {helperText && (
                <FormHelperText error={error}>{helperText}</FormHelperText>
            )}
        </Box>
    )
})

export default PhoneNumberField
