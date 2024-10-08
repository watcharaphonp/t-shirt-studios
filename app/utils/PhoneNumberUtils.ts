import { PhoneNumberUtil } from 'google-libphonenumber'
import type { ContactUsFormData } from '~/types/form'
import type { z } from 'zod'

const phoneUtil = PhoneNumberUtil.getInstance()
const phoneNumberLimit: number = 15

const validatePhoneNumber = (data: ContactUsFormData, ctx: z.RefinementCtx) => {
    const { phonePrefix, phoneCountryCode, phoneNumber = '' } = data
    let isValid = false

    if (phoneNumber.length === 0)
        return ctx.addIssue({
            code: 'custom',
            path: ['phoneNumber'],
            message: 'Phone number is required',
        })

    if (!/^\d+$/.test(phoneNumber))
        return ctx.addIssue({
            code: 'custom',
            path: ['phoneNumber'],
            message: 'Phone number must contain only digits',
        })

    if (phoneNumber.length > phoneNumberLimit)
        return ctx.addIssue({
            code: 'custom',
            path: ['phoneNumber'],
            message: `Phone number must be at most ${phoneNumberLimit} characters long`,
        })

    try {
        const parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(
            phoneNumber,
            phoneCountryCode,
        )
        isValid = phoneUtil.isValidNumberForRegion(
            parsedPhoneNumber,
            phoneCountryCode,
        )
    } catch (e) {
        // Catch potential parsing errors
        return ctx.addIssue({
            code: 'custom',
            path: ['phoneNumber'],
            message: 'Invalid phone number format',
        })
    }

    if (!isValid) {
        return ctx.addIssue({
            code: 'custom',
            path: ['phoneNumber'],
            message: `${phonePrefix}${phoneNumber} is not valid phone number`,
        })
    }
}

export { validatePhoneNumber }
