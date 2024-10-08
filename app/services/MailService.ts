import type { ContactUsFormData } from '~/types/form'
import nodemailer from 'nodemailer'
import {
    generateContactUserEmail,
    generateCutomerSupportEmail,
} from '~/utils/EmailUtils'

export type MailServiceConfig = {
    serviceMailProvider: string
    serviceMailAddress: string
    serviceMailPassword: string
}

export class MailService {
    config: MailServiceConfig
    constructor(config: MailServiceConfig) {
        this.config = config
    }

    async sendEmailToCustomerSupport({
        requestDetail,
        message,
        Mailto,
        subject,
    }: {
        requestDetail: ContactUsFormData
        message: string
        Mailto: string
        subject: string
    }) {
        const config = this.config

        let transporter = nodemailer.createTransport({
            service: config.serviceMailProvider,
            auth: {
                user: config.serviceMailAddress,
                pass: config.serviceMailPassword,
            },
        })

        const mailContent = generateCutomerSupportEmail(message, requestDetail)

        let mailOptions = {
            from: this.config.serviceMailAddress,
            to: Mailto,
            subject: subject,
            ...mailContent,
        }

        try {
            let info = await transporter.sendMail(mailOptions)
            console.log('Email sent:', info.response)
        } catch (error) {
            console.error('Error sending email:', error)
        }
    }

    async sendEmailToContactUser({
        requestDetail,
        subject,
    }: {
        requestDetail: ContactUsFormData
        subject: string
    }) {
        const config = this.config

        let transporter = nodemailer.createTransport({
            service: config.serviceMailProvider,
            auth: {
                user: config.serviceMailAddress,
                pass: config.serviceMailPassword,
            },
        })

        const mailContent = generateContactUserEmail(requestDetail)

        let mailOptions = {
            from: this.config.serviceMailAddress,
            to: requestDetail.email,
            subject: subject,
            ...mailContent,
        }

        try {
            let info = await transporter.sendMail(mailOptions)
            console.log('Email sent:', info.response)
        } catch (error) {
            console.error('Error sending email:', error)
        }
    }
}
