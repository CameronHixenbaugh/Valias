import React from "react";
import { NavLink} from "react-router-dom"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const bg = useColorModeValue("black");
  const mobileNav = useDisclosure();
  const [user,loggedIn] = useCurrentUser()

  function burgerHandle(){
    if(mobileNav.isOpen === true){
      mobileNav.onClose()
    } else{
      mobileNav.onOpen()
    }
  }

  return loggedIn ?(
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        backgroundColor="black"
      >
        <Flex position="s" backgroundColor="black" justifyContent="space-between" mx="auto" borderColor="#BEE3F8" borderWidth="3px">
          <Flex align="center">
            <chakra.a
              href="/" 
              title="Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Valias</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" color="white" fontWeight="medium" ml="2">
              Menu
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <NavLink to={"/" + user.addr} style={{color:"white"}}><Button variant="ghost">Home</Button></NavLink>
              <NavLink to={"/"+user.addr+"/myNFTs"} style={{color:"white"}}><Button variant="ghost">My NFTs</Button></NavLink>
              <NavLink to={"/"+user.addr+"/create"} style={{color:"white"}}><Button variant="ghost">Create NFT</Button></NavLink>
              <NavLink to={"/market"} style={{color:"white"}}><Button variant="ghost">Marketplace</Button></NavLink>
              <NavLink to={"/about"} style={{color:"white"}}><Button variant="ghost">About Us</Button></NavLink>
            </HStack>
            <Box display={{ base: "inline-block", md: "none" }}>
              <IconButton
                display={{ base: "block", md: "block" }}
                aria-label="Open menu"
                fontSize="20px"
                color={bg}
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={burgerHandle}
              />
              
              <VStack
                pos="absolute"
                top={430}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "block" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg="black"
                borderColor="#BEE3F8"
                borderWidth="thick"
                spacing={3}
                rounded="sm"
                shadow="sm"
                color="white"
                zIndex="100"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

              <NavLink to={"/" + user.addr} style={{color:"white"}}><Button w="full" style={{color:"white"}} variant="ghost">Home</Button></NavLink>
              <NavLink to={"/"+user.addr+"/myNFTs"} style={{color:"white"}}><Button w="full" style={{color:"white"}} variant="ghost">My NFTs</Button></NavLink>
              <NavLink to={"/"+user.addr+"/create"} style={{color:"white"}}><Button w="full" style={{color:"white"}} variant="ghost">Create NFT</Button></NavLink>
              <NavLink to={"/market"} style={{color:"white"}}><Button w="full" style={{color:"white"}} variant="ghost">Marketplace</Button></NavLink>
              <NavLink to={"/about"} style={{color:"white"}}><Button w="full" style={{color:"white"}} variant="ghost">About Us</Button></NavLink>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  ):(
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        backgroundColor="black"
      >
        <Flex position="s" backgroundColor="black" justifyContent="space-between" mx="auto" borderColor="#BEE3F8" borderWidth="3px">
          <Flex align="center">
            <chakra.a
              href="/" 
              title="Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Valias</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" color="white" fontWeight="medium" ml="2">
              Menu
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <NavLink to={"/"} style={{color:"white"}}><Button variant="ghost">Home</Button></NavLink>
              <NavLink to={"/market"} style={{color:"white"}}><Button variant="ghost">Marketplace</Button></NavLink>
              <NavLink to={"/about"} style={{color:"white"}}><Button variant="ghost">About Us</Button></NavLink>
            </HStack>
            <Box display={{ base: "inline-block", md: "none" }}>
              <IconButton
                display={{ base: "block", md: "block" }}
                aria-label="Open menu"
                fontSize="20px"
                color={bg}
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={burgerHandle}
              />
              
              <VStack
                pos="absolute"
                top={390}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "block" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg="black"
                borderColor="#BEE3F8"
                borderWidth="thick"
                spacing={3}
                rounded="sm"
                shadow="sm"
                color="white"
                zIndex="100"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

              <NavLink to={"/"} style={{color:"white"}}><Button w="full" style={{color:"white"}} variant="ghost">Home</Button></NavLink>
              <NavLink to={"/market"} style={{color:"white"}}><Button w="full" style={{color:"white"}} variant="ghost">Marketplace</Button></NavLink>
              <NavLink to={"/about"} style={{color:"white"}}><Button w="full" style={{color:"white"}} variant="ghost">About Us</Button></NavLink>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
