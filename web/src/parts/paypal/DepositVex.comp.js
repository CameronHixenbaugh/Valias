import React, {useState} from 'react'
import {useInitialized} from "../../hooks/use-initialized.hook"
import {useAddress} from "../../hooks/use-url-address.hook"
import {IDLE} from "../../global/constants"
import {useKibblesBalance} from "../../hooks/use-kibbles-balance.hook"
import {fmtKibbles} from "../../util/fmt-kibbles"
import DepositModal from "./DepositModal.comp"
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
    Spinner,
    Table,
    Tbody,
    Td,
    Tr,
    useDisclosure,
} from "@chakra-ui/react"

export default function DepositVex(props){
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
      <Button disabled={kibbles.status !== IDLE || !init.isInitialized} onClick={onOpen} alignSelf="center" backgroundColor="#BEE3F8">Deposit VEX</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="black" borderWidth="thick" borderColor="#BEE3F8">
          <ModalHeader textAlign="center" p="7" color="white">How much VEX would you like to Deposit?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
                <Box borderColor="#BEE3F8" borderWidth="thick">
                    <Table size="md">
                        <Tbody>
                            <Tr>
                                <Td color="Black" backgroundColor="#BEE3F8" ><b>Current Amount of VEX: </b></Td>
                            </Tr>
                            <Tr>
                                <Center>
                                    {kibbles.status === IDLE ? (
                                        <Td isNumeric color="white">{fmtKibbles(kibbles.balance)}</Td>
                                    ) : (
                                        <Td isNumeric>
                                            <Spinner size="sm" />
                                        </Td>
                                    )}
                                </Center>
                            </Tr>
                        </Tbody>
                    </Table>
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
            <DepositModal vex={state.amount} />
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