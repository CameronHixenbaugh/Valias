import UserSetPrice from './UserSetPrice.js'
import {AccountItemCluster} from "./account-item-cluster.comp"
import{
    Button,
    Center,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react"

export function PriceModal(props){
    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <div>
          <Button onClick={onOpen} colorScheme="blue" size="sm">
            <HStack>
            {AccountItemCluster.BUSY && <Spinner mr="2" size="xs" />}{" "}
                <Text>List NFT For Sale</Text>
            </HStack>
          </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader style={{color:"white"}}><Center>Set the Price for your NFT</Center></ModalHeader>
                  <ModalCloseButton style={{color:"white"}} />
                  <ModalBody>
                    <UserSetPrice sellNFT={props.sellNFT}/>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose} disabled={AccountItemCluster.BUSY}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
    )
}

export default PriceModal;