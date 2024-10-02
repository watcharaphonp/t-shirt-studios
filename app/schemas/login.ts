import { z } from 'zod'

const LoginSchema: z.ZodType = z.object({
    email: z
        .string({
            invalid_type_error: 'email must be a string',
        })
        .min(1, 'Please fill this in')
        .email('Please enter a valid email address'),
    password: z.string(),
})

export { LoginSchema }
