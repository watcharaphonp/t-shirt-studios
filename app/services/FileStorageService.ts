// services/fileStorageService.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Readable } from 'stream'
import type { ReadableStream as WebReadableStream } from 'stream/web'

interface UploadParams {
    file: File
    bucketName: string
    key: string
}

export class FileStorageService {
    private s3Client: S3Client

    constructor({
        region,
        accessKeyId,
        secretAccessKey,
        endpoint,
    }: {
        region: string
        accessKeyId?: string
        secretAccessKey?: string
        endpoint: string
    }) {
        this.s3Client = new S3Client({
            endpoint,
            region,
            forcePathStyle: true,
            ...(accessKeyId && secretAccessKey
                ? { credentials: { accessKeyId, secretAccessKey } }
                : {}),
        })
    }

    async uploadFile({ file, bucketName, key }: UploadParams): Promise<string> {
        console.log(file)

        const webStream = file.stream() as unknown as WebReadableStream
        const stream = Readable.fromWeb(webStream)
        const chunks: Buffer[] = []

        for await (const chunk of stream) {
            chunks.push(Buffer.from(chunk))
        }

        const buffer = Buffer.concat(chunks)
        const uploadParams = {
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        }

        try {
            const result = await this.s3Client.send(
                new PutObjectCommand(uploadParams),
            )
            console.log('Upload successful:', result)

            // Generate a signed URL
            const signedUrl = await this.getSignedUrl(bucketName, key)
            console.log('Signed URL:', signedUrl)

            return signedUrl
        } catch (error) {
            console.error('Error uploading file:', error)
            throw new Error('File upload failed')
        }
    }

    private async getSignedUrl(
        bucketName: string,
        key: string,
    ): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
        })

        const signedUrl = await getSignedUrl(this.s3Client, command, {
            expiresIn: 3600, // URL expiration time in seconds (1 hour)
        })

        return signedUrl
    }
}
