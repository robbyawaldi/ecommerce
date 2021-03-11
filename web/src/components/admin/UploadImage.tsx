import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useUploadImageMutation } from '../../generated/graphql';
import { ImFilePicture } from 'react-icons/im'

interface UploadImageProps { }

export const UploadImage: React.FC<UploadImageProps> = ({ }) => {
    const [uploadImage] = useUploadImageMutation()
    const [imageUrl, setImageUrl] = useState<string>()

    const onDrop = useCallback(
        async ([file]) => {
            const response = await uploadImage({
                variables: { file }
            })

            if (response?.data?.uploadImage.uploaded) {
                setImageUrl(response.data.uploadImage.url as string)
            }
        },
        [uploadImage]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    if (imageUrl) {
        return <img className="rounded-md mx-2 w-32" src={imageUrl} />
    }

    return (
        <div {...getRootProps()} className="border-2 border-dashed border-opacity-100 rounded-md h-32 w-32">
            <input {...getInputProps()} />
            <div className="flex justify-center items-center w-full h-full flex-col">
                <ImFilePicture />
                <span className="text-xs">Add Image Here</span>
            </div>
        </div>
    );
}