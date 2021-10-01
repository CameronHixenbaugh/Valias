import React, {useState} from 'react'
import PayPalModal from './PayPalModal.comp'
import {useInitialized} from "../../hooks/use-initialized.hook"
import {useAddress} from "../../hooks/use-url-address.hook"
import {IDLE} from "../../global/constants"
import {useKibblesBalance} from "../../hooks/use-kibbles-balance.hook"
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
    Spacer,
    useDisclosure,
    VStack,
} from "@chakra-ui/react"

export default function VexModal(props){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [state, setState] = useState({
        amount:''
    })
    const address = useAddress()
    const kibbles = useKibblesBalance(address)
    const init = useInitialized(address)

    function handleAmount(event){
        const amount = event.target.value;
        setState({
            amount: amount
          });
    }

  return (
    <>
      <Button disabled={kibbles.status !== IDLE || !init.isInitialized} onClick={onOpen} backgroundColor="#BEE3F8">Request VEX</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="black" borderWidth="thick" borderColor="#BEE3F8">
          <ModalHeader textAlign="center" p="7" color="white">How much VEX would you like to purchase?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
                <Box borderColor="#BEE3F8" borderWidth="thick">
                    <VStack>
                        <Box color="Black" backgroundColor="#BEE3F8"> 
                        <b>Current VEX Price(USD):</b>
                        </Box>
                        <Box color="white" textAlign="center">
                            1.00 USD
                        </Box>
                    </VStack>
                </Box>
            </Center>
            <br />
            <label style={{color:"white"}}>Amount: 
                <br />
                <input
                    style={{color:"black"}}
                    name="Vex"
                    type="number"
                    placeholder='50 VEX'
                    value={state.amount}
                    onChange={handleAmount}
                />
            </label>
          </ModalBody>

          <ModalFooter>
            <PayPalModal vex={state.amount} />
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
    
    
    