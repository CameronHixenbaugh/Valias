import {Suspense} from "react"
import {useInitialized} from "../hooks/use-initialized.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
import {
  Box,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Heading,
  Spinner,
  Center,
  VStack
} from "@chakra-ui/react"
import {CheckIcon, CloseIcon} from "@chakra-ui/icons"

const fmtBool = bool =>
  bool ? <CheckIcon color="green.500" /> : <CloseIcon color="red.500" />

export function InitCluster({address}) {
  const init = useInitialized(address)
  const [cu] = useCurrentUser()
  if (address == null) return null

  return (
    <Box>
      <Box mb="2">
        <Flex>
          <Heading size="md" mr="4">
            Account Initialized?
          </Heading>
          {init.status !== IDLE && (
            <Center>
              <Spinner />
            </Center>
          )}
        </Flex>
      </Box>
      <Center>
      <VStack>
      <Box maxW="200px" borderWidth="1px" borderRadius="lg">
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td>Vex Access</Td>
              <Td>{fmtBool(init.Kibble)}</Td>
            </Tr>
            <Tr>
              <Td>NFT Access</Td>
              <Td>{fmtBool(init.KittyItems)}</Td>
            </Tr>
            <Tr>
              <Td>Valias Market Access</Td>
              <Td>{fmtBool(init.KittyItemsMarket)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      {!init.isInitialized && address === cu.addr && (
        <Box mt="2"
        border= "2px solid #BEE3F8"
        boxSizing= "border-box"
        boxShadow= "inset 0px 4px 4px #E2E8F0"
        filter= "drop-shadow(0px 4px 4px #C4C4C4)"
        borderRadius= "6px"
        fontFamily= "Sora"
        fontStyle= "normal"
        fontWeight= "bolder"
        fontSize= "16px"
        lineHeight= "24px"
        color= "rgba(226, 232, 240, 0.92)"
        textShadow= "0px 4px 4px rgba(196, 196, 196, 0.0989583)"
        backgroundColor= "black">
          <Flex>
            <Button
              disabled={init.status !== IDLE}
              onClick={init.initialize}
            >
              Initialize Account
            </Button>
          </Flex>
        </Box>
      )}
      </VStack>
      </Center>
    </Box>
  )
}

export default function WrappedInitCluster(props) {
  const [cu] = useCurrentUser()
  if (cu.addr !== props.address) return null

  return (
    <Suspense
      fallback={
        <Box mb="2">
          <Flex>
            <Heading size="md" mr="4">
              Account Initialized?
            </Heading>
            <Center>
              <Spinner size="sm" />
            </Center>
          </Flex>
        </Box>
      }
    >
      <InitCluster {...props} />
    </Suspense>
  )
}
