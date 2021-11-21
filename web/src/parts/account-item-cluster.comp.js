import React, { useEffect, useState, Suspense} from "react"
import {useAccountItem} from "../hooks/use-account-item.hook"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
import axios from "axios"
import PriceModal from './PriceModal.js'
import {
  Tr,
  Td,
  Button,
  Spinner,
  Flex,
  Center,
  Text,
  HStack,
} from "@chakra-ui/react"

export const Des = ({typeID}, num) => {
  let [description, setDescription] = useState("")

useEffect(() => {
  const pKey = process.env.REACT_APP_PINATA_API_KEY;
  const PSKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;
  
  async function getDes(){
  const userPinList = (pinataApiKey, pinataSecretApiKey, queryParams) => {
    let queryString = '?status=pinned';
    if (queryParams.hashContains) {
        queryString = queryString + `hashContains=${queryParams.hashContains}&`;
    }
    
    //Make sure keyvalues are properly formatted as described earlier in the docs.
    if (queryParams.keyvalues) {
        const stringKeyValues = JSON.stringify(queryParams.keyvalues);
        queryString = queryString + `metadata[keyvalues]=${stringKeyValues}`;
    }
    if (queryParams.keyvalues) {
      const stringKeyValues = JSON.stringify(queryParams.keyvalues);
      queryString = queryString + `metadata[keyvalues]=${stringKeyValues}`;
  }
    const url = `https://api.pinata.cloud/data/pinList${queryString}`;

    return axios
        .get(url, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            //handle response here
            let array = response.data
            let length = response.data.rows.length
            for(let x=0; x < length; x++){
              if (array.rows[x].ipfs_pin_hash === typeID) {
                setDescription(response.data.rows[x].metadata.keyvalues.Description)
      
              }
            }
          })
        .catch(function (error) {
            //handle error here
        });
  };
  
const hash2 = "Qm"

userPinList(pKey, PSKey, hash2)
}

if (typeID) getDes()
},[typeID])

  return <Text>{description}</Text> 
}

export const Name = ({typeID}, num) => {
  let [name1, setName1] = useState("")

useEffect(() => {
  const pKey = process.env.REACT_APP_PINATA_API_KEY;
  const PSKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;
  
  async function getName(){
  const userPinList = (pinataApiKey, pinataSecretApiKey, queryParams) => {
    let queryString = '?status=pinned';
    if (queryParams.hashContains) {
        queryString = queryString + `hashContains=${queryParams.hashContains}&`;
    }
    
    //Make sure keyvalues are properly formatted as described earlier in the docs.
    if (queryParams.keyvalues) {
        const stringKeyValues = JSON.stringify(queryParams.keyvalues);
        queryString = queryString + `metadata[keyvalues]=${stringKeyValues}`;
    }
    if (queryParams.keyvalues) {
      const stringKeyValues = JSON.stringify(queryParams.keyvalues);
      queryString = queryString + `metadata[keyvalues]=${stringKeyValues}`;
  }
    const url = `https://api.pinata.cloud/data/pinList${queryString}`;

    return axios
        .get(url, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            //handle response here
            let array = response.data
            let length = response.data.rows.length
            for(let x=0; x < length; x++){
              if (array.rows[x].ipfs_pin_hash === typeID) {
                setName1(response.data.rows[x].metadata.name)
      
              }
            }
          })
        .catch(function (error) {
            //handle error here
        });
  };
  
const hash2 = "Qm"

userPinList(pKey, PSKey, hash2)
}

if (typeID) getName()
},[typeID])

  return <Text>{name1}</Text> 
}
  

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
          <Name typeID={item.typeID}/>
      </Td>
      <Td>
        <Des typeID={item.typeID} />
      </Td>
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


