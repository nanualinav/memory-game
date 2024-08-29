import React from 'react'
import { keyframes } from '@emotion/react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'

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
            bg='#F0EFE9'
            width={{ base: '80%', md: '100%' }}
            height={{ base: '50px', md: '60px' }}
            fontSize={{ base: 'lg', md: '2xl' }}
            fontWeight='600'
            color='#ED6CEA'
            transition='background-color 0.2s'
            padding={{ base: '0.75rem', md: '1rem' }}
            _hover={{
                animation: `${rotateAnimation} 1s ease-in`,
                backgroundColor: 'orange.200'
            }}
            onClick={onClick}
        >
            {children}
        </Box>
    )
}

MenuButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
}

MenuButton.defaultProps = {
    children: '',
    onClick: () => { }
}

export default MenuButton
