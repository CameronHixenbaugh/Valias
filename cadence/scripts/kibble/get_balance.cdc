import Vex from "../../contracts/Vex.cdc"
import FungibleToken from "../../contracts/FungibleToken.cdc"

// This script returns an account's Vex balance.

pub fun main(address: Address): UFix64 {
    let account = getAccount(address)
    
    let vaultRef = account.getCapability(Vex.BalancePublicPath)!.borrow<&Vex.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}
