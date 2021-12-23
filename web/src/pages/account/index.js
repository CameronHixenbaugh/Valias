import React, {Suspense} from "react"
//import { Redirect} from "react-router-dom"
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
import Navbar from "../../parts/navbar.comp"
import Foot from "../../parts/footer.comp"
import Carousel from "./../../parts/carousel/ChakraCarousel.jsx";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Center,
  Tag,
  Spinner
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
        "You need to initialize your account before you can receive Vex.",
    },
    noKibble: {
      type: "info",
      title: "Get Vex",
      text: "You need Vex to buy NFTs.",
    },
  }

  function Banner(message) {
    return (
      <Flex my="4" color="white">
        <Alert status={message.type} style={{
        border: "2px solid #BEE3F8",
        boxSizing: "border-box",
        boxShadow: "inset 0px 4px 4px #E2E8F0",
        filter: "drop-shadow(0px 4px 4px #C4C4C4)",
        borderRadius: "6px",
        fontFamily: "Sora",
        fontStyle: "normal",
        fontWeight: "bolder",
        fontSize: "16px",
        lineHeight: "24px",
        color: "rgba(226, 232, 240, 0.92)",
        textShadow: "0px 4px 4px rgba(196, 196, 196, 0.0989583)",
        backgroundColor: "black"}}>
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

return /*loggedIn ?*/(
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
        <Suspense fallback={null} >
          <InfoBanner address={address} />
        </Suspense>
        </Center>
        <Center>
        <Flex>
          <Box p="5"
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
            <InitCluster address={address} />
          </Box>
          <Box ml="4" p="5"
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
            <BalanceCluster address={address} />
          </Box>

        </Flex>
        </Center>
        </Box>
      <Box backgroundColor="black" p="7">
        <h2 style={{
          color:"#E2E8F0", 
          textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)",
          fontWeight: "bolder",
          textAlign: "center"}}><u>User Collections</u></h2>
        <Carousel />
      </Box>
      <Box backgroundColor="black" p="7">
        <h2 style={{
          color:"#E2E8F0", 
          textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)",
          fontWeight: "bolder",
          textAlign: "center"}}><u>Top NFTs For Sale</u></h2>
        <Carousel />
      </Box>
      <footer>
        <Foot />
      </footer>
    </Base>
  );
}

