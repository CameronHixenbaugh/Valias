import React, {Suspense} from "react"
import { Redirect} from "react-router-dom"
import {Base} from "../../parts/base.comp"
import {IDLE} from "../../global/constants"
import {useAddress} from "../../hooks/use-url-address.hook"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import {useMarketItems} from "../../hooks/use-market-items.hook"
import {useAccountItems} from "../../hooks/use-account-items.hook"
import {useInitialized} from "../../hooks/use-initialized.hook"
import {useKibblesBalance} from "../../hooks/use-kibbles-balance.hook"
import AuthCluster from "../../parts/auth-cluster.comp"
import InitCluster from "../../parts/init-cluster.comp"
import BalanceCluster from "../../parts/balance-cluster.comp"
import MarketItemsCluster from "../../parts/market-items-cluster.comp"
import {CreateNFTCluster} from "../../parts/create-nft-cluster.comp.js"
import Navbar from "../../parts/navbar.comp"
import AccountItemsCluster from "../../parts/account-items-cluster.comp"
import Foot from "../../parts/footer.comp"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Badge,
  Flex,
  Center,
  Tag,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
  HStack
} from "@chakra-ui/react" 



export function MarketItemsCount() {
  let l = 0
  return l > 0 ? <Tag ml="1">{l}</Tag> : null
}

export function AccountItemsCount({address}) {
  const items = useAccountItems(address)
  if (items.status !== IDLE) return <Spinner size="xs" ml="1" />
  const l = items?.ids?.length ?? 0
  return l > 0 ? <Tag ml="1">{l}</Tag> : null
}

export function StoreItemsCount() {
  const items = useMarketItems()
  if (items.status !== IDLE) return <Spinner size="xs" ml="1" />
  const l = items?.ids?.length ?? 0
  return l > 0 ? <Tag ml="1">{l}</Tag> : null
}



export function InfoBanner({address}) {
  const init = useInitialized(address)
  const kibs = useKibblesBalance(address)
  const [cu] = useCurrentUser()

  const status = {
    notInitialized: {
      type: "info",
      title: "Initialize Your Account",
      text:
        "You need to initialize your account before you can receive VCoins.",
    },
    noKibble: {
      type: "info",
      title: "Get Vex",
      text: "You need Vex to buy NFTs.",
    },
  }

  function Banner(message) {
    return (
      <Flex my="4">
        <Alert status={message.type}>
          <AlertIcon />
          <AlertTitle mr={2}>{message.title}</AlertTitle>
          {message.text}
        </Alert>
      </Flex>
    )
  }

  switch (true) {
    case !init.isInitialized && cu.addr === address:
      return Banner(status.notInitialized)
    case kibs.balance < 0 && cu.addr === address:
      return Banner(status.noKibble)
    default:
      return null
  }
}

export function Page() {
  const address = useAddress()
  const [user, loggedIn, cu] = useCurrentUser()

  return loggedIn ?(
    <Base>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous"></link>

        <Box borderWidth="10px" borderColor="black" >
        <AuthCluster/>
        </Box>
        <Box borderWidth="10px" borderColor="black"> 
          <Navbar />
        </Box>
        <Box backgroundColor="black">
        <Center>
        <Flex mb="4">
          <Center>
            <Text mr="4" fontSize="2xl" color="black" backgroundColor="#A0AEC0">
              Account:{" "}
              <Text display="inline" color="black" fontWeight="bold">
                {address}
              </Text>
            </Text>
          {address === cu.addr && (
              <Badge ml="4" variant="solid" colorScheme="red">
                You
              </Badge>
          )}
          </Center>
        </Flex>
        <Suspense fallback={null} >
          <InfoBanner address={address} />
        </Suspense>
        </Center>
        <Center>
        <Flex>
          <Box backgroundColor="#A0AEC0">
            <InitCluster address={address} />
          </Box>
          <Box ml="4" backgroundColor="#A0AEC0">
            <BalanceCluster address={address} />
          </Box>

        </Flex>
        </Center>
        </Box>
        <Box backgroundColor="black" p="7">
        <Tabs colorScheme="blue" defaultIndex={0}>
          <Center>
          <TabList backgroundColor="black" style={{color:"white"}}>
            <Tab fontSize="2xl">
              <HStack>
                <Box>{cu.addr === address ? "My" : "User"} NFTs</Box>
              </HStack>
              <Suspense fallback={null}>
                <AccountItemsCount address={address} />
              </Suspense>
            </Tab>
            <Tab fontSize="2xl">
              <HStack>
                <Box>NFT Market</Box>
              </HStack>
              <Suspense fallback={null}>
                <MarketItemsCount />
              </Suspense>
            </Tab>
            <Tab fontSize="2xl">
              <HStack>
                <Box>Create NFT</Box>
              </HStack>
            </Tab>
          </TabList>
          </Center> 

          <TabPanels backgroundColor="black">
            <TabPanel>
              <AccountItemsCluster address={address} />
            </TabPanel>
            <TabPanel >
              <MarketItemsCluster />
            </TabPanel>
            <TabPanel>
            <Suspense fallback={null}>
              <CreateNFTCluster address={address} />
            </Suspense>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <footer>
        <Foot />
      </footer>
    </Base>
  ):(
    <Base>
      <div>\\<Redirect to="/" /></div>
    </Base>
  );
}

