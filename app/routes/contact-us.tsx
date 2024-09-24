import { json, type ActionFunctionArgs } from '@remix-run/node'
import type { ContactUsFormData } from '~/types/form'
import type { MailServiceConfig } from '~/services/MailService'
import { MailService } from '~/services/MailService'

export async function action({ request }: ActionFunctionArgs) {
    let formData = await request.formData()

    const formDataObject: ContactUsFormData = Object.fromEntries(
        formData.entries(),
    )

    const config: MailServiceConfig = {
        serviceMailProvider: process.env.SERVICE_MAIL_PROVIDER ?? '',
        serviceMailAddress: process.env.SERVICE_MAIL_ADDRESS ?? '',
        serviceMailPassword: process.env.SERVICE_MAIL_PASSWORD ?? '',
    }

    const mailService = new MailService(config)
    await mailService.sendEmailToCustomerSupport({
        requestDetail: formDataObject,
        message: 'Please contact me back.',
        Mailto: process.env.CUSTOMER_SUPPORT_MAIL_ADDRESS ?? '',
        subject: 'New Request from User - Immediate Action Required',
    })

    await mailService.sendEmailToContactUser({
        requestDetail: formDataObject,
        subject: `${process.env.APP_NAME} - We have received your request.`,
    })

    return json({ success: true, data: formDataObject })
}
