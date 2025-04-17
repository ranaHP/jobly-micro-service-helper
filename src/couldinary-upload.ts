import cloudinary, {UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from 'cloudinary'

export function imageUpload(
    file: string, 
    public_id?: string, 
    overwrite?: boolean,
    invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, 
            {
                public_id, 
                overwrite, 
                invalidate,
                resource_type: 'image', 
            }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) {
                resolve(error)
            } else {
                resolve(result)
            }
        })
    })
}

export function videoUpload(
    file: string, 
    public_id?: string, 
    overwrite?: boolean,
    invalidate?: boolean): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, 
            {
                public_id, 
                overwrite, 
                invalidate,
                chunk_size: 60000,
                resource_type: 'video',
            }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) {
                resolve(error)
            } else {
                resolve(result)
            }
        })
    })
}