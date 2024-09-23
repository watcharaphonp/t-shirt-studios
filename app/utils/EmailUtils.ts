import type { ContactUsFormData } from '~/types/form'

export const generateCutomerSupportEmail = (
    message: string,
    requestDetail: ContactUsFormData,
) => {
    return {
        text: `
        Dear Customer Support Team,
        
        We have received a new request from a user through our system. Please review the details below and reach out to the user as soon as possible.
        
        ---
        
        **User Details:**
        
        - **Name:** ${requestDetail.firstName} ${requestDetail.lastName}
        - **Company:** ${requestDetail.company}
        - **Email:** ${requestDetail.email}
        - **Phone Number:** ${requestDetail.phoneNumber}
        
        ---
        
        **Request Details:**
        
        ${message}
        
        ---
        
        **Action Required:**
        
        Please contact the user using the provided contact information and address their request. Ensure to follow up with the user to confirm their issue has been resolved or their query has been addressed.
        
        Thank you for your prompt attention to this matter.
        
        Best regards,
        
        [Your Company Name]
        [Your Contact Information]
                `,
        html: `
        <p>Dear Customer Support Team,</p>
        
        <p>We have received a new request from a user through our system. Please review the details below and reach out to the user as soon as possible.</p>
        
        <p><strong>User Details:</strong></p>
        <ul>
            <li><strong>Name:</strong> ${requestDetail.firstName} ${requestDetail.lastName}</li>
            <li><strong>Company:</strong> ${requestDetail.company}</li>
            <li><strong>Email:</strong> ${requestDetail.email}</li>
            <li><strong>Phone Number:</strong> ${requestDetail.phoneNumber}</li>
        </ul>
        
        <p><strong>Request Details:</strong></p>
        <p>${message}</p>
        
        <p><strong>Action Required:</strong></p>
        <p>Please contact the user using the provided contact information and address their request. Ensure to follow up with the user to confirm their issue has been resolved or their query has been addressed.</p>
        
        <p>Thank you for your prompt attention to this matter.</p>
        
        <p>Best regards,<br>
        [Your Company Name]<br>
        [Your Contact Information]</p>
                `,
    }
}

export const generateContactUserEmail = (requestDetail: ContactUsFormData) => {
    return {
        text: `
    Dear ${requestDetail.firstName} ${requestDetail.lastName},
    
    We have received a new request from a user through our system. Please review the details below and reach out to the user as soon as possible.
    
    ---
    
    **User Details:**
    
    - **Name:** ${requestDetail.firstName} ${requestDetail.lastName}
    - **Company:** ${requestDetail.company}
    - **Email:** ${requestDetail.email}
    - **Phone Number:** ${requestDetail.phoneNumber}
    
    ---
    
    Best regards,
    Support Team
    `,

        html: `
    <p>Dear ${requestDetail.firstName} ${requestDetail.lastName},</p>
    
    <p>We have received a new request from a user through our system. Please review the details below and reach out to the user as soon as possible.</p>
    
    <p></p>
    
    <p>User Details:</p>
    
    <ul>
        <li><b>Name:</b> ${requestDetail.firstName} ${requestDetail.lastName}</li>
        <li><b>Company:</b> ${requestDetail.company}</li>
        <li><b>Email:</b> ${requestDetail.email}</li>
        <li><b>Phone Number:</b> ${requestDetail.phoneNumber}</li>
    </ul>
    
    <p></p>
    
    <p>Best regards,</p>
    <p>Support Team</p>
    `,
    }
}
