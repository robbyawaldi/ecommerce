import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { useUploadImageMutation } from '../../generated/graphql';
import { ImFilePicture } from 'react-icons/im'

interface UploadImageProps { }

export const UploadImage: React.FC<UploadImageProps> = ({ }) => {
    const [uploadImage] = useUploadImageMutation()

    const onDrop = useCallback(
        ([image]) => {
            uploadImage({
                variables: { image }
            })
        },
        [uploadImage]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })
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