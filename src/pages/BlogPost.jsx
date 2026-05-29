import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { SectionCard } from '../components/Components';
import MarkdownContent from '../components/MarkdownContent';
import { formatPostDate, getPostBySlug } from '../lib/blog';

const BlogPost = () => {
  const { slug: slugParam } = useParams();
  const slug = decodeURIComponent(slugParam);
  const post = getPostBySlug(slug);
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  if (!post) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Container maxW="800px" px={{ base: 4, md: 6 }} py={{ base: 4, md: 8 }}>
          <SectionCard textAlign="center">
            <Heading size="lg" mb={4}>
              Post not found
            </Heading>
            <Button as={RouterLink} to="/blog" leftIcon={<ArrowBackIcon />} colorScheme="purple">
              Back to blog
            </Button>
          </SectionCard>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      bgImage="/images/pexels1.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      minH="100vh"
    >
      <Container maxW="800px" px={{ base: 4, md: 6 }} py={{ base: 4, md: 8 }}>
        <Button
          as={RouterLink}
          to="/blog"
          variant="ghost"
          leftIcon={<ArrowBackIcon />}
          colorScheme="purple"
          mb={4}
          size={{ base: 'sm', md: 'md' }}
        >
          All posts
        </Button>

        <SectionCard>
          <Text fontSize="sm" color={mutedColor} mb={2}>
            {formatPostDate(post.date)}
          </Text>
          <Heading
            as="h1"
            size={{ base: 'lg', md: 'xl' }}
            mb={6}
            lineHeight="1.3"
            bgGradient="linear(to-r, purple.600, pink.600)"
            bgClip="text"
          >
            {post.title}
          </Heading>
          <MarkdownContent content={post.content} />
        </SectionCard>
      </Container>
    </Box>
  );
};

export default BlogPost;
