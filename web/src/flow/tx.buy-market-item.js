import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {tx} from "./util/tx"
import {invariant} from "@onflow/util-invariant"

const CODE = fcl.cdc`
  import FungibleToken from 0xFungibleToken
  import NonFungibleToken from 0xNonFungibleToken
  import Vex from 0xKibble
  import Valias from 0xKittyItems
  import ValiasMarket from 0xKittyItemsMarket

  transaction(itemID: UInt64, marketCollectionAddress: Address) {
      let paymentVault: @FungibleToken.Vault
      let valiasMarketCollection: &Valias.Collection{NonFungibleToken.Receiver}
      let marketCollection: &ValiasMarket.Collection{ValiasMarket.CollectionPublic}

      prepare(acct: AuthAccount) {
          self.marketCollection = getAccount(marketCollectionAddress)
              .getCapability<&ValiasMarket.Collection{ValiasMarket.CollectionPublic}>(ValiasMarket.CollectionPublicPath)
              .borrow() ?? panic("Could not borrow market collection from market address")

          let price = self.marketCollection.borrowSaleItem(itemID: itemID)!.price

          let mainVexVault = acct.borrow<&Vex.Vault>(from: Vex.VaultStoragePath)
              ?? panic("Cannot borrow Vex vault from acct storage")
          self.paymentVault <- mainVexVault.withdraw(amount: price)

          self.valiasCollection = acct.borrow<&Valias.Collection{NonFungibleToken.Receiver}>(
              from: Valias.CollectionStoragePath
          ) ?? panic("Cannot borrow Valias collection receiver from acct")
      }

      execute {
          self.marketCollection.purchase(
              itemID: itemID,
              buyerCollection: self.valiasCollection,
              buyerPayment: <- self.paymentVault
          )
      }
  }
`

// prettier-ignore
export function buyMarketItem({itemID, ownerAddress}, opts = {}) {
  invariant(itemID != null, "buyMarketItem({itemID, ownerAddress}) -- itemID required")
  invariant(ownerAddress != null, "buyMarketItem({itemID, ownerAddress}) -- ownerAddress required")

  return tx([
    fcl.transaction(CODE),
    fcl.args([
      fcl.arg(Number(itemID), t.UInt64),
      fcl.arg(String(ownerAddress), t.Address),
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(1000),
  ], opts)
}
