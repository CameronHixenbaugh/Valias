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

const corsOptions = {
  origin: ['[http://valias.io,', 'http://vaultv2.herokuapp.com/']//, 'http://localhost:3001']
};
app.use(cors(corsOptions));
// CORS controls from the security blog post
app.all('/*', (req, res, next) => {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict all access to the required domains
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


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

const V1 = "/v1/";

// Init all routes, setup middlewares and dependencies
const initApp = (
  kibblesService: KibblesService,
  kittyItemsService: KittyItemsService,
  marketService: MarketService
) => {
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(V1, initKibblesRouter(kibblesService));
  app.use(V1, initKittyItemsRouter(kittyItemsService));
  app.use(V1, initMarketRouter(marketService));
  

  const serveReactApp = () => {
    app.use(express.static(path.resolve(__dirname, "../../web/build")));

    app.get("*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "../../web/build/index.html"));
      res.cookie('_ga', '.paypal.com/',{sameSite:'none', secure: true});
    });

  };



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