import React from 'react'
import { keyframes } from '@chakra-ui/react'
import {
    Box,
    HStack,
    Text
} from '@salesforce/retail-react-app/app/components/shared/ui/index'

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Timer = ({ seconds, isGameOver }) => {
    const formatTime = () => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60

        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`

        return `${formattedMinutes}:${formattedSeconds}`
    }

    return (
        <HStack my={3}>
            <Box
                width="20px"
                height="20px"
                borderRadius="50%"
                bgColor={!isGameOver ? "green.500" : "red.500"}
                animation={!isGameOver ? `${fadeInOut} 1s linear infinite` : null}
            />
            <Text>{formatTime(seconds)}</Text>
        </HStack>
    )
}

export default Timer