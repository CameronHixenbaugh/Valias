import {Suspense} from "react"
import {useFlowBalance} from "../hooks/use-flow-balance.hook"
import {useKibblesBalance} from "../hooks/use-kibbles-balance.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
import {fmtKibbles} from "../util/fmt-kibbles"
import VexModal from "./paypal/VexModal.comp"
import DepositVex from "./paypal/DepositVex.comp"
import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Heading,
  Spinner,
  Center,
} from "@chakra-ui/react"
//import {useInitialized} from "../hooks/use-initialized.hook"

export function BalanceCluster({address}) {
  const flow = useFlowBalance(address)
  const kibbles = useKibblesBalance(address)
  //const init = useInitialized(address)
  return (
    <Box >
      <Box mb="2">
        <Flex>
          <Heading size="md" mr="4">
            Balance
          </Heading>
          {(flow.status !== IDLE || kibbles.status !== IDLE) && (
            <Center>
              <Spinner size="sm" />
            </Center>
          )}
        </Flex>
      </Box>
      <Box maxW="200px" borderWidth="1px" borderRadius="lg">
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td>VEX</Td>
              {kibbles.status === IDLE ? (
                <Td isNumeric>{fmtKibbles(kibbles.balance)}</Td>
              ) : (
                <Td isNumeric>
                  <Spinner size="sm" />
                </Td>
              )}
            </Tr>
          </Tbody>
        </Table>
      </Box>
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
            <VexModal />
        </Flex>
      </Box>
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
            <DepositVex />
        </Flex>
      </Box>
    </Box>
  )
}

export default function WrappedBalanceCluster(props) {
  const [cu] = useCurrentUser()
  if (cu.addr !== props.address) return null

  return (
    <Suspense
      fallback={
        <Flex>
          <Heading size="md" mr="4">
            Balance
          </Heading>
          <Center>
            <Spinner size="sm" />
          </Center>
        </Flex>
      }
    >
      <BalanceCluster {...props} />
    </Suspense>
  )
}
