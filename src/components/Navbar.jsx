import React from 'react';
import {
  Box,
  Flex,
  Link,
  HStack,
  VStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('gray.800', 'gray.900');
  const inactiveColor = useColorModeValue('gray.300', 'gray.400');

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Education and Experience' },
    { path: '/programming', label: 'Programming' },
  ];

  const linkStyles = (path) => ({
    px: 4,
    py: 2,
    borderRadius: 'md',
    display: 'block',
    _hover: {
      bg: 'gray.700',
      textDecoration: 'none',
    },
    bg: location.pathname === path ? 'purple.600' : 'transparent',
    color: location.pathname === path ? 'white' : inactiveColor,
    fontWeight: location.pathname === path ? 'semibold' : 'normal',
    transition: 'all 0.2s',
  });

  return (
    <Box bg={bg} color="white" py={{ base: 3, md: 4 }} boxShadow="lg">
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        align="center"
        justify="space-between"
      >
        <Box fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
          Sarah Clark
        </Box>

        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              as={RouterLink}
              to={link.path}
              {...linkStyles(link.path)}
            >
              {link.label}
            </Link>
          ))}
        </HStack>

        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          color="white"
          _hover={{ bg: 'gray.700' }}
          onClick={onOpen}
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg} color="white">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">
            Menu
          </DrawerHeader>
          <DrawerBody py={6}>
            <VStack align="stretch" spacing={2}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  as={RouterLink}
                  to={link.path}
                  onClick={onClose}
                  {...linkStyles(link.path)}
                >
                  {link.label}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
