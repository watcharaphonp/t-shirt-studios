import { z } from 'zod'
import { FirebaseService } from '~/services/FirebaseService'

const ForgotPasswordSchema: z.ZodType = z
    .object({
        email: z
            .string({
                invalid_type_error: 'email must be a string',
            })
            .email('Please enter a valid email address'),
    })
    .superRefine(async ({ email }, ctx) => {
        if (email === '') {
            console.log('email is empty')
            ctx.addIssue({
                code: 'custom',
                path: ['email'],
                message: 'Please fill this in',
            })
        } else {
            await FirebaseService.ensureInitialized()
            const userCount = await FirebaseService.countDocuments(
                'user-profile',
                {
                    email,
                },
            )

            if (userCount === 0)
                ctx.addIssue({
                    code: 'custom',
                    path: ['email'],
                    message: 'This email is not registered',
                })
        }
    })

export { ForgotPasswordSchema }
