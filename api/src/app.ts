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
import { getConfig } from "./config";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;
const LOCAL = argv.dev;

let envVars;

if (LOCAL) {
  const env = require("dotenv");
  const expandEnv = require("dotenv-expand");

  const config = env.config({
    path: ".env.local",
  });

  expandEnv(config);
  envVars = config.parsed;
} 


//IPFS file upload
const app = express();
import multer from 'multer';
app.use(cors());
import fs from 'fs'; 
import pinataSDK from '@pinata/sdk';

 
const config = getConfig(envVars) 
var pinataKey = config.pinataApiKey;
var pinataSecretKey = config.pinataSecretApiKey;


//Pinata API Keys
const pinata = pinataSDK( pinataKey, 
  pinataSecretKey);

var pinName

//Delete uploaded file from local directory
function DeleteFile( delFile){
  
  let resultHandler = function (err) {
    if (err) {
        console.log("unlink failed", err);
    } else {
        console.log("file deleted");
    }
}

fs.unlink(delFile, resultHandler);  
};

//Pin file to IPFS
var ipfsCid;



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('src/tmpIpfs'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
      pinName = file.originalname;
    }
  })
  
  var upload = multer({ storage: storage }).array('file')
  
app.get('/',function(req,res){
    return res.send('Hello Server')
})

app.post('/upload',function(req, res) {
    
    upload(req, res, function (err) {
        
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        } 
        IPFSFile(pinName) 
        function IPFSFile(Filex){
          var fileString = path.resolve('src/tmpIpfs')+ '/' + Filex
          const readableStreamForFile = fs.createReadStream(fileString);
        
          pinata.pinFileToIPFS(readableStreamForFile).then((result) => {
            //handle results here
            DeleteFile(fileString)
            ipfsCid = result.IpfsHash
            return res.status(200).send(ipfsCid)
        
        }).catch((err) => {
            //handle error here
            console.log(err);
        });
        }

        
        // Everything went fine.
      })
});

app.listen(8000, function() {
    console.log('App running on port 8000');
});






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
    app.use(express.static(path.resolve(__dirname, "../../web/build")));

    app.get("*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "../../web/build/index.html"));
    });
  };

  //WebSocketServer
/*
  var app2 = express()
  app.use(express.static(path.resolve(__dirname, "../../web/build")))
  var port = process.env.PORT || 5000
  port = Number(port) + 1 ;
  var server = http.createServer(app)
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
