import { HStack, Text } from '@chakra-ui/react'
import * as React from 'react'

export const FollowerCount = (props) => {
  const { count, ...stackProps } = props
  return (
    <HStack
      spacing="1"
      fontSize="sm"
      {...stackProps}
    >
      <Text>{count} followers</Text>
    </HStack>
  )
}
