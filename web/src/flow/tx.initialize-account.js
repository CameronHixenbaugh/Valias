// prettier-ignore
import {transaction, limit, proposer, payer, authorizations, authz, cdc} from "@onflow/fcl"
import {invariant} from "@onflow/util-invariant"
import {tx} from "./util/tx"

const CODE = cdc`
  import FungibleToken from 0xFungibleToken
  import NonFungibleToken from 0xNonFungibleToken
  import Vex from 0xKibble
  import Valias from 0xKittyItems
  import ValiasMarket from 0xKittyItemsMarket

  pub fun hasVex(_ address: Address): Bool {
    let receiver = getAccount(address)
      .getCapability<&Vex.Vault{FungibleToken.Receiver}>(Vex.ReceiverPublicPath)
      .check()

    let balance = getAccount(address)
      .getCapability<&Vex.Vault{FungibleToken.Balance}>(Vex.BalancePublicPath)
      .check()

    return receiver && balance
  }

  pub fun hasItems(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&Valias.Collection{NonFungibleToken.CollectionPublic, Valias.ValiasCollectionPublic}>(Valias.CollectionPublicPath)
      .check()
  }

  pub fun hasMarket(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&ValiasMarket.Collection{ValiasMarket.CollectionPublic}>(ValiasMarket.CollectionPublicPath)
      .check()
  }

  transaction {
    prepare(acct: AuthAccount) {
      if !hasVex(acct.address) {
        if acct.borrow<&Vex.Vault>(from: Vex.VaultStoragePath) == nil {
          acct.save(<-Vex.createEmptyVault(), to: Vex.VaultStoragePath)
        }
        acct.unlink(Vex.ReceiverPublicPath)
        acct.unlink(Vex.BalancePublicPath)
        acct.link<&Vex.Vault{FungibleToken.Receiver}>(Vex.ReceiverPublicPath, target: Vex.VaultStoragePath)
        acct.link<&Vex.Vault{FungibleToken.Balance}>(Vex.BalancePublicPath, target: Vex.VaultStoragePath)
      }

      if !hasItems(acct.address) {
        if acct.borrow<&Valias.Collection>(from: Valias.CollectionStoragePath) == nil {
          acct.save(<-Valias.createEmptyCollection(), to: Valias.CollectionStoragePath)
        }
        acct.unlink(Valias.CollectionPublicPath)
        acct.link<&Valias.Collection{NonFungibleToken.CollectionPublic, Valias.ValiasCollectionPublic}>(Valias.CollectionPublicPath, target: Valias.CollectionStoragePath)
      }

      if !hasMarket(acct.address) {
        if acct.borrow<&ValiasMarket.Collection>(from: ValiasMarket.CollectionStoragePath) == nil {
          acct.save(<-ValiasMarket.createEmptyCollection(), to: ValiasMarket.CollectionStoragePath)
        }
        acct.unlink(ValiasMarket.CollectionPublicPath)
        acct.link<&ValiasMarket.Collection{ValiasMarket.CollectionPublic}>(ValiasMarket.CollectionPublicPath, target:ValiasMarket.CollectionStoragePath)
      }
    }
  }
`

export async function initializeAccount(address, opts = {}) {
  // prettier-ignore
  invariant(address != null, "Tried to initialize an account but no address was supplied")

  return tx(
    [
      transaction(CODE),
      limit(70),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
    ],
    opts
  )
}
