/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ContactUsFormSchema } from '~/schemas/contact-us'
import { z } from 'zod'
import { SignupSchema } from '~/schemas/sign-up'

type ContactUsFormData = z.infer<typeof ContactUsFormSchema>
type SignupFormData = z.infer<typeof SignupSchema>

export type { ContactUsFormData, SignupFormData }
