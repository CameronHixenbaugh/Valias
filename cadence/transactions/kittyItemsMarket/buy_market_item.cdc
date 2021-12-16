import FungibleToken from "../../contracts/FungibleToken.cdc"
import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Vex from "../../contracts/Vex.cdc"
import Valias from "../../contracts/Valias.cdc"
import ValiasMarket from "../../contracts/ValiasMarket.cdc"


transaction(itemID: UInt64, marketCollectionAddress: Address) {
    let paymentVault: @FungibleToken.Vault
    let valiasCollection: &Valias.Collection{NonFungibleToken.Receiver}
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
