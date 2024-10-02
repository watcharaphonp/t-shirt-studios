import { z } from 'zod'

const LoginSchema: z.ZodType = z.object({
    email: z
        .string({
            invalid_type_error: 'email must be a string',
        })
        .min(1, 'Please fill this in')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .refine((value) => {
            // Check for character types
            const hasLowerCase = /[a-z]/.test(value)
            const hasUpperCase = /[A-Z]/.test(value)
            const hasNumber = /\d/.test(value)
            const hasSpecialChar = /[!@#$%&]/.test(value)

            // Count how many character types are present
            const charTypes = [
                hasLowerCase,
                hasUpperCase,
                hasNumber,
                hasSpecialChar,
            ].filter(Boolean).length
            return charTypes >= 3
        }, 'Your password needs to be at least 8 characters including at least 3 of the following 4 types of characters: a lower case letter, an uppercase letter, a number, a special character (such as !@#$%&)'),
})

export { LoginSchema }
