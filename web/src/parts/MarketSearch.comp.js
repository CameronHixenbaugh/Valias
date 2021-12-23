import React, { useEffect, useState} from "react";
import axios from "axios";


export function MarketSearch(props) {
    let [search, setSearch] = useState("")
  
  useEffect(() => {
    const pKey = process.env.REACT_APP_PINATA_API_KEY;
    const PSKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;
    
    async function getSearch(){
    const userPinList = (pinataApiKey, pinataSecretApiKey, queryParams) => {
      let queryString = '?status=pinned';
      if (queryParams.hashContains) {
          queryString = queryString + `hashContains=${queryParams.hashContains}&`;
      }
      
      //Make sure keyvalues are properly formatted as described earlier in the docs.
      if (queryParams.keyvalues) {
          const stringKeyValues = JSON.stringify(queryParams.keyvalues);
          queryString = queryString + `metadata[keyvalues]=${stringKeyValues}`;
      }
      if (queryParams.keyvalues) {
        const stringKeyValues = JSON.stringify(queryParams.keyvalues);
        queryString = queryString + `metadata[keyvalues]=${stringKeyValues}`;
    }
      const url = `https://api.pinata.cloud/data/pinList${queryString}`;
  
      return axios
          .get(url, {
              headers: {
                  pinata_api_key: pinataApiKey,
                  pinata_secret_api_key: pinataSecretApiKey
              }
          })
          .then(function (response) {
              //handle response here
              let array = response.data
              let length = response.data.rows.length
              for(let x=0; x < length; x++){
                if (array.rows[x].ipfs_pin_hash === typeID) {
                    setSearch(response.data.rows[x].metadata.keyvalues.search)
        
                }
              }
            })
          .catch(function (error) {
              //handle error here
              alert(`Error: `, error)
          });
    };
    
  const hash2 = "Qm"
  
  userPinList(pKey, PSKey, hash2)
  }
  
  if (typeID) getSearch()
  },[typeID])
  
    return <Text>{search}</Text> 
  }