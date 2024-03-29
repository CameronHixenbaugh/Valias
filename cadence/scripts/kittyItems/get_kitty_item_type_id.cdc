import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Valias from "../../contracts/Valias.cdc"

// This script returns the metadata for an NFT in an account's collection.

pub fun main(address: Address, itemID: UInt64): UInt64 {

    // get the public account object for the token owner
    let owner = getAccount(address)

    let collectionBorrow = owner.getCapability(Valias.CollectionPublicPath)!
        .borrow<&{Valias.ValiasCollectionPublic}>()
        ?? panic("Could not borrow ValiasCollectionPublic")

    // borrow a reference to a specific NFT in the collection
    let valias = collectionBorrow.borrowValias(id: itemID)
        ?? panic("No such itemID in that collection")

    return valias.typeID
}
