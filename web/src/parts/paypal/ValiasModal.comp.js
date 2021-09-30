import React from 'react'
import PayPalModalValias from './PayPalModalValias.comp'
import {
    Box,
    Button,
    Center,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
} from "@chakra-ui/react"
import AddVexModal from './AddVexModal.comp';

export default function ValiasModal(props){
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} color="black" backgroundColor="#BEE3F8">Buy</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="black" borderWidth="thick" borderColor="#BEE3F8">
          <ModalHeader textAlign="center" p="7" color="white">Are you ready to Checkout?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
                <VStack>
                    <Box borderColor="#BEE3F8" borderWidth="thick">     
                        <Box color="Black" backgroundColor="#BEE3F8"> 
                        <b>Current VEX Price(USD):</b>
                        </Box>
                        <Box color="white" textAlign="center">
                            1.00 USD
                        </Box>
                    </Box>
                    <br />
                    <br />

                    <Box color="white">
                        The current cost is {props.valias} VEX <br /> 
                        **NOT INCLUDING FEES**
                    </Box>
                </VStack>
            </Center>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <PayPalModalValias valias={props.valias} />
            <AddVexModal />
            <Button backgroundColor="#BEE3F8" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}