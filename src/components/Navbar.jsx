import React from 'react';
import { Box, Flex, Link, HStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const bg = useColorModeValue('gray.800', 'gray.900');
  const activeColor = useColorModeValue('purple.400', 'purple.300');
  const inactiveColor = useColorModeValue('gray.300', 'gray.400');

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Education and Experience' },
    { path: '/programming', label: 'Programming' },
  ];

  return (
    <Box bg={bg} color="white" py={4} boxShadow="lg">
      <Flex maxW="1200px" mx="auto" px={8} align="center" justify="space-between">
        <Box fontSize="xl" fontWeight="bold">
          Sarah Clark
        </Box>
        <HStack spacing={4}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              as={RouterLink}
              to={link.path}
              px={4}
              py={2}
              borderRadius="md"
              _hover={{
                bg: 'gray.700',
                textDecoration: 'none',
              }}
              bg={location.pathname === link.path ? 'purple.600' : 'transparent'}
              color={location.pathname === link.path ? 'white' : inactiveColor}
              fontWeight={location.pathname === link.path ? 'semibold' : 'normal'}
              transition="all 0.2s"
            >
              {link.label}
            </Link>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
