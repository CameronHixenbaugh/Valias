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
/*var corsOptions = {
  origin: 'http://localhost:3001'
  //origin: 'https://vaultv2.herokuapp.com/'
};
app.use(cors(corsOptions));*/
//var whitelist = ['https://vaultv2.herokuapp.com/', 'http://www.valias.io', 'http://localhost:3001']//, 'young-rambutan-ww9d29k0amurnhj2rnj2pgkw.herokudns.com', 'valias.io']
//var workCors = function(corsOptions){
  var whitelist = ['https://vaultv2.herokuapp.com/', 'http://www.valias.io']//, 'http://localhost:3001']//, 'young-rambutan-ww9d29k0amurnhj2rnj2pgkw.herokudns.com', 'valias.io']
  var corsOptions = {
    origin: function(origin, callback){
      if(whitelist.indexOf(origin) !== -1){
        callback(null, true)
      } else {
        callback(new Error('Not Allowed by CORS!'))
      }
    }
    //methods: 'GET,PUT,POST,DELETE,HEAD,OPTIONS'
  }
  app.use(cors(corsOptions))

  app.get('*', (req, res, next) =>{
  //return function(req, res, next){
    //if(req.method==='OPTIONS'){
      res.header('Access-Control-Allow-Origin', "*");
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      //res.send();
    //}else{
      next();
    })
 // }
//}

  //app.use(cors(corsOptions))


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

  /*function isString(s) {
    return typeof s === 'string' || s instanceof String;
  }
  var whitelist = ['https://vaultv2.herokuapp.com/', 'http://www.valias.io/', 'http://localhost:3001']
  var corsOptions = {
    origin: function(origin, callback){
      if(whitelist.indexOf(origin) !== -1 || !origin){
        callback(null, true)
      } else {
        callback(new Error('Not Allowed by CORS!'))
      }
    }
  }*/
  

  const serveReactApp = () => {
    app.use(express.static(path.resolve(__dirname, "../../web/build")));
    //app.use(cors())
    //app.get('/', (req, res, next) => {
      //const origin = req.headers.origin;

      /*if(isString(req.headers.origin)){
          const origin = req.headers.origin;
        if (whitelist.indexOf(origin) !== -1 || !origin) {
           res.setHeader('Access-Control-Allow-Origin', origin);
        }else{
           !!whitelist
        }
      }
      
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.json({msg: 'bitchesss'})
      return next();
    });*/

    app.get("*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "../../web/build/index.html"));
      res.cookie('_ga', '.paypal.com/',{sameSite:'none', secure: true});
    });

    /*var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
        res.send(201);
      }
      else {
        next();
      }
  };
  app.use(allowCrossDomain);*/

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