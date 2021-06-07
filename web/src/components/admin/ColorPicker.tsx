import React, { useState } from 'react'
import { BlockPicker } from 'react-color';

interface ColorPickerProps { }

export const ColorPicker: React.FC<ColorPickerProps> = ({ }) => {
        const [color, setColor] = useState('#22194D')
        const [name, setName] = useState('')
        const [show, setShow] = useState(false)

        return (
                <>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                        <div>Pilih warna</div>
                        {show
                                ?
                                <BlockPicker
                                        colors={['#FFF', '#000']}
                                        color={color}
                                        onChangeComplete={(color) => setColor(color.hex)}
                                />
                                : null
                        }
                </>
        );
}