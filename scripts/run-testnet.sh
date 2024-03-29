#!/bin/bash

export CHAIN_ENV=testnet 

export FUNGIBLE_TOKEN_ADDRESS=0x9a0766d93b6608b7
export NON_FUNGIBLE_TOKEN_ADDRESS=0x631e88ae7f1d7c20

export API_URL=http://127.0.0.1:3000
export ACCESS_API=https://access-testnet.onflow.org
export WALLET_DISCOVERY=https://fcl-discovery.onflow.org/testnet/authn

npx lerna run testnet --parallel
