import React from "react";
import { SocialMediaIconsReact } from 'social-media-icons-react'
import {
    Box,
    Flex,
    HStack,
    Spacer,
    Text,
    VStack 
} from "@chakra-ui/react"

//import logo from "./images/ValiasLogo.svg"

export default function Foot (){

  return (
      <footer style={{backgroundColor:"black"}}>
        <Flex align="center">
            <Box>
                <img src={'https://drive.google.com/uc?export=view&id=1iKkvy1tPabahiV3eRNGZU_7DRbXcPLJk'} alt="Logo" width="150" />
            </Box>
            <Spacer />
            <Box >
                <Text textAlign="center" color="white">Share us on Social Media!</Text>
                <HStack> 
                    <SocialMediaIconsReact borderColor="#BEE3F8" icon="twitter"
                        url="https://twitter.com/intent/tweet?hashtags=VALIAS&text=Check%20out%20the%20new%20NFTs%20on%20Valias!&url=https%3A%2F%2Fwww.valias.io" />
                    <SocialMediaIconsReact borderColor="#BEE3F8" icon="facebook" 
                        url="http://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.Valias.io%2Fpath%2F&quote=Check%20out%20the%20new%20NFTs%20on%20Valias!&hashtag=%23VALIAS" target="_blank" title="Check out Valias!" />
                    {/*<SocialMediaIconsReact borderColor="#BEE3F8" icon="instagram" />*/}
                    <SocialMediaIconsReact borderColor="#BEE3F8" icon="pinterest" 
                        url="https://www.pinterest.com/pin/create/button?url=http://www.valias.io&description=Check%20out%20the%20new%20NFTs%20on%20Valias!" />
                    {/*<SocialMediaIconsReact borderColor="#BEE3F8" icon="snapchat" />*/}
                    <SocialMediaIconsReact borderColor="#BEE3F8" icon="reddit" 
                        url="https://reddit.com/submit?url=http://www.valias.io&title=Check%20out%20the%20new%20NFTs%20on%20Valias!" />
                    <SocialMediaIconsReact borderColor="#BEE3F8" icon="tumblr" 
                        url="https://www.tumblr.com/widgets/share/tool?canonicalUrl=http://www.valias.io&title=Valias&caption=Check%20out%20the%20new%20NFTs%20on%20Valias!" />
                    <SocialMediaIconsReact borderColor="#BEE3F8" icon="mail" 
                        url="mailto:?subject=Valias&body=Check%20out%20the%20new%20NFTs%20on%20Valias!%0Ahttp://www.valias.io" />
                    <SocialMediaIconsReact borderColor="#BEE3F8" icon="phone" 
                        url="sms:&body=Check out the new NFTs on Valias! http://www.valias.io" />
                </HStack>
            </Box>
            <Spacer />
            <Box mr="2">
                <VStack>
                    <div align="center">
                        <Text color="white">Problems?<br />Email us at:<br />
                            <a href="mailto:Support@Valias.io?subject=Help!">
                             Support@Valias.io
                            </a>
                        </Text>
                    </div>
                </VStack>
            </Box>
        </Flex>
      </footer>
  )
}