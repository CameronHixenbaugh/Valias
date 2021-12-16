import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {tx} from "./util/tx"

const CODE = fcl.cdc`
  import FungibleToken from 0xFungibleToken
  import NonFungibleToken from 0xNonFungibleToken
  import Vex from 0xKibble
  import Valias from 0xKittyItems
  import ValiasMarket from 0xKittyItemsMarket

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
`

export function createSaleOffer({itemID, price}, opts = {}) {
  if (itemID == null)
    throw new Error("createSaleOffer(itemID, price) -- itemID required")
  if (price == null)
    throw new Error("createSaleOffer(itemID, price) -- price required")

  // prettier-ignore
  return tx([
    fcl.transaction(CODE),
    fcl.args([
      fcl.arg(Number(itemID), t.UInt64),
      fcl.arg(String(price), t.UFix64),
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([
      fcl.authz
    ]),
    fcl.limit(1000)
  ], opts)
}
