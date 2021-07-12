import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useDeleteImageMutation, useUploadImageMutation } from '../../generated/graphql';
import { ImFilePicture } from 'react-icons/im'
import { CgCloseO } from 'react-icons/cg'
import { ImageAction, ProductImage } from '../../types/images';
import { ColorSelect } from '../frontend/molecules/ColorSelect';
import { ProductColor } from '../../types/colors';
import { ColorItem } from '../frontend/atoms/ColorItem';
import { randomId } from '../../utils/randomId';

interface UploadImageProps {
    dispatch: React.Dispatch<ImageAction>;
    image: ProductImage;
    colors?: ProductColor[]
}

export const UploadImage: React.FC<UploadImageProps> = ({ dispatch, image: { id, url, color, __typename }, colors }) => {
    const [uploadImage] = useUploadImageMutation()
    const [deleteImage] = useDeleteImageMutation()
    const [showColorSelect, setShowColorSelect] = useState(false)

    useEffect(() => {

        const mousedown = (e: MouseEvent) => {
            const targetClassName = (e.target as HTMLDivElement).className ?? ""
            if (targetClassName && !targetClassName?.match(/(ColorSelect|ColorItem)/g)) setShowColorSelect(false)
        }

        document.body.addEventListener('mousedown', mousedown)
        
        return () => {
            document.body.removeEventListener('mousedown', mousedown)
        }
    }, [])

    const onDrop = useCallback(
        async (files) => {
            for (const file of files) {
                const response = await uploadImage({
                    variables: { file }
                })
                if (response?.data?.uploadImage.uploaded) {
                    const url: string = response.data.uploadImage.url as string
                    const image: string = response.data.uploadImage.image as string
                    dispatch({ type: "ADD", id: randomId(), image, url })
                }
            }
        },
        [uploadImage, id]
    )

    const handleDelete = async () => {
        dispatch({ type: "DELETE", id })
        if (__typename) {
            await deleteImage({
                variables: { id }
            })
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: 'image/*'
    })

    const colorCode = useMemo(() => colors?.find(c => c.name == color)?.code ?? "", [color])

    const handleSetColor = (color: any) => {
        dispatch({ type: "UPDATE", id, color })
    }

    if (url) {
        return (
            <div className="mx-2 w-32 relative">
                <div className="absolute left-0 w-auto h-auto z-10">
                    <div onClick={() => setShowColorSelect(true)}>
                        <ColorItem code={colorCode} isDataCheckedStyles={false}></ColorItem>
                    </div>
                    {showColorSelect
                        ? (
                            <div className="ColorSelect p-5 shadow-lg rounded-lg bg-white">
                                <ColorSelect colors={colors} value={color ?? ""} setValue={handleSetColor} isAdmin={true} />
                            </div>
                        )
                        : null}
                </div>
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