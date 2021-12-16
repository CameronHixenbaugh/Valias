import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Valias from "../../contracts/Valias.cdc"

// This script returns the size of an account's Valias collection.

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let collectionRef = account.getCapability(Valias.CollectionPublicPath)!
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getIDs().length
}
