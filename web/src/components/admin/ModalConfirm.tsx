import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button
} from '@chakra-ui/react';

import React from 'react'

interface ModalConfirmProps {
    title: string
    isOpen: boolean
    onClose: () => void
    onAccept: () => void
}

export const ModalConfirm: React.FC<ModalConfirmProps> = ({ title, isOpen, onClose, children, onAccept }) => {    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
                    <Button variant="ghost" onClick={onAccept}>Yes</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}