import React from "react"
import { keyframes } from '@emotion/react'
import { Box } from '@chakra-ui/react'

const rotateAnimation = keyframes`
    0%, 100% {
        transform: rotateZ(0deg)
    }
    50% {
        transform: rotateZ(-2deg)
    }
`

const MenuButton = ({ children = '', onClick = () => { } }) => {
    return (
        <Box
            as='button'
            bg='teal.400'
            width='100%'
            height='50px'
            fontSize="2xl"
            transition='background-color 0.2s'
            _hover={{
                animation: `${rotateAnimation} 1s ease-in`,
                backgroundColor: 'orange.200'
            }}
            onClick={onClick}>
            {children}
        </Box>
    )
}

export default MenuButton