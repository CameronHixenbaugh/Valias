import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
  import FungibleToken from 0xFungibleToken
  import NonFungibleToken from 0xNonFungibleToken
  import Vex from 0xKibble
  import Valias from 0xKittyItems
  import ValiasMarket from 0xKittyItemsMarket

  pub fun hasVex(_ address: Address): Bool {
    let receiver: Bool = getAccount(address)
      .getCapability<&Vex.Vault{FungibleToken.Receiver}>(Vex.ReceiverPublicPath)
      .check()

    let balance: Bool = getAccount(address)
      .getCapability<&Vex.Vault{FungibleToken.Balance}>(Vex.BalancePublicPath)
      .check()

    return receiver && balance
  }

  pub fun hasValias(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&Valias.Collection{NonFungibleToken.CollectionPublic, Valias.ValiasCollectionPublic}>(Valias.CollectionPublicPath)
      .check()
  }

  pub fun hasValiasMarket(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&ValiasMarket.Collection{ValiasMarket.CollectionPublic}>(ValiasMarket.CollectionPublicPath)
      .check()
  }

  pub fun main(address: Address): {String: Bool} {
    let ret: {String: Bool} = {}
    ret["Kibble"] = hasVex(address)
    ret["KittyItems"] = hasValias(address)
    ret["KittyItemsMarket"] = hasValiasMarket(address)
    return ret
  }
`

export function isAccountInitialized(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
