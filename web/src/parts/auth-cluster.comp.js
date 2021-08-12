import {Suspense} from "react"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Link as A} from "react-router-dom"
import './../pages/vid.css';
import {
  Box,
  Button,
  Spacer,
  Link,
  Center
} from "@chakra-ui/react"

import Vault from "./images/vault.jpg"
import rain from "./images/rain.mp4"

export function AuthCluster() {
  const [user, loggedIn, {signUp, logIn, logOut}] = useCurrentUser()

  return loggedIn ? (
    <Box id="vid">
        <div className="overlay"></div>
          <video playsInline="playsInline" autoPlay="autoPlay" muted="muted" loop="loop">
            <source src={rain} type='video/mp4' />
          </video>
          <div className="container h-100">
    <div className="d-flex h-100 text-center align-items-center">
      <div className="w-100 text-white">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous"></link>
      <div className="jumbotron-fluid">
        <Center className="container-fluid" >
          <img className="img-fluid rounded-circle" alt="vaultDoor" src={Vault} style={{width: 225, height: 200}}/>
        </Center>
        <div className="container-fluid text-center">
          <h1 className="display-3 font-weight-bold align-middle text-white">The Vault</h1>
        </div>
        <Spacer />
        <div className="container-fluid text-center text-white">
          <Link as={A} mr="4" to={"/" + user.addr}>
            <u>Acct: {user.addr}</u>
          </Link>
          <Button type="button" className="btn btn-light mr-5" onClick={logOut}>
            Log Out
          </Button> 
        </div>
      </div>
      </div>
      </div>
      </div>
    </Box>
  ) : ( 
    <Box backgroundColor="black">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous"></link>
      <div className="jumbotron-fluid" id="bg">
        <Center className="container-fluid" >
          <img className="img-fluid rounded-circle" alt="vaultDoor" src={Vault} style={{width: 285, height: 250}}/>
        </Center>
        <div className="container-fluid text-center">
          <h1 className="display-3 font-weight-bold align-middle text-white">The Vault</h1>
        </div>
        <Spacer />
        <div className="container-fluid text-center">
          <Box>
          <Button mr="4" type="button" className="btn btn-light btn-group mr-5" onClick={logIn}>
            Log In
          </Button>
          <Button mr="4" type="button" className="btn btn-light btn-group ml-5" onClick={signUp}>
            Sign Up
          </Button>
          </Box>
          </div>
      </div>
      </div>
      </div>
      </div>
    </Box>
  )
}

export default function WrappedAuthCluster() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCluster />
    </Suspense>
  )
}
