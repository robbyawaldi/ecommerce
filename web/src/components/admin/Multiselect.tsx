import React, { useState } from 'react'
import { Item } from '../../types/item';
import { Dropdown } from './Dropdown';

interface MultiselectProps {
    items: Item[];
    selectedItems: Item[];
    setSelected: React.Dispatch<React.SetStateAction<Item[]>>;
}

export const Multiselect: React.FC<MultiselectProps> = ({ items, selectedItems, setSelected }) => {
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => setDropdown(!dropdown);

    const addItem = (item: Item) => {
        setSelected([...Array.from(new Set(selectedItems.concat(item)))]);
        setDropdown(false);
    };

    const removeItem = (itemId: number) => setSelected(selectedItems.filter((item: Item) => item.id !== itemId));

    return (
        <div className="w-full flex flex-col items-center mx-auto">
            <div className="w-full">
                <div className="flex flex-col items-center relative">
                    <div className="w-full ">
                        <div className="p-1 flex border border-gray-200 bg-white rounded min-w-min">
                            <div className="flex flex-auto flex-wrap">
                                {
                                    selectedItems.map((item: Item, index) => {
                                        return (
                                            <div key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 border border-gray-200 ">
                                                <div className="text-xs font-normal leading-none max-w-full flex-initial">{item.name}</div>
                                                <div className="flex flex-auto flex-row-reverse">
                                                    <div onClick={() => removeItem(item.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                            className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>)
                                    })
                                }
                            </div>
                            <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200" onClick={toggleDropdown}>
                                <button type="button" className="cursor-pointer w-6 h-6 text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                        <polyline points="18 15 12 9 6 15"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {dropdown ? <Dropdown list={items} addItem={addItem}></Dropdown> : null}
            </div>
        </div>
    )
}