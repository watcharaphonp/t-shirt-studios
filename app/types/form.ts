/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ContactUsFormSchema } from '~/schemas/contact-us'
import { z } from 'zod'
import { SignupSchema } from '~/schemas/signup'
import { LoginSchema } from '~/schemas/login'
import { ForgotPasswordSchema } from '~/schemas/forgot-password'

type ContactUsFormData = z.infer<typeof ContactUsFormSchema>
type SignupFormData = z.infer<typeof SignupSchema>
type LoginFormData = z.infer<typeof LoginSchema>
type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>

export type {
    ContactUsFormData,
    SignupFormData,
    LoginFormData,
    ForgotPasswordFormData,
}
