import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { useUploadImageMutation } from '../../generated/graphql';
import { ImFilePicture } from 'react-icons/im'
import { CgCloseO } from 'react-icons/cg'
import { Action, ProductImage } from '../../types/images';

interface UploadImageProps {
    dispatch: React.Dispatch<Action>;
    image: ProductImage;
}

export const UploadImage: React.FC<UploadImageProps> = ({ dispatch, image: { id, url, __typename } }) => {
    const [uploadImage] = useUploadImageMutation()

    const onDrop = useCallback(
        async ([file]) => {
            const response = await uploadImage({
                variables: { file }
            })
            if (response?.data?.uploadImage.uploaded) {
                const url: string = response.data.uploadImage.url as string
                const image: string = response.data.uploadImage.image as string
                dispatch({ type: "UPDATE", id, image, url })
                dispatch({ type: "ADD" })
            }
        },
        [uploadImage, id]
    )

    const handleDelete = () => {
        dispatch({ type: "DELETE", id })
        if (!__typename) {
            console.log("test")
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    if (url) {
        return (
            <div className="mx-2 w-32 relative">
                <div className="absolute right-0 w-5 h-5 rounded-full flex justify-center items-center bg-white cursor-pointer">
                    <CgCloseO size={24} onClick={handleDelete} />
                </div>
                <img className="rounded-md" src={url} />
            </div>
        )
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