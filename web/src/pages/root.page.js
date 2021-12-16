import {Base} from "../parts/base.comp"
import React, { useLayoutEffect, useRef, useState } from "react"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Redirect} from "react-router-dom"
import {AuthCluster} from "../parts/auth-cluster.comp"
import "./routepages/preloadgif.js"
import Navbar from "../parts/navbar.comp"
import "./vid.css"
import styled from "styled-components";
import Foot from "../parts/footer.comp"
import {useAddress} from "../hooks/use-url-address.hook"
import {
  Box,
  Center,
  Text,
  VStack
} from "@chakra-ui/react"


export function Page() {
  const [show, doShow] = useState({
    itemOne: false,
    itemTwo: false,
    itemThree: false,
    itemFour: false,
    itemFive: false,
    itemSix: false,
    itemSeven: false,
    itemEight: false
  });
  const [percentShown, setPercentShow] = useState({
    itemOne: 0,
    itemTwo: 0,
    itemThree: 0,
    itemFour: 0,
    itemFive: 0,
    itemSix: 0,
    itemSeven: 0,
    itemEight: 0
  });
  const ourRef = useRef(null),
    anotherRef = useRef(null),
    refThree = useRef(null),
    refFour = useRef(null),
    refFive = useRef(null),
    refSix = useRef(null),
    refSeven = useRef(null),
    refEight = useRef(null);

  const [user, loggedIn] = useCurrentUser()
  const address = useAddress()

  useLayoutEffect(() => {
    const topPos = (element) => element.getBoundingClientRect().top;
    const getHeight = (element) => element.offsetHeight;
    const div1Pos = topPos(ourRef.current),
      div2Pos = topPos(anotherRef.current),
      div3Pos = topPos(refThree.current),
      div4Pos = topPos(refFour.current),
      div5Pos = topPos(refFive.current),
      div6Pos = topPos(refSix.current),
      div7Pos = topPos(refSeven.current),
      div8Pos = topPos(refEight.current);

    const div3Height = getHeight(refThree.current);

    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;

      // Element scrolled to
      if (div1Pos < scrollPos) {
        doShow((state) => ({ ...state, itemOne: true }));
      }else if (div1Pos > scrollPos) {
        // Element scrolled away (up)
        doShow((state) => ({ ...state, itemOne: false }));
      }

      if (div2Pos < scrollPos) {
        doShow((state) => ({ ...state, itemTwo: true }));
      }else if (div2Pos > scrollPos) {
        // Element scrolled away (up)
        doShow((state) => ({ ...state, itemTwo: false }));
      }

      if (div4Pos < scrollPos) {
        doShow((state) => ({ ...state, itemFour: true }));
      }else if (div4Pos > scrollPos) {
        // Element scrolled away (up)
        doShow((state) => ({ ...state, itemFour: false }));
      }

      if (div5Pos < scrollPos) {
        doShow((state) => ({ ...state, itemFive: true }));
      }else if (div5Pos > scrollPos) {
        // Element scrolled away (up)
        doShow((state) => ({ ...state, itemFive: false }));
      }

      if (div6Pos < scrollPos) {
        doShow((state) => ({ ...state, itemSix: true }));
      }else if (div6Pos > scrollPos) {
        // Element scrolled away (up)
        doShow((state) => ({ ...state, itemSix: false }));
      }

      if (div7Pos < scrollPos) {
        doShow((state) => ({ ...state, itemSeven: true }));
      }else if (div7Pos > scrollPos) {
        // Element scrolled away (up)
        doShow((state) => ({ ...state, itemSeven: false }));
      }

      if (div8Pos < scrollPos) {
        doShow((state) => ({ ...state, itemEight: true }));
      }else if (div8Pos > scrollPos) {
        // Element scrolled away (up)
        doShow((state) => ({ ...state, itemEight: false }));
      }

      if (div3Pos < scrollPos) {
        // Element scrolled to
        doShow((state) => ({ ...state, itemThree: true }));

        let itemThreePercent = ((scrollPos - div3Pos) * 100) / div3Height;
        if (itemThreePercent > 100) itemThreePercent = 100;
        if (itemThreePercent < 0) itemThreePercent = 0;

        setPercentShow((prevState) => ({
          ...prevState,
          itemThree: itemThreePercent
        }));
      } else if (div3Pos > scrollPos) {
        // Element scrolled away (up)
        doShow((state) => ({ ...state, itemThree: false }));
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  
  if (loggedIn){ 
    return <Redirect to={"/" + user.addr} />
  }

  return (
    <Base >
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
        crossOrigin="anonymous"></link>
      <Box borderWidth="10px" borderColor="black" >
        <AuthCluster/>
      </Box>
      <Box borderWidth="10px" borderColor="black">
        <Navbar address={address} />
      </Box>
      <Box backgroundColor="black">
      <Wrapper>
        <br />
        <Box id="vid">
          <video className="rounded-circle" style={{width: 50, height: 50}} playsInline="playsInline" autoPlay="autoPlay" muted="muted" loop="loop">
            <source src={'https://drive.google.com/uc?export=view&id=1vqLZMb3AVcZTQfErZTGvtmWK-ssxI6qm'} type='video/mp4' />
          </video>
          <div className="container h-100">
            <div className=" h-100 text-center align-items-center">
              <div className="w-100 text-white" />
            </div>
          </div>
        </Box>
        <br />
          <Div animate={show.itemThree}
            animatePercent={percentShown.itemThree}
            ref={refThree}>
        <Box>
          <Center>
            <Text textAlign="center" style={{
              fontFamily: "Sora",
              fontStyle: "normal",
              fontWeight: "bolder",
              fontSize: "25px",
              lineHeight: "50px",
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                A Decentralized NFT Exchange with the Most Secure Vault to Store your NFTs 
            </Text>
          </Center>
        </Box>
        <br />
        <br />
        <br />
        <Box>
          <Center>
            <Text textAlign="center" style={{
              fontFamily: "Sora",
              fontStyle: "normal",
              fontWeight: "bolder",
              fontSize: "25px",
              lineHeight: "50px",
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                One Step Closer Towards Concealment of Personal Data
            </Text>
          </Center>
        </Box>
        <Box id="vid">
          <video style={{width: 50, height: 50}} playsInline="playsInline" autoPlay="autoPlay" muted="muted" loop="loop">
            <source src={'https://drive.google.com/uc?export=view&id=1vFMSpN89VNmdMPKu55DIjtTcy2W5Ceht'} type='video/mp4' />
          </video>
          <div className="container h-100">
            <div className=" h-100 text-center align-items-center">
              <div className="w-100 text-white" />
            </div>
          </div>
        </Box>
        <Box>
          <Center>
            <VStack>
              <Text textAlign="center" style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "bolder",
                fontSize: "30px",
                lineHeight: "50px",
                letterSpacing: "-0.06em",
                color: "#FFFFFF",
                textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                  The Most Secure NFT Exchange
              </Text>
              <Text textAlign="center" style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "bolder",
                fontSize: "20px",
                lineHeight: "10px",
                letterSpacing: "-0.06em",
                color: "#FFFFFF",
                textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                  Your Own Personal Vault   
              </Text>
              </VStack>
          </Center>
        </Box>
        </Div>
        <br />
        <br />
        <br />
        <br />
        <Box>
        <Div animate={show.itemTwo} ref={anotherRef}>
          <Center>
            <VStack>
              <Text textAlign="center" style={{
              fontFamily: "Sora",
              fontStyle: "normal",
              fontWeight: "bolder",
              fontSize: "100px",
              lineHeight: "50px",
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                VEX
              </Text>
              <Text textAlign="center" style={{
              fontFamily: "Sora",
              fontStyle: "normal",
              fontWeight: "bolder",
              fontSize: "40px",
              lineHeight: "50px",
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>       
                The Vault EXchange Token
              </Text>
            </VStack>
          </Center>
          </Div>
          <VStack>
            <Box>
                {/*<Text color="white">
                  Coin
              </Text>*/}
            </Box>
            <Box>
            <Div1 animate={show.itemOne} ref={ourRef}>
              <img className="img-fluid" alt="FlowBox" src={'https://drive.google.com/uc?export=view&id=11MMkLBssHoLHA9huj3FzNj53Urgo7h-k'} style={{width: 800, height: 150}}/>
            </Div1>
            <Div animate={show.itemFour} ref={refFour}>
              <img className="img-fluid" alt="NoLimitBox" src={'https://drive.google.com/uc?export=view&id=11TnM8hqlJod885QBYvNw53trLEzpW56K'} style={{width: 800, height: 150}}/>
            </Div>
            <Div1 animate={show.itemFive} ref={refFive}>
              <img className="img-fluid" alt="DNGLBBox" src={'https://drive.google.com/uc?export=view&id=1JKS-aiHj_CjsudYcAPUmCdy_fkASoBxR'} style={{width: 800, height: 150}}/>
            </Div1>
            </Box>
          </VStack>
        </Box>
        <br />
        <br />
        <br />
        <br />
        <Box>
        <Div animate={show.itemSix} ref={refSix}>
          <Center>
            <VStack>
              <Text textAlign="center" style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "bolder",
                fontSize: "40px",
                lineHeight: "50px",
                letterSpacing: "-0.06em",
                color: "#FFFFFF",
                textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                  Created With A Vision to Level The Playing Field
              </Text>
              <Text textAlign="center" style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "bolder",
                fontSize: "25px",
                lineHeight: "50px",
                letterSpacing: "-0.06em",
                color: "#FFFFFF",
                textShadow: "0px 4px 10px rgba(226, 232, 240, 0.92)"}}>
                  Community Protected, Infinite Growth, Immediate Liquidation
              </Text>
              <img className="img-fluid" alt="PictureGrid" src={'https://drive.google.com/uc?export=view&id=1GZ8sshCMkMQQX4FDPF3KQAvCYemrcqgw'} style={{width: 600, height: 600}}/>
            </VStack>
          </Center>
          </Div>
        </Box>
        <Box>
          <Center>
          <Div1 animate={show.itemSeven} ref={refSeven}>
            <img className="img-fluid" alt="SecondGrid" src={'https://drive.google.com/uc?export=view&id=1UUiYfJHxzVVJHSuG3FkMeyAve06Evghh'} style={{width: 850, height: 750}}/>
          </Div1>
          </Center>
        </Box>
        <br />
        <br />
        <br />
        <Box>
          <Center>
          <Div animate={show.itemEight} ref={refEight}>
            <img className="img-fluid" alt="CreationOfAdam" src={'https://drive.google.com/uc?export=view&id=16Iik3pAIdXtF2PfHSc6rqtPZp4EZJJ2M'} style={{width: 1000, height: 700}}/>
          </Div>
          </Center>
        </Box>
        </Wrapper>
        <footer>
          <Foot />
        </footer>
      </Box>
    </Base>
  )
}

const Div = styled.div`
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: transform 2s;
  margin: 20px;
  opacity: ${({ animatePercent }) =>
    animatePercent ? `${animatePercent / 100}` : `1`};
`;

const Div1 = styled.div`
  transform: translateX(${({ animate }) => (animate ? "0" : "100vw")});
  transition: transform 2s;
  margin: 20px;
  opacity: ${({ animatePercent }) =>
    animatePercent ? `${animatePercent / 100}` : `1`};
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;