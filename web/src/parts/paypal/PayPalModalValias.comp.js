import React from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    useDisclosure
} from "@chakra-ui/react"
import ValiasPayPal from './ValiasPayPal.comp';

export default function PayPalModalValias(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
        <>
      <Button onClick={onOpen} backgroundColor="#BEE3F8">Checkout</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="black" borderWidth="thick" borderColor="#BEE3F8">
          <ModalHeader textAlign="center" p="7" color="white"><h1>Checkout</h1></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ValiasPayPal valias={props.valias}/>
          </ModalBody>

          <ModalFooter>
            <Spacer />
            <Button backgroundColor="#BEE3F8" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
}