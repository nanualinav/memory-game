import React from 'react'
import PropTypes from 'prop-types'
import { keyframes } from '@chakra-ui/react'
import {
    Box,
    HStack,
    Text
} from '@chakra-ui/react'

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

Timer.propTypes = {
    seconds: PropTypes.number.isRequired,
    isGameOver: PropTypes.bool.isRequired,
}
export default Timer