import React, { useEffect, useState, Suspense} from "react"
import {useAccountItem} from "../hooks/use-account-item.hook"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
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
      let importedIcon = await import(`./images/ValiasLogo.svg`)  //`../svg/Items/item0${typeID}.svg`)
      setItemImage(importedIcon.default)
    }
    if (typeID) getImage()
  }, [typeID])

  return <Image maxW="64px" src={item} />
}



export function AccountItemCluster( {address, id}) {
  var item = useAccountItem(address, id)
  const listing = useMarketItem(address, id)
  const [cu] = useCurrentUser()

  const BUSY = item.status !== IDLE || listing.status !== IDLE

  if (address == null) return null
  if (id == null) return null

  var imageurl = "https://ipfs.io/ipfs/" + item.typeID


  return (
    <Tr color="white">
      <Td maxW="50px">
        <Flex>
          <Text as={item.forSale && "del"}>#{item.itemID}</Text>
        </Flex>
      </Td>
      <Td>
        <Text>Sample</Text>
      </Td>
      <Td>
        <Text>Sample NFT</Text>
      </Td>
      <Td>
        <Text>20</Text>
      </Td>
      <Td>
        <img src={imageurl} alt="nft"/>
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


