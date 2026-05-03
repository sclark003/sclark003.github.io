import {
  Box,
  Button,
  HStack,
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
    <Box bg={backgroundColor} borderRadius="xl" boxShadow="2xl" p={8} mb={8} {...props}>
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
      mb={8}
      textAlign="center"
      lineHeight="1.3"
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
    <Link href={href} isExternal _hover={{ textDecoration: 'none' }}>
      <Button colorScheme={colorScheme} rightIcon={rightIcon} variant={variant} width="100%" {...props}>
        {children}
      </Button>
    </Link>
  );
}

export function BodyText({ children, fontSize = 'lg', lineHeight = 'tall', ...props }) {
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
        p={6}
        bg={projectBg}
        transition="all 0.2s"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
      >
        <Heading as="h3" size="md" mb={4} color="orange.600">
          {project.title}
        </Heading>

        <VStack align="stretch" spacing={3} mb={4}>
          {project.description.map((para, index) => (
            <Text key={index} color={textColor} lineHeight="tall">
              {para}
            </Text>
          ))}

          {project.applications && (
            <Box pl={4}>
              <List spacing={2} styleType="disc">
                {project.applications.map((app, index) => (
                  <ListItem key={index} color={textColor}>
                    {app}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {project.additionalInfo && (
            <Text color={textColor} lineHeight="tall">
              {project.additionalInfo}
            </Text>
          )}

          <HStack mt={4} display="flex" justifyContent="center" spacing={4}>
            <Image
              src={project.image1}
              maxW={project.maxW}
            />
            <Image
              src={project.image2}
              maxW={project.maxW}
            />
            <Image
              src={project.image3}
              maxW={project.maxW}
            />
          </HStack>

        </VStack>

        <ExternalLinkButton href={project.githubUrl} colorScheme="orange" size="md">
          Code Repository
        </ExternalLinkButton>
      </Box>
    </Box>
  );
}
