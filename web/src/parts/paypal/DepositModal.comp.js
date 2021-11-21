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
import Deposit from './Deposit.comp';
import {IDLE} from "../../global/constants"
import {useKibblesBalance} from "../../hooks/use-kibbles-balance.hook"
import {useAddress} from "../../hooks/use-url-address.hook"

export default function DepositModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const address = useAddress()
    const kibble = useKibblesBalance(address)

    
    return (
        <div>
      <Button disabled={kibble.status !== IDLE} onClick={onOpen} backgroundColor="#BEE3F8">Checkout</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="black" borderWidth="thick" borderColor="#BEE3F8">
          <ModalHeader textAlign="center" p="7" color="white"><h1>Checkout</h1></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <React.StrictMode>
             <div id="paypal-button"> <Deposit vex={props.vex}/> </div>
            </React.StrictMode>
          </ModalBody>

          <ModalFooter>
            <Spacer />
            <Button backgroundColor="#BEE3F8" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
    )
}