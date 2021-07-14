import "express-async-errors";

import path from "path";

import express, { Request, Response } from "express";

import cors from "cors";

import { json, urlencoded } from "body-parser";

import initKibblesRouter from "./routes/kibbles";
import initKittyItemsRouter from "./routes/kitty-items";
import initMarketRouter from "./routes/market";
import { KibblesService } from "./services/kibbles";
import { KittyItemsService } from "./services/kitty-items";
import { MarketService } from "./services/market";

//WebSocketServer
//import WebSocket from "ws";
//import http from "http";


const V1 = "/v1/";

// Init all routes, setup middlewares and dependencies
const initApp = (
  kibblesService: KibblesService,
  kittyItemsService: KittyItemsService,
  marketService: MarketService
) => {
  const app = express();
//{origin:['https://vaultv2.herokuapp.com/']}
  // @ts-ignore
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(V1, initKibblesRouter(kibblesService));
  app.use(V1, initKittyItemsRouter(kittyItemsService));
  app.use(V1, initMarketRouter(marketService));

  const serveReactApp = () => {
    app.use(express.static(path.resolve(__dirname, "../../web/public")));
    console.log("hey bro im here")
    app.get("*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "../../web/public/index.html"));
    });
  };

  //Test WebSocketServer
/*
  var app2 = express()
  app.use(express.static(path.resolve(__dirname, "../../web/build")))
  var port = process.env.PORT || 5000
  var server = http.createServer(app2)
  server.listen(port)

  console.log("http server listening on %d", port)
  var wss = new WebSocket.Server({server: server})
  console.log("websocket server created")

  wss.on("connection", function(ws) {
    var id = setInterval(function() {
      ws.send(JSON.stringify(new Date()), function() {  })
    }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})

*/


  if (process.env.IS_HEROKU) {
    // Serve React static site using Express when deployed to Heroku.
    serveReactApp();
  }

  app.all("*", async (req: Request, res: Response) => {
    return res.sendStatus(404);
  });

  return app;
};

export default initApp;
