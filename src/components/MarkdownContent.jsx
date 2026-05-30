import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import {
  Box,
  Code,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from '@chakra-ui/react';

function preprocessMath(content) {
  return content
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math.trim()}$`)
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `\n$$\n${math.trim()}\n$$\n`);
}

function MathBlock({ math }) {
  const html = katex.renderToString(math.trim(), {
    displayMode: true,
    throwOnError: false,
  });

  return (
    <Box
      className="math-block"
      mb={4}
      overflowX="auto"
      textAlign="center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

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
  table: ({ children }) => (
    <TableContainer mb={6} overflowX="auto" maxW="100%" borderRadius="md" borderWidth="1px" borderColor="gray.200">
      <Table variant="simple" size="sm">
        {children}
      </Table>
    </TableContainer>
  ),
  thead: ({ children }) => <Thead bg="purple.50">{children}</Thead>,
  tbody: ({ children }) => <Tbody>{children}</Tbody>,
  tr: ({ children }) => <Tr>{children}</Tr>,
  th: ({ children }) => (
    <Th fontSize={{ base: 'sm', md: 'md' }} whiteSpace="nowrap" borderColor="gray.200">
      {children}
    </Th>
  ),
  td: ({ children }) => (
    <Td fontSize={{ base: 'sm', md: 'md' }} borderColor="gray.200" fontFamily="mono">
      {children}
    </Td>
  ),
  code: ({ className, children }) => {
    const language = className?.replace('language-', '');

    if (language === 'math') {
      return <MathBlock math={String(children)} />;
    }

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
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {preprocessMath(content)}
      </ReactMarkdown>
    </Box>
  );
}
