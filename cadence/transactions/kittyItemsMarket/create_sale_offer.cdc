import FungibleToken from "../../contracts/FungibleToken.cdc"
import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Vex from "../../contracts/Vex.cdc"
import Valias from "../../contracts/Valias.cdc"
import ValiasMarket from "../../contracts/ValiasMarket.cdc"

transaction(itemID: UInt64, price: UFix64) {
    let vexVault: Capability<&Vex.Vault{FungibleToken.Receiver}>
    let valiasCollection: Capability<&Valias.Collection{NonFungibleToken.Provider, Valias.ValiasCollectionPublic}>
    let marketCollection: &ValiasMarket.Collection

    prepare(signer: AuthAccount) {
        // we need a provider capability, but one is not provided by default so we create one.
        let ValiasCollectionProviderPrivatePath = /private/valiasCollectionProvider

        self.vexVault = signer.getCapability<&Vex.Vault{FungibleToken.Receiver}>(Vex.ReceiverPublicPath)!
        assert(self.vexVault.borrow() != nil, message: "Missing or mis-typed Vex receiver")

        if !signer.getCapability<&Valias.Collection{NonFungibleToken.Provider, Valias.ValiasCollectionPublic}>(ValiasCollectionProviderPrivatePath)!.check() {
            signer.link<&Valias.Collection{NonFungibleToken.Provider, Valias.ValiasCollectionPublic}>(ValiasCollectionProviderPrivatePath, target: Valias.CollectionStoragePath)
        }

        self.valiasCollection = signer.getCapability<&Valias.Collection{NonFungibleToken.Provider, Valias.ValiasCollectionPublic}>(ValiasCollectionProviderPrivatePath)!
        assert(self.valiasCollection.borrow() != nil, message: "Missing or mis-typed ValiasCollection provider")

        self.marketCollection = signer.borrow<&ValiasMarket.Collection>(from: ValiasMarket.CollectionStoragePath)
            ?? panic("Missing or mis-typed ValiasMarket Collection")
    }

    execute {
        let offer <- ValiasMarket.createSaleOffer (
            sellerItemProvider: self.valiasCollection,
            itemID: itemID,
            typeID: self.valiasCollection.borrow()!.borrowValias(id: itemID)!.typeID,
            sellerPaymentReceiver: self.vexVault,
            price: price
        )
        self.marketCollection.insert(offer: <-offer)
    }
}
