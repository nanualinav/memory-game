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
            width='100%'
            height={{ base: '60px', md: '70px' }}
            fontSize={{ base: 'lg', md: '2xl' }}
            fontWeight='700'
            color='#ED6CEA'
            transition="all 0.3s ease"
            padding={{ base: '1rem', md: '1.5rem' }}
            textAlign='center'
            _hover={{
                animation: `${rotateAnimation} 1s ease-in`,
                backgroundColor: 'orange.200',
            }}
            _focus={{ outline: 'none' }}
            _active={{
            transform: 'none'
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
