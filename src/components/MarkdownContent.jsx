import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Code,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

const components = {
  h1: ({ children }) => (
    <Heading as="h1" size="xl" mb={4} mt={2}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size="lg" mb={3} mt={6}>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size="md" mb={2} mt={5}>
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <Text mb={4} lineHeight="tall" fontSize={{ base: 'md', md: 'lg' }}>
      {children}
    </Text>
  ),
  a: ({ href, children }) => (
    <Link href={href} color="purple.600" fontWeight="medium" isExternal={href?.startsWith('http')}>
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <UnorderedList mb={4} pl={6} spacing={2}>
      {children}
    </UnorderedList>
  ),
  ol: ({ children }) => (
    <OrderedList mb={4} pl={6} spacing={2}>
      {children}
    </OrderedList>
  ),
  li: ({ children }) => <ListItem>{children}</ListItem>,
  blockquote: ({ children }) => (
    <Box
      borderLeft="4px solid"
      borderColor="purple.400"
      pl={4}
      py={2}
      mb={4}
      color="gray.600"
      fontStyle="italic"
    >
      {children}
    </Box>
  ),
  img: ({ src, alt }) => (
    <Image src={src} alt={alt || ''} maxW="100%" borderRadius="md" mb={4} mx="auto" />
  ),
  code: ({ className, children }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <Box
          as="pre"
          bg="gray.100"
          p={4}
          borderRadius="md"
          overflowX="auto"
          mb={4}
          fontSize="sm"
        >
          <Code display="block" whiteSpace="pre" bg="transparent">
            {children}
          </Code>
        </Box>
      );
    }
    return (
      <Code fontSize="0.9em" px={1} py={0.5}>
        {children}
      </Code>
    );
  },
};

export default function MarkdownContent({ content }) {
  return (
    <Box className="blog-content">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </Box>
  );
}
