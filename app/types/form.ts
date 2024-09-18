/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ContactUsFormSchema } from '~/schemas/contact-us'
import { z } from 'zod'

type ContactUsFormData = z.infer<typeof ContactUsFormSchema>

export type { ContactUsFormData }
