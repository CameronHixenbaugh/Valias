import React, {Suspense} from "react"
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
import CreateNFTCluster from "../../parts/create-nft-cluster.comp.js"
import Navbar from "../../parts/navbar.comp"
import AccountItemsCluster from "../../parts/account-items-cluster.comp"
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

//import marketpic from "../../parts/Images/market.jpg"
//import NFT from "./nft.jpg"
// from "./../../parts/images/createnft.jpg"

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
      title: "Get VCoins",
      text: "You need Vcoins to buy NFTs.",
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
  const [cu, loggedIn] = useCurrentUser()
  if (address == null) return <div>Not Found</div> 
   

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
        <Box backgroundImage={'url(https://burst.shopifycdn.com/photos/sunlight-reflects-on-water-texture.jpg?width=4460&height=4460&exif=1&iptc=1)'}
          backgroundSize={'cover'} backgroundPosition={'center center'} p={50} height={500}>
        <Center>
        <Flex mb="4">
          <Center>
            <Text mr="4" fontSize="2xl" color="black" backgroundColor="#A0AEC0">
              Account:{" "}
              <Text display="inline" color="black" fontWeight="bold">
                {address}
              </Text>
            </Text>
          </Center>
          {address === cu.addr && (
            <Center>
              <Badge ml="4" variant="solid" colorScheme="red">
                You
              </Badge>
            </Center>
          )}
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
        
        <Box backgroundImage={'url(https://burst.shopifycdn.com/photos/ripples-of-sand-in-black-and-white.jpg?width=4460&height=4460&exif=1&iptc=1)'}
    backgroundSize={'cover'} backgroundPosition={'center center'} p={5} style={{color:"white"}}>
        <Tabs colorScheme="blue" defaultIndex={0}>
          <Center>
          <TabList backgroundColor="black" style={{color:"white"}}>
            <Tab fontSize="2xl">
              <HStack>
                {/*<Image src={NFT} alt="nftToken" style={{width: 50, height: 50}}/>*/}
                <Box>{cu.addr === address ? "My" : "User"} NFTs</Box>
              </HStack>
              <Suspense fallback={null}>
                <AccountItemsCount address={address} />
              </Suspense>
            </Tab>
            <Tab fontSize="2xl">
              <HStack>
                {/*<Image src={marketpic} alt="Marketplace" style={{width: 50, height: 50}}/>*/}
                <Box>NFT Market</Box>
              </HStack>
              <Suspense fallback={null}>
                <MarketItemsCount />
              </Suspense>
            </Tab>
            <Tab fontSize="2xl">
              <HStack>
                {/*<Image src={create} alt="createnft" style={{width: 60, height: 50}}/>*/}
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
    </Base>


  ):(
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
          <HStack>   
            <Box fontSize="6xl" color="white" backgroundColor="black">
              What's For Sale in The Vault??
            </Box>
          </HStack>
          <Suspense fallback={null}>
            <MarketItemsCount />
          </Suspense>
        </Center>
        <br/>
        <Center>
          <Box fontSize="4xl" color="white" backgroundColor="black" maxW="lg">
            <MarketItemsCluster />
          </Box>
        </Center>
      </Box>
    </Base>
  )
}

