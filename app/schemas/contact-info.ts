import { z } from 'zod'
import { validatePhoneNumber } from '~/utils/PhoneNumberUtils'

const defaultNameCharacterLimit: number = 100

const ContactInfoSchema = z
    .object({
        firstName: z
            .string({
                invalid_type_error: 'First name must be a string',
            })
            .min(1, 'First name is required')
            .max(
                defaultNameCharacterLimit,
                `First Name must be at most ${defaultNameCharacterLimit} characters long`,
            ),

        lastName: z
            .string({
                invalid_type_error: 'Last name must be a string',
            })
            .min(1, 'Last name is required')
            .max(
                defaultNameCharacterLimit,
                `Last Name must be at most ${defaultNameCharacterLimit} characters long`,
            ),
        email: z
            .string({
                invalid_type_error: 'Email must be a string',
            })
            .min(1, 'Email is required')
            .email('Email must be a valid email'),
        phoneNumber: z.string(),
        phonePrefix: z.string().min(1, 'Phone Prefix is required'),
        phoneCountryCode: z.string(),
        country: z
            .string({
                invalid_type_error: 'Country must be a string',
            })
            .min(1, 'Country is required'),
        street: z
            .string({
                invalid_type_error: 'Street must be a string',
            })
            .min(1, 'Street is required'),
        streetNumber: z
            .string({
                invalid_type_error: 'Street number must be a string',
            })
            .min(1, 'Street number is required'),
        postalCode: z
            .string({
                invalid_type_error: 'Postal code must be a string',
            })
            .min(1, 'Postal code is required'),
        city: z
            .string({
                invalid_type_error: 'City must be a string',
            })
            .min(1, 'City is required'),
        invoicingEmail: z
            .string()
            .email('Invoicing email must be a valid email')
            .optional(), // Optional invoicing email
        useInvoicingEmail: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
        validatePhoneNumber(data, ctx)

        if (data.useInvoicingEmail && !data.invoicingEmail) {
            ctx.addIssue({
                path: ['invoicingEmail'],
                message: 'Invoicing email is required',
                code: 'custom',
            })
        }
    })

export { ContactInfoSchema }
