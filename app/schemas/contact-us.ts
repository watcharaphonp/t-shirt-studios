import { z } from 'zod'
import { validatePhoneNumber } from '~/utils/PhoneNumberUtils'

const defaultNameCharacterLimit: number = 100

const ContactUsFormSchema: z.ZodType = z
    .object({
        firstName: z
            .string({
                invalid_type_error: 'First Name must be a string',
            })
            .min(1, 'First Name is required')
            .max(
                defaultNameCharacterLimit,
                `First Name must be at most ${defaultNameCharacterLimit} characters long`,
            ),
        lastName: z
            .string({
                invalid_type_error: 'Last Name must be a string',
            })
            .min(1, 'Last Name is required')
            .max(
                defaultNameCharacterLimit,
                `Last Name must be at most ${defaultNameCharacterLimit} characters long`,
            ),
        company: z
            .string({
                invalid_type_error: 'Company must be a string',
            })
            .min(1, 'Company is required')
            .max(
                defaultNameCharacterLimit,
                `Company must be at most ${defaultNameCharacterLimit} characters long`,
            ),
        email: z
            .string({
                invalid_type_error: 'email must be a string',
            })
            .min(1, 'email is required')
            .email('email must be a valid email'),
        phoneNumber: z.string(),
        phonePrefix: z.string().min(1, 'Phone Prefix is required'),
        phoneCountryCode: z.string().min(1, 'Country Code is required'),
        agreeToPolicy: z
            .string()
            .refine((value) => value === 'on', {
                message: 'You must agree to the privacy policy',
            })
            .default('off'),
    })
    .superRefine((data, ctx) => {
        validatePhoneNumber(data, ctx)
    })

export { ContactUsFormSchema }
