import { HStack, RadioGroup, Stack, useRadioGroup } from '@chakra-ui/react';
import React from 'react'
import { Color } from '../../../generated/graphql';
import { ColorItem } from '../atoms/ColorItem';

interface ColorSelectProps {
    colors: Color[]
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export const ColorSelect: React.FC<ColorSelectProps> = ({ colors, value, setValue }) => {
    const { getRootProps, getRadioProps } = useRadioGroup({ name: "colors", defaultValue: value, onChange: setValue })
    const group = getRootProps()

    return (
        <div>
            {colors.length > 0
                ? <div className="font-semibold">Pilih Warna</div>
                : null
            }
            <HStack {...group}>
                {colors.map(({ code, name }) => {
                    const radio = getRadioProps({ value: name })
                    return (
                        <ColorItem key={code} code={code} {...radio}>
                            {name}
                        </ColorItem>
                    )
                })}
            </HStack>
        </div>
    );
}