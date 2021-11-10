#!/bin/bash

# Build the apps, don't attempt to build fcl-dev-wallet. 

tsnd install --ignore=fcl-dev-wallet 
tsnd run build --ignore=fcl-dev-wallet
 