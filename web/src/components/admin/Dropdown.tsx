import React from 'react'
import { Item } from '../../types/item';

interface DropdownProps { 
    list: Item[];
    addItem: (item: Item) => void
}

export const Dropdown: React.FC<DropdownProps> = ({ list, addItem }) => {
    return (
        <div className="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto ">
        <div className="flex flex-col w-full">
            {list.map((item: Item, key: number) => {
                return <div key={key}
                    className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                    onClick={() => addItem(item)}>
                    <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100" >
                        <div className="w-full items-center flex">
                            <   div className="mx-2 leading-6  ">
                                {item.name}
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
    );
}