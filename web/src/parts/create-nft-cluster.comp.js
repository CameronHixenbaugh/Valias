import React, {useState} from "react"
import { useHistory } from "react-router-dom"
import { Base } from "./base.comp"
import { Button, Center} from "@chakra-ui/react"
import { useAccountItems} from "../hooks/use-account-items.hook"
import {IDLE} from "../global/constants"
import {useAddress} from "../hooks/use-url-address.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook.js"
import IpfsUpload from './ipfsUpload.comp'
import { buildNFT } from "../pages/routepages/newNFT.page"

import pinataSDK from '@pinata/sdk';
import {hash} from './ipfsUpload.comp'

const pKey = process.env.REACT_APP_PINATA_API_KEY;
const pSKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;
const pinata = pinataSDK( pKey, pSKey);

var name;
var des;
var price;
var auction;
var p3;

export function IpfsMetadata(cid){
  const metadata = {
      name: String(name),
      keyvalues: {
          Description: String(des),
          Price: String(price),
          AuctionLength: String(auction),
          ImmediatePrice : String(p3) 
      }
  };
  pinata.hashMetadata(cid, metadata).then((result) => {
      //handle results here
      console.log(result);
  }).catch((err) => {
      //handle error here
      console.log(err);
  });
}

export function CreateNFTCluster(){ 
    
  
    const [title1, setTitle1] = useState('');
    const [description, setDescription] = useState('');
    const [price1, setPrice1] = useState('');
    const [price2, setPrice2] = useState('');
    const [price3, setPrice3] = useState('');
    const [length, setLength] = useState('');
    const [showHide1, setShowHide1] = useState(false);
    const [showHide2, setShowHide2] = useState(false);
    const [showHide3, setShowHide3] = useState(false);

    const history = useHistory()
    const [cu] = useCurrentUser()
    const address = useAddress()
    const items = useAccountItems(address)
    if (address == null) return <div>Not Found</div> 

    
  
  // Form submitting logic, prevent default page refresh 
  const handleSubmit = (event) =>{


    if(cu.addr === address){
      console.log("good")
    }else{
      alert(`Must be logged on to your account`)
    }

    if(title1===''){
      alert(`
        You must enter a Name for the NFT.
      `)
    }
    if(description===''){
      alert(`
        You must enter a Description for the NFT.
      `)
    }
    if(price1===null && showHide1===false && showHide2===false){
      alert(`
        You must enter a Price for the NFT.
      `)
    }
    if(price1===null && showHide1===true){
      alert(`
        You must enter a Fixed Price for the NFT.
      `)
    }
    if(price2==='' && showHide2===true){
      alert(`
        You must enter a Starting Bid Price for the NFT.
      `)
    }
    if(length==='' && showHide2===true){
      alert(`
        You must enter a Auction Length for the NFT.
      `)
    }
    if(title1!=='' && description!=='' && price1!==null && showHide1===true){
      alert(`
        ____Your NFT____\n
        Name : ${title1}
        Description : ${description}
        Price : ${price1}
      `)
      name = title1
      des = description
      price = price1
      IpfsMetadata(hash)
      items.mint()
      buildNFT(name, des, price, null, null, hash)
      history.push("/"+cu.addr+"/congrats")
      event.preventDefault();
    }
    if(title1!=='' && description!=='' && price2!=='' && length!=='' && showHide2===true && price3===''){
      alert(`
        ____Your NFT____\n
        Name : ${title1}
        Description : ${description}
        Starting Bid : ${price2}
        Auction Length : ${length}
      `)
      name = title1
      des = description
      price = price2
      auction = length
      IpfsMetadata(hash)
      //items.mint()
      buildNFT(name, des, price, auction, null, hash)
      history.push("/"+cu.addr+"/congrats")
      event.preventDefault();
    }
    else if(title1!=='' && description!=='' && price2!=='' && length!=='' && showHide2===true && price3!==''){
      alert(`
        ____Your NFT____\n
        Name : ${title1}
        Description : ${description}
        Starting Bid : ${price2}
        Immediate Buy Price : ${price3}
        Auction Length : ${length}
      `)
      name = title1
      des = description
      price = price2
      p3 = price3
      auction = length
      IpfsMetadata(hash)
      //items.mint()
      buildNFT(name, des, price, auction, p3, hash)
      history.push("/"+cu.addr+"/congrats")
      event.preventDefault();
    }
  }

  const showHide = (title1) => {
    switch (title1) {
      case "showHide1":
        setShowHide1(!showHide1);
        if(showHide2 === true){
          setShowHide2(false)
        };
        break;
      case "showHide2":
        setShowHide2(!showHide2);
        if(showHide1 === true){
          setShowHide1(false)
        };
        break;
        default:
          setShowHide1(false);
          setShowHide2(false);
        break;
    }
  }


  // Method causes to store all the values of the 
  // input field in react state single method handle 
  // input changes of all the input field using ES6 
  // javascript feature computed property names
  const handletitle1Change = (event) => {
      // Computed property names
      // keys of the objects are computed dynamically
      
      setTitle1(event.target.value);
      /*const title1 = event.target.value;
        setState({
          title1: event.target.value
        });*/
      }

  const handleDescChange = (event) => {
      // Computed property names
      // keys of the objects are computed dynamically
      setDescription(event.target.value);
      /*const description = event.target.value;
        setState({
          description: description
        });*/
      
  }

  const handleprice1Change = (event) => {
    // Computed property names
    // keys of the objects are computed dynamically
    setPrice1(event.target.value);
    /*const price1 = event.target.value;
      setState({
        price1: price1
      });*/
    
}

const handleprice2Change = (event) => {
  // Computed property names
  // keys of the objects are computed dynamically
  setPrice2(event.target.value);
  /*const price2 = event.target.value;
    setState({
      price2: price2
    });*/
  
}

const handleprice3Change = (event) => {
  // Computed property names
  // keys of the objects are computed dynamically
  setPrice3(event.target.value);
  /*const price3 = event.target.value;
    setState({
      price3: price3
    });*/
  
}

const handleLenChange = (event) => {
  // Computed property names
  // keys of the objects are computed dynamically
  setLength(event.target.value);
  /*const length = event.target.value;
    setState({
      length: length
    });*/
    
    const id = event.target.id;
    for (var i = 1;i <= 3; i++)
    {
        document.getElementById("Check" + i).checked = false;
    }
    document.getElementById(id).checked = true;
  
}

const handleShow3= (childData) => {
  var sh3 = ({showHide3: childData})
  setShowHide3(sh3)
}

  // Return a controlled form i.e. values of the 
  // input field not stored in DOM values are exist 
  // in react component itself as state
    return(
      <Base>
      <form onSubmit={handleSubmit}>
        <Center>
          <label style={{color:"white"}} htmlFor='title1'>Name:
          <br />
          <input
            style={{color:"black"}}
            name="title1"
            value={title1}
            placeholder='Name'
            onChange={handletitle1Change}
          />
          </label>
        </Center> 
          <br /><br />
          <Center>
          <label style={{color:"white"}} htmlFor='description'>What is this NFT?
          <br />
          <input
            style={{color:"black"}}
            name='description'
            value={description}
            placeholder='Description'
            onChange={handleDescChange}
          />
          </label>
          </Center>
          <br /><br />
        <Center>
        <label style={{color:"white"}}>
        <input style={{color:"white"}} type="radio" name="tab" onClick={() => showHide("showHide1")} />
          Fixed Price:
        </label>
        </Center>
        { showHide1 && 
          <div>
          <Center>
          <label style={{color:"white"}} htmlFor='price1'>
          <Center>
           <input
              style={{color:"black"}}
              name='price1' 
              type="number"
              value={price1}
              placeholder='10.00'
              onChange={handleprice1Change}
            />
            </Center>
            <br />
            (**Price <b>NOT</b> Including Gas Fees**)
            <br /><br />
          </label>
          </Center>
         </div> 
        }
        <Center>
        <label style={{color:"white"}}> 
        <input type="radio" name="tab" onClick={() => showHide("showHide2")} />
          Auction NFT
        </label>
        </Center>
        { showHide2 && 
          <div style={{color:"white"}}>
            <Center>
            Auction Length: 
            <div class='form-check form-check-inline'>
            <label>
            <input
              name="length"
              type="radio"
              id="Check1"
              value={length = "24"}
              onChange={handleLenChange} 
            />24 Hours
            </label>
            </div>
            <div class='form-check form-check-inline'>
            <label> 
            <input 
              name="length"
              type="radio"
              id="Check2"
              value={length = "48"}
              onChange={handleLenChange} 
            />48 Hours
            </label>
            </div>
            <div class='form-check form-check-inline'>
            <label>
            <input
              name="length"
              type="radio"
              id="Check3"
              value={length = "72"}
              onChange={handleLenChange} 
            />72 Hours
            </label>
            </div>
            </Center>
            <br />
            <Center>
            <label>
            Starting Bid Price: 
          <input
            style={{color:"black"}}
            name='price2' 
            value={price2}
            placeholder='10.00'
            onChange={handleprice2Change}
          />
          </label>
          </Center>
          <br />
            <Center>
            Immediate Buying Price: 
          <input
            style={{color:"black"}}
            name='price3' 
            value={price3}
            placeholder='10.00 (Optional)'
            onChange={handleprice3Change}
          />
          </Center>
          <br />
          <Center>
          (**Price&nbsp;<b>NOT</b>&nbsp;Including Gas Fees**)
          </Center>
          <br /><br />
        </div>
      }
        <br />
        
        <Center>
          <IpfsUpload parentCallback = {handleShow3}/>
        </Center>

        <br />

        <Center>
          {showHide3 &&
            <Button type="submit"  disabled={items.status !== IDLE} style={{color:"black"}} >Create My NFT</Button>
          }
        </Center>

      </form>
      </Base>
    )
}

