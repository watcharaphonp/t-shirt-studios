import { z } from 'zod'
import { PhoneNumberUtil } from 'google-libphonenumber'

const phoneUtil = PhoneNumberUtil.getInstance()
const defaultNameCharacterLimit: number = 100
const phoneNumberLimit: number = 15

const ContactUsFormSchema = z
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
        phoneNumber: z
            .string({
                invalid_type_error: 'Phone number must be a string',
            })
            .min(1, 'Phone number is required')
            .max(
                phoneNumberLimit,
                `Phone number must be at most ${phoneNumberLimit} characters long`,
            )
            // Custom validation: Phone number must be numeric
            .refine((phoneNumber) => /^\d+$/.test(phoneNumber), {
                message: 'Phone number must contain only digits',
            }),
        phonePrefix: z.string().min(1, 'Phone Prefix is required'),
        countryCode: z.string().min(1, 'Country Code is required'),
    })
    .superRefine((data, ctx) => {
        const { phonePrefix, countryCode, phoneNumber } = data

        const isValid = phoneUtil.isValidNumberForRegion(
            phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode),
            countryCode,
        )

        if (!isValid) {
            ctx.addIssue({
                code: 'custom',
                path: ['phoneNumber'],
                message: `${phonePrefix}${phoneNumber} is not valid phone number`,
            })
        }
    })

export { ContactUsFormSchema }
