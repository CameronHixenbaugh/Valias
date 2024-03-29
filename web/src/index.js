import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import {Switch, Route} from "react-router-dom"

import {Providers} from "./global/providers.comp"

import {Page as Root} from "./pages/root.page"
import {CreatePage} from "./pages/routepages/create.page.jsx"
import {Newnft} from "./pages/routepages/newNFT.page.jsx"
import {Aboutpage} from "./pages/routepages/about.page.jsx"
import {Market} from "./pages/routepages/Market.page"
import {MyNFTs} from "./pages/routepages/MyNFTs.page"
import {Page as Account} from "./pages/account"
import {Page as NotFound} from "./pages/not-found.page"
import { HowPage } from "./pages/routepages/HowPage.page"

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

import "./global/config"

import "./font.css"
import "./index.css"

window.fcl = fcl
window.t = t


ReactDOM.render(
    <Providers>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route exact path="/0x:address/create" component={CreatePage} />
        <Route exact path="/0x:address/congrats" component={Newnft} />
        <Route exact path="/market" component={Market} />
        <Route exact path="/0x:address/myNFTs" component={MyNFTs} />
        <Route exact path="/about" component={Aboutpage} />
        <Route exact path="/how" component={HowPage} />
        <Route exact path="/0x:address" component={Account} />
        <Route component={NotFound} />
      </Switch>
    </Providers>,
  document.getElementById("root")
)

reportWebVitals()



