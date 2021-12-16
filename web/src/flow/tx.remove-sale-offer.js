import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {tx} from "./util/tx"
import {invariant} from "@onflow/util-invariant"

const CODE = fcl.cdc`
  import ValiasMarket from 0xKittyItemsMarket

transaction(itemID: UInt64) {
    let marketCollection: &ValiasMarket.Collection

    prepare(signer: AuthAccount) {
        self.marketCollection = signer.borrow<&ValiasMarket.Collection>(from: ValiasMarket.CollectionStoragePath)
            ?? panic("Missing or mis-typed ValiasMarket Collection")
    }

    execute {
        let offer <-self.marketCollection.remove(itemID: itemID)
        destroy offer
    }
}`

// prettier-ignore
export function cancelMarketListing({ itemID }, opts = {}) {
  invariant(itemID != null, "cancelMarketListing({itemID}) -- itemID required")

  return tx([
    fcl.transaction(CODE),
    fcl.args([
      fcl.arg(Number(itemID), t.UInt64),
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(1000),
  ], opts)
}
