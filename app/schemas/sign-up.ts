import { z } from 'zod'

const defaultNameCharacterLimit: number = 100

const SignupSchema: z.ZodType = z
    .object({
        fullName: z
            .string({
                invalid_type_error: 'Full Name must be a string',
            })
            .min(1, 'Full Name is required')
            .max(
                defaultNameCharacterLimit,
                `Full Name must be at most ${defaultNameCharacterLimit} characters long`,
            ),
        email: z
            .string({
                invalid_type_error: 'email must be a string',
            })
            .min(1, 'email is required')
            .email('email must be a valid email'),
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
            }, 'Password must include at least 3 of the following: a lower case letter, an upper case letter, a number, a special character (!@#$%&)'),
        confirmPassword: z.string().min(1, 'Confirm Password is required'),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Passwords do not match',
            })
        }
    })

export { SignupSchema }
