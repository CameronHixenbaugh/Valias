import * as t from "@onflow/types";
import * as fcl from "@onflow/fcl";
import * as fs from "fs";
import * as path from "path";

import { SaleOffer } from "../models/sale-offer";
import { FlowService } from "../services/flow";
import { isNamedExports, isNamespaceExport } from "typescript";

const fungibleTokenPath = '"../../contracts/FungibleToken.cdc"';
const nonFungibleTokenPath = '"../../contracts/NonFungibleToken.cdc"';
const kibblePath = '"../../contracts/Vex.cdc"';
const kittyItemsPath = '"../../contracts/Valias.cdc"';
const kittyItemsMarkPath = '"../../contracts/ValiasMarket.cdc"';

class MarketService {
  constructor(
    private readonly flowService: FlowService,
    private readonly fungibleTokenAddress: string,
    private readonly kibbleAddress: string,
    private readonly nonFungibleTokenAddress: string,
    private readonly kittyItemsAddress: string,
    public readonly marketAddress: string
  ) {}

  setupAccount = () => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/transactions/kittyItemsMarket/setup_account.cdc`
        ),
        "utf8"
      )
      .replace(kittyItemsMarkPath, fcl.withPrefix(this.marketAddress));

    return this.flowService.sendTx({
      transaction,
      args: [],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  };

  getItem = (account: string, itemID: number) => {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/cadence/kittyItemsMarket/scripts/get_collection_ids.cdc`
        ),
        "utf8"
      )
      .replace(kittyItemsMarkPath, fcl.withPrefix(this.marketAddress));

    return this.flowService.executeScript<any[]>({
      script,
      args: [fcl.arg(account, t.Address), fcl.arg(itemID, t.UInt64)],
    });
  };

  getItems = (account: string) => {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/cadence/kittyItemsMarket/scripts/get_collection_ids.cdc`
        ),
        "utf8"
      )
      .replace(kittyItemsMarkPath, fcl.withPrefix(this.marketAddress));

    return this.flowService.executeScript<number[]>({
      script,
      args: [fcl.arg(account, t.Address)],
    });
  };

  buy = (account: string, itemID: number) => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/transactions/kittyItemsMarket/buy_market_item.cdc`
        ),
        "utf8"
      )
      .replace(fungibleTokenPath, fcl.withPrefix(this.fungibleTokenAddress))
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(kibblePath, fcl.withPrefix(this.kibbleAddress))
      .replace(kittyItemsPath, fcl.withPrefix(this.kittyItemsAddress))
      .replace(kittyItemsMarkPath, fcl.withPrefix(this.marketAddress));

    return this.flowService.sendTx({
      transaction,
      args: [fcl.arg(account, t.Address), fcl.arg(itemID, t.UInt64)],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  };

  sell = (itemID: number, price: number) => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../cadence/transactions/kittyItemsMarket/create_sale_offer.cdc`
        ),
        "utf8"
      )
      .replace(fungibleTokenPath, fcl.withPrefix(this.fungibleTokenAddress))
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(kibblePath, fcl.withPrefix(this.kibbleAddress))
      .replace(kittyItemsPath, fcl.withPrefix(this.kittyItemsAddress))
      .replace(kittyItemsMarkPath, fcl.withPrefix(this.marketAddress));

    return this.flowService.sendTx({
      transaction,
      args: [
        fcl.arg(itemID, t.UInt64),
        fcl.arg(price.toFixed(8).toString(), t.UFix64),
      ],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  };

  addSaleOffer = async (saleOfferEvent) => {
    return SaleOffer.transaction(async (tx) => {
      return await SaleOffer.query(tx)
        .insert({
          sale_item_id: saleOfferEvent.data.itemID,
          sale_item_type: saleOfferEvent.data.typeID,
          sale_item_owner: saleOfferEvent.data.owner,
          sale_price: saleOfferEvent.data.price,
          transaction_id: saleOfferEvent.transactionId,
        })
        // Don't throw an error if we're seeing the same event, just ignore it.
        // (Don't attempt to insert)
        .onConflict("sale_item_id")
        .ignore()
        .returning("transaction_id")
        .catch((e) => {
          console.log(e);
        });
    });
  };

  removeSaleOffer = (saleOfferEvent) => {
    return SaleOffer.transaction(async (tx) => {
      return await SaleOffer.query(tx)
        .where({
          sale_item_id: saleOfferEvent.data.itemID,
        })
        .del();
    });
  };

  findMostRecentSales = () => {
    return SaleOffer.transaction(async (tx) => {
      const offers = await SaleOffer.query(tx).select("*");
      return offers;
    });
  };
}

export { MarketService };
