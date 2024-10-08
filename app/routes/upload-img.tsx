// app/routes/index.tsx
import { Form, useActionData } from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import { json, unstable_createFileUploadHandler } from '@remix-run/node'
import { parseMultipartFormData } from '@remix-run/server-runtime/dist/formData'
// import { FileStorageService } from '~/services/FileStorageService'
// import { awsConfig } from '~/configs'
import axios from 'axios'

type ActionData = {
    fileUrl?: string
    error?: string
}

export const action: ActionFunction = async ({ request }) => {
    const fileUploadHandler = unstable_createFileUploadHandler({
        directory: '/tmp', // temporary storage for processing files
    })

    const formData = await parseMultipartFormData(request, fileUploadHandler)
    const file = formData.get('file') as File

    if (!file) {
        return json({ error: 'No file uploaded' }, { status: 400 })
    }

    // const fileStorageService = new FileStorageService(awsConfig)
    // const bucketName = process.env.AWS_BUCKET_NAME

    // if (!bucketName)
    //     return json({ error: 'S3 bucket name is not provide' }, { status: 500 })

    // try {
    //     const key = file.name
    //     const fileUrl = await fileStorageService.uploadFile({
    //         file,
    //         bucketName,
    //         key,
    //     })
    //     console.log('File URL:', fileUrl)
    //     return json({ fileUrl })
    // } catch (error) {
    //     console.error((error as Error).message)
    //     return json({ error: 'Failed to upload file' }, { status: 500 })
    // }

    const fileFormData = new FormData()
    fileFormData.append('files', file)

    try {
        const response = await axios.post(
            'http://localhost:1337/api/upload', // Update the URL based on your Strapi setup
            fileFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )

        return json(response.data)
    } catch (error) {
        console.error((error as Error).message)
        return json({ error: 'Failed to upload file' }, { status: 500 })
    }
}

export default function Index() {
    const actionData = useActionData<ActionData>()

    return (
        <div>
            <h1>Upload a File</h1>
            <Form method="post" encType="multipart/form-data">
                <input type="file" name="file" required />
                <button type="submit">Upload</button>
            </Form>
            {actionData?.fileUrl && (
                <div>
                    <p>File uploaded successfully:</p>
                    <a
                        href={actionData.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {actionData.fileUrl}
                    </a>
                </div>
            )}
            {actionData?.error && <p>Error: {actionData.error}</p>}
        </div>
    )
}
