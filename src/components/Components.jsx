import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export function SectionCard({ bg, children, ...props }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const backgroundColor = bg || cardBg;

  return (
    <Box
      bg={backgroundColor}
      borderRadius="xl"
      boxShadow="2xl"
      p={{ base: 4, md: 8 }}
      mb={{ base: 4, md: 8 }}
      {...props}
    >
      {children}
    </Box>
  );
}

export function PageTitle({
  as = 'h1',
  size = '2xl',
  children,
  gradient = 'linear(to-r, red.600, pink.600)',
  ...props
}) {
  return (
    <Heading
      as={as}
      size={size}
      mb={{ base: 4, md: 8 }}
      textAlign="center"
      lineHeight="1.3"
      fontSize={{ base: '2xl', md: as === 'h6' ? 'lg' : '4xl' }}
      bgGradient={gradient}
      bgClip="text"
      {...props}
    >
      {children}
    </Heading>
  )
}

export function ExternalLinkButton({ href, children, colorScheme = 'purple', rightIcon = <ExternalLinkIcon />, variant = 'outline', ...props }) {
  return (
    <Link href={href} isExternal _hover={{ textDecoration: 'none' }} display="block" width="100%">
      <Button
        colorScheme={colorScheme}
        rightIcon={rightIcon}
        variant={variant}
        width="100%"
        height="auto"
        minH="44px"
        whiteSpace="normal"
        py={3}
        px={4}
        lineHeight="short"
        {...props}
      >
        {children}
      </Button>
    </Link>
  );
}

export function BodyText({ children, fontSize = { base: 'md', md: 'lg' }, lineHeight = 'tall', ...props }) {
  return (
    <Text fontSize={fontSize} lineHeight={lineHeight} {...props}>
      {children}
    </Text>
  );
}

export function ProjectCard({ project, textColor, cardBorderColor }) {
  const projectBg = useColorModeValue('orange.50', 'gray.700');

  return (
    <Box>
      <Box
        border="2px"
        borderColor={cardBorderColor}
        borderRadius="lg"
        p={{ base: 4, md: 6 }}
        bg={projectBg}
        transition="all 0.2s"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
      >
        <Heading as="h3" size="md" mb={4} color="orange.600" fontSize={{ base: 'md', md: 'lg' }}>
          {project.title}
        </Heading>

        <VStack align="stretch" spacing={3} mb={4}>
          {project.description.map((para, index) => (
            <Text key={index} color={textColor} lineHeight="tall" fontSize={{ base: 'sm', md: 'md' }}>
              {para}
            </Text>
          ))}

          {project.applications && (
            <Box pl={{ base: 2, md: 4 }}>
              <List spacing={2} styleType="disc">
                {project.applications.map((app, index) => (
                  <ListItem key={index} color={textColor} fontSize={{ base: 'sm', md: 'md' }}>
                    {app}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {project.additionalInfo && (
            <Text color={textColor} lineHeight="tall" fontSize={{ base: 'sm', md: 'md' }}>
              {project.additionalInfo}
            </Text>
          )}

          <Flex
            mt={4}
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="center"
            gap={4}
            wrap="wrap"
          >
            {[project.image1, project.image2, project.image3]
              .filter(Boolean)
              .map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  maxW={{ base: '100%', md: project.maxW }}
                  w={{ base: '100%', md: 'auto' }}
                />
              ))}
          </Flex>

        </VStack>

        <ExternalLinkButton href={project.githubUrl} colorScheme="orange" size="md">
          Code Repository
        </ExternalLinkButton>
      </Box>
    </Box>
  );
}
