import ValiasMarket from "../../contracts/ValiasMarket.cdc"

// This transaction configures an account to hold SaleOffer items.

transaction {
    prepare(signer: AuthAccount) {

        // if the account doesn't already have a collection
        if signer.borrow<&ValiasMarket.Collection>(from: ValiasMarket.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- ValiasMarket.createEmptyCollection() as! @ValiasMarket.Collection
            
            // save it to the account
            signer.save(<-collection, to: ValiasMarket.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&ValiasMarket.Collection{ValiasMarket.CollectionPublic}>(ValiasMarket.CollectionPublicPath, target: ValiasMarket.CollectionStoragePath)
        }
    }
}
