import {Suspense} from "react"
import { useAccountItems} from "../hooks/use-account-items.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import Item from "./account-item-cluster.comp"
import {Box, Table, Thead, Tbody, Tr, Th, Text, Spinner} from "@chakra-ui/react"
//import { IpfsMetadata } from "./create-nft-cluster.comp"
/*
const itemCid = new Map();
var Dict; 
var hash;
var count;
var cidID;

export function CidDict(cid){
  hash = cid
}
*/

export function AccountItemsCluster({address}) {
  const items = useAccountItems(address)
  const [cu] = useCurrentUser()

/*
  Dict = () => {
    var nftLen = items.ids.length
    count = items.ids[nftLen]
    
    //itemCid[count] = hash
    itemCid.set(count, hash)

    alert(`ID is ${count} and the hash is ${itemCid.get(count)}`)

    cidID = count;
    IpfsMetadata(hash, cidID)
  }
  */
  

  if (address == null) return null

  if (items.ids.length <= 0)
    return (
      <Box borderWidth="1px" borderRadius="lg" p="4">
        <Text>No Items</Text>
      </Box>
    )

  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th textAlign="center">Id</Th>
            <Th textAlign="center">Name</Th>
            {/*<Th>Description</Th>*/}
            {/*<Th>Price</Th>*/}
            <Th textAlign="center">Image</Th>
            {cu.addr === address && <Th />}
          </Tr>
        </Thead>
        <Tbody>
          {items.ids.map(id => (
            <Item key={id} id={id} address={address} />
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default function WrappedAccountItemsCluster({address}) {
  return (
    <Suspense
      fallback={
        <Box borderWidth="1px" borderRadius="lg" p="4">
          <Spinner />
        </Box>
      }
    >
      <AccountItemsCluster address={address} />
    </Suspense>
  )
}

//export { Dict, itemCid, cidID};
