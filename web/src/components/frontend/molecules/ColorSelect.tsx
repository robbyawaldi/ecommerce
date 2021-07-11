import { useRadioGroup } from '@chakra-ui/react';
import React from 'react'
import { Color } from '../../../generated/graphql';
import { ProductColor } from '../../../types/colors';
import { ColorItem } from '../atoms/ColorItem';

interface ColorSelectProps {
    colors?: Color[] | ProductColor[]
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    isAdmin?: boolean
}

export const ColorSelect: React.FC<ColorSelectProps> = ({ colors, value, setValue, isAdmin = false }) => {
    const { getRootProps, getRadioProps } = useRadioGroup({ name: "colors", defaultValue: value, onChange: setValue })
    const group = getRootProps()

    if (colors == undefined || colors.length < 1) {
        return null
    }

    return (
        <div>
            <div className="font-semibold">Pilih Warna</div>
            <div className="flex flex-wrap" {...group}>
                {colors.map(({ code, name }: {code: string | undefined, name: string | undefined}, index: number) => {
                    const radio = getRadioProps({ value: name })
                    return (
                        <ColorItem key={index} code={code ?? ""} {...radio} isAdmin={isAdmin}>
                            {name}
                        </ColorItem>
                    )
                })}
            </div>
        </div>
    );
}