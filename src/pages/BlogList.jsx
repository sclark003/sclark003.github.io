import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { PageTitle, SectionCard } from '../components/Components';
import { formatPostDate, getAllPosts } from '../lib/blog';

const BlogList = () => {
  const posts = getAllPosts();
  const cardHoverBg = useColorModeValue('purple.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      bgImage="/images/pexels1.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      minH="100vh"
    >
      <Container maxW="800px" px={{ base: 4, md: 6 }} py={{ base: 4, md: 8 }}>
        <SectionCard>
          <PageTitle gradient="linear(to-r, purple.600, pink.600)">Study Notes</PageTitle>
          <Text
            textAlign="center"
            color={mutedColor}
            mb={8}
            fontSize={{ base: 'md', md: 'lg' }}
          >
            Notes on AI, machine learning, and tools I am learning.
          </Text>

          {posts.length === 0 ? (
            <Text textAlign="center" color={mutedColor}>
              No notes yet. Add a Markdown file to the content/blog folder to get started.
            </Text>
          ) : (
            <VStack align="stretch" spacing={4}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  as={RouterLink}
                  to={`/notes/${encodeURIComponent(post.slug)}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    p={{ base: 4, md: 5 }}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="lg"
                    transition="all 0.2s"
                    _hover={{ bg: cardHoverBg, borderColor: 'purple.300', transform: 'translateY(-2px)' }}
                  >
                    <Text fontSize="sm" color={mutedColor} mb={1}>
                      {formatPostDate(post.date)}
                    </Text>
                    <Heading as="h2" size="md" mb={2} color="purple.700">
                      {post.title}
                    </Heading>
                    {post.excerpt && (
                      <Text color={mutedColor} lineHeight="tall">
                        {post.excerpt}
                      </Text>
                    )}
                  </Box>
                </Link>
              ))}
            </VStack>
          )}
        </SectionCard>
      </Container>
    </Box>
  );
};

export default BlogList;
