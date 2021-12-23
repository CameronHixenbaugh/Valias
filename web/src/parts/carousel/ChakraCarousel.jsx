import React, { useEffect, useState } from "react";
import { CardWithAvatar } from './CardWithAvatar'
import {data} from './data'
import { FollowerCount } from './FollowerCount'
import { UserInfo } from './UserInfo'
import { 
  Box, 
  Button, 
  Flex
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon
} from "@chakra-ui/icons"


function Carousel(){

  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = data.length /3 ;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const carouselStyle = {
    transition: "all 1s",
    ml: `-${currentSlide * 100}%`,
  };

  const SLIDES_INTERVAL_TIME = 5000;
  const ANIMATION_DIRECTION = "right";

  useEffect(() => {
    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  },);
  

  return (
    <Flex
      p={5}
      alignItems="center"
      justifyContent="center"
      className="carousel"
    >
      <Button onClick={prevSlide} style={{
                  border: "2px solid #BEE3F8",
                  boxSizing: "border-box",
                  boxShadow: "inset 0px 4px 4px #E2E8F0",
                  filter: "drop-shadow(0px 4px 4px #C4C4C4)",
                  borderRadius: "6px",
                  fontFamily: "Sora",
                  fontStyle: "normal",
                  fontWeight: "bolder",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "rgba(226, 232, 240, 0.92)",
                  textShadow: "0px 4px 4px rgba(196, 196, 196, 0.0989583)",
                  backgroundColor: "black"
                }}>
        <ArrowLeftIcon />
      </Button>
      <Flex overflow="hidden">
        <Flex pos="relative" w="full" {...carouselStyle}>
            {data.map((user,sid) => {
            const { name, bio, src, isVerified, followerCount } = user
            return (
              <Box flex="none"  display="grid" w="33.3%" p="5" shadow="md">     
              <CardWithAvatar
                key={name}
                avatarProps={{
                  src,
                  name,
                }}
              >
                <UserInfo mt="3" name={name} bio={bio} isVerified={isVerified} />
                <FollowerCount my="4" count={followerCount} />
                <Button variant="outline" colorScheme="#BEE3F8" rounded="full" size="sm" width="full">
                  View Profile
                </Button>
              </CardWithAvatar>
              </Box>
            )
          })}
          
        </Flex>
      </Flex>
      <Button onClick={nextSlide} style={{
                  border: "2px solid #BEE3F8",
                  boxSizing: "border-box",
                  boxShadow: "inset 0px 4px 4px #E2E8F0",
                  filter: "drop-shadow(0px 4px 4px #C4C4C4)",
                  borderRadius: "6px",
                  fontFamily: "Sora",
                  fontStyle: "normal",
                  fontWeight: "bolder",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "rgba(226, 232, 240, 0.92)",
                  textShadow: "0px 4px 4px rgba(196, 196, 196, 0.0989583)",
                  backgroundColor: "black"
                }}>
        <ArrowRightIcon />
      </Button>
    </Flex>
  );
};
export default Carousel;