import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Valias from "../../contracts/Valias.cdc"

// This transaction configures an account to hold Valias Items.

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&Valias.Collection>(from: Valias.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- Valias.createEmptyCollection()
            
            // save it to the account
            signer.save(<-collection, to: Valias.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&Valias.Collection{NonFungibleToken.CollectionPublic, Valias.ValiasCollectionPublic}>(Valias.CollectionPublicPath, target: Valias.CollectionStoragePath)
        }
    }
}
