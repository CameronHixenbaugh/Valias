#!/bin/bash

# Build the apps, don't attempt to build fcl-dev-wallet. 

npm install --ignore=fcl-dev-wallet 
npm run build --ignore=fcl-dev-wallet
 