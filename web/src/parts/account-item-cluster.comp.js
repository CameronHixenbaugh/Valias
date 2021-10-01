import React, { useEffect, useState, Suspense} from "react"
import {useAccountItem} from "../hooks/use-account-item.hook"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
//import pinataSDK from '@pinata/sdk';
import PriceModal from './PriceModal.js'
import {
  Tr,
  Td,
  Button,
  Spinner,
  Flex,
  Center,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react"

 
export const ItemImage = ({typeID}) => {
  let [item, setItemImage] = useState("")

  useEffect(() => {
    async function getImage() {
      let importedIcon = await import ('./kitty-items-banner.png') //(`./images/ValiasLogo.svg`)  //`../svg/Items/item0${typeID}.svg`)
      setItemImage(importedIcon.default)
    }
    if (typeID) getImage()
  }, [typeID])

  return <Image maxW="64px" src={item} />
}
/*
function nftName(hash){
  const pKey = process.env.REACT_APP_PINATA_API_KEY;
  const pSKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;
  const pinata = pinataSDK( pKey, pSKey);


}
*/


export function AccountItemCluster( {address, id}) {
  var item = useAccountItem(address, id)
  const listing = useMarketItem(address, id)
  const [cu] = useCurrentUser()

  const BUSY = item.status !== IDLE || listing.status !== IDLE
  var imageurl

  if (address == null) return null
  if (id == null) return null

  if (item.itemID === 0){
    imageurl = "https://ipfs.io/ipfs/QmaCaM6X1gdAYnCpJrEdQRG6EEXUJHSu733iXDi1F1M5fP"
  } else
    imageurl = "https://ipfs.io/ipfs/" + item.typeID


  return (
    <Tr color="white">
      <Td maxW="50px">
        <Flex>
          <Text textAlign="center" as={item.forSale && "del"}>#{item.itemID}</Text>
        </Flex>
      </Td>
      <Td textAlign="center">
        <Text>Sample</Text>
      </Td>
      {/*<Td>
        <Text>Sample NFT</Text>
      </Td>
      <Td>
        <Text>20</Text>
      </Td>*/}
      <Td>
        <Center>
          <img width="175px"  src={imageurl} alt="nft"/>
        </Center>
      </Td>
      {cu.addr === address && (
        <>
          {!item.forSale ? (
            <Td isNumeric>
              
              <PriceModal sellNFT={item.itemID} />

            </Td>
            

          ) : (
            <Td isNumeric>
              <Button
                size="sm"
                colorScheme="orange"
                disabled={BUSY}
                onClick={listing.cancelListing}
              >
                <HStack>
                  {BUSY && <Spinner mr="2" size="xs" />} <Text>Unlist</Text>
                </HStack>
              </Button>
            </Td>
          )}
        </>
      )}
    </Tr>
  )
}
export default function WrappedAccountItemCluster(props) {
  return (
    <Suspense
      fallback={
        <Tr>
          <Td>
            <Flex>
              <Text>#{props.id}</Text>
              <Center ml="4">
                <Spinner size="xs" />
              </Center>
            </Flex>
          </Td>
          <Td />
          <Td />
          <Td />
        </Tr>
      }
    >
      <AccountItemCluster {...props} />
    </Suspense>
  )
}


