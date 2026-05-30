import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { PageTitle, SectionCard } from '../components/Components';
import { getNotesByTopic } from '../lib/blog';

const BlogList = () => {
  const sections = getNotesByTopic();
  const cardHoverBg = useColorModeValue('purple.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const sectionHeadingColor = useColorModeValue('purple.800', 'purple.200');
  const accordionBg = useColorModeValue('white', 'gray.700');

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
            Notes on AI, machine learning, and tools I am learning — grouped by topic.
          </Text>

          {sections.length === 0 ? (
            <Text textAlign="center" color={mutedColor}>
              No notes yet. Add a Markdown file to a topic folder under content/blog/.
            </Text>
          ) : (
            <Accordion allowMultiple reduceMotion>
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  border="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  mb={3}
                  overflow="hidden"
                  bg={accordionBg}
                >
                  <AccordionButton py={4} _expanded={{ bg: 'purple.50' }}>
                    <Box flex="1" textAlign="left">
                      <Heading as="h2" size="md" color={sectionHeadingColor}>
                        {section.title}
                      </Heading>
                      <Text fontSize="sm" color={mutedColor} mt={1}>
                        {section.posts.length} note{section.posts.length === 1 ? '' : 's'}
                      </Text>
                    </Box>
                    <AccordionIcon color="purple.500" />
                  </AccordionButton>
                  <AccordionPanel pb={4} pt={2}>
                    <VStack align="stretch" spacing={3}>
                      {section.posts.map((post) => (
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
                            _hover={{
                              bg: cardHoverBg,
                              borderColor: 'purple.300',
                              transform: 'translateY(-2px)',
                            }}
                          >
                            <Heading as="h3" size="md" color="purple.700">
                              {post.order != null ? `${post.order}. ` : ''}
                              {post.title}
                            </Heading>
                            {post.excerpt && (
                              <Text color={mutedColor} lineHeight="tall" mt={2}>
                                {post.excerpt}
                              </Text>
                            )}
                          </Box>
                        </Link>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </SectionCard>
      </Container>
    </Box>
  );
};

export default BlogList;
