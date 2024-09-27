/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ContactUsFormSchema } from '~/schemas/contact-us'
import { z } from 'zod'
import { SignupSchema } from '~/schemas/signup'
import { LoginSchema } from '~/schemas/login'

type ContactUsFormData = z.infer<typeof ContactUsFormSchema>
type SignupFormData = z.infer<typeof SignupSchema>
type LoginFormData = z.infer<typeof LoginSchema>

export type { ContactUsFormData, SignupFormData, LoginFormData }
