import { useDisclosure } from '@chakra-ui/hooks';
import { IconButton } from '@chakra-ui/react';
import { Collapse } from '@chakra-ui/transition';
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io';

interface CategoriesSidebarProps { }

export const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ }) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <div className="pl-5">
            <ul>
                <li>
                    Pakaian
                    <IconButton
                        variant="ghost"
                        aria-label="arrow"
                        icon={<IoIosArrowDown />}
                        onClick={onToggle} />
                    <Collapse in={isOpen}>
                        <ul className="pl-6">
                            <li>Gamis</li>
                            <li>Tunik</li>
                        </ul>
                    </Collapse>
                </li>
            </ul>
        </div>
    );
}