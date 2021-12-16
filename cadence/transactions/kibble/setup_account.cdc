import FungibleToken from "../../contracts/FungibleToken.cdc"
import Vex from "../../contracts/Vex.cdc"

// This transaction is a template for a transaction
// to add a Vault resource to their account
// so that they can use the Vex

transaction {

    prepare(signer: AuthAccount) {

        if signer.borrow<&Vex.Vault>(from: Vex.VaultStoragePath) == nil {
            // Create a new Vex Vault and put it in storage
            signer.save(<-Vex.createEmptyVault(), to: Vex.VaultStoragePath)

            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&Vex.Vault{FungibleToken.Receiver}>(
                Vex.ReceiverPublicPath,
                target: Vex.VaultStoragePath
            )

            // Create a public capability to the Vault that only exposes
            // the balance field through the Balance interface
            signer.link<&Vex.Vault{FungibleToken.Balance}>(
                Vex.BalancePublicPath,
                target: Vex.VaultStoragePath
            )
        }
    }
}
