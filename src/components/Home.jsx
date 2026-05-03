import React from 'react';
import { Box, Container, Flex, Image, VStack, Divider, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ExternalLinkButton, PageTitle, SectionCard, BodyText } from './Components';
import MediaSlider from './MediaSlider';

const Home = () => {

  return (
    <Box
      bgImage="src/images/paint.jpg"
    >
      <Container maxW="1200px">
        <SectionCard>
          <PageTitle>About Me</PageTitle>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={8}
            align={{ base: 'center', md: 'flex-start' }}
          >
            <Box flexShrink={0}>
              <Image
                src="/src/images/me.jpg"
                alt="Sarah Clark"
                boxSize={{ base: '200px', md: '300px' }}
                boxShadow="lg"
              />
            </Box>

            <VStack align="stretch" spacing={4} flex={1}>
              <BodyText>
                As a passionate and driven Software Engineer, I am focused on expanding my
                expertise in software implementation and design within a challenging,
                collaborative environment. I studied electronics because I wanted to understand
                how computers work, but I realised I enjoyed software more so I self taught
                myself Python, Kotlin and Javascript, and later pursued a Master's degree in
                Artificial Intelligence to deepen my understanding of the cutting-edge
                technologies shaping our world today.
              </BodyText>

              <BodyText>
                With a strong foundation in software engineering, I am dedicated to
                continuously expanding my knowledge and skills, particularly in the realm of
                AI, and I am eager to contribute to innovative projects that make a meaningful
                impact. My commitment to learning is driven by a genuine curiosity to explore
                new technologies and methodologies.
              </BodyText>
            </VStack>
          </Flex>
        </SectionCard>

        <SectionCard p={6} textAlign="center" boxShadow="xl">

          <PageTitle as="h6" size="md">My Interests</PageTitle>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>STEM Outreach</Tab>
              <Tab>Creative Outlets</Tab>
              <Tab>Language Learning</Tab>
              <Tab>Music</Tab>
              <Tab>Travel</Tab>
            </TabList>
            <TabPanels>
              <TabPanel textAlign="left">
                <VStack align="stretch" spacing={4} flex={1}>
                  <BodyText>
                    Encouraging coding/STEM at school is something I believe is very important as I would not have the career I have today if I didn’t have people in my life encouraging my own interest in STEM.
                    I think it is especially important for girls as otherwise for some coding is never really seen as an option. 
                    Also, as someone who is neurodivergent, I think it is very good for some SEN children as often as career in software is very well suited to the neurodivergent!
                  </BodyText>
                  <BodyText>
                    I volunteer at a weekly coding club for children at a local SEN secondary school to educate children about coding and encourage them consider a career in STEM.
                    I create and regularly lead sessions for the students using BBC Microbits and add on technology such as Smart Cutebots and Microsoft Arcades to introduce them to coding concepts and teach them about sensors.
                  </BodyText>
                  <BodyText>
                    As the school is a specialist SEN school there are added difficulties involved such as difficulties with concentration and students needing different levels of support. 
                    Some children are able to understand straight away and benefit from continued extensions and input, whereas others need more support to complete the first task. 
                    This can be very difficult to do with only a small number of volunteers!
                  </BodyText>
                  <ExternalLinkButton
                    href="https://sclark003.github.io/Code-Club-Sessions/"
                    colorScheme="pink"
                    size="md"
                  >
                    Here are some session plans I have created.
                  </ExternalLinkButton>
                  <Box flexShrink={0}>
                    <Image
                      src="/src/images/code_club.JPEG"
                      alt="Microsoft Arcade Code"
                    />
                  </Box>
                </VStack>
            </TabPanel>
              <TabPanel textAlign="left">
                <VStack align="stretch" spacing={4} flex={1}>
                  <BodyText>
                    I have always enjoyed creating things. For as long as I can remember I have flitted between different creative projects such as crotchet, knitting, writing, video making, candle making and crafts. I find crafting to be a very relaxing and rewarding hobby, and I enjoy being able to make something with my hands.
                  </BodyText>
                  <BodyText>
                    In 2025 I got involved in jewellery making, originally with a aim to make earrings for myself and to give as gifts. Somewhere along the way I decided to see if I might be able to sell any. This led me to set up an Etsy shop and I have been selling my jewellery on there since then. I have really enjoyed the process of learning how to make jewellery, and I find it very rewarding to be able to make something that other people like and want to buy.
                  </BodyText>
                  <BodyText>
                    As a learning project, I also decided to to try making a website for my jewellery. I used React and Chakra UI to create a simple website to display and allow people to buy my jewellery. This was a fun project to work on and I enjoyed learning how to create a website from scratch.
                  </BodyText>
                  <ExternalLinkButton
                    href="https://francifully.co.uk/"
                    colorScheme="green"
                    size="md"
                  >
                    Check out my jewellery website here!
                  </ExternalLinkButton>
                  <MediaSlider
                    slides={[
                      { src: '/src/images/craft1.JPEG', description: 'White Butterly Polymer Clay Earrings' },
                      { src: '/src/images/craft2.JPEG', description: 'Spring Butterfly Polymer Clay Earrings' },
                      { src: '/src/images/craft3.PNG', description: 'Woodland Polymer Clay Earrings' },
                      { src: '/src/images/craft4.PNG', description: 'Golden Sun and Moon Stud Earrings' },
                      { src: '/src/images/craft5.PNG', description: 'Body Form Soy Wax Candle' },
                      { src: '/src/images/craft6.PNG', description: 'Polymer Clay Oranges Bracelet' }
                    ]}
                  />
                </VStack>
              </TabPanel>
              <TabPanel textAlign="left">
                <VStack align="stretch" spacing={4} flex={1}>
                  <BodyText>Language learning has always been an interest of mine. As a child I loved secret codes and ciphers, and working out how to decode them. Later, at school I studied French and Latin.</BodyText>
                  <BodyText>French was particularly useful as we visited France several times when I was a child and I loved being able to try and decipher all the signs and conversations around me.</BodyText>
                  <BodyText>However, Latin was a subject I particularly loved- so much so that I studied it for A-level. 
                    Anyone familiar with Latin will know that it has a particularly complex grammar structure, which I saw saw as a challenge. 
                    Unlike modern languages where learning to speak is an important element, latin teaching focuses more on translating text and literature which appealed to my love of 'decoding'.
                    It also introduced me to some classical texts in their original language, and some interesting classical history which I would otherwise probably not have been exposed to.</BodyText>
                  <BodyText>
                    Continuing with my study of romance languages, I went on to study Italian as an extra curricular outside of school as we had Italian family friends, and more recently I've decided to learn more about languages with different grammar structures.
                    Currently I am trying to teach myself some Norwegian which has a more similar grammatical structure to English and so has been exciting to explore!
                  </BodyText>
                </VStack>
              </TabPanel>
              <TabPanel textAlign="left">
                <VStack align="stretch" spacing={4} flex={1}>
                  <BodyText>
                    Music has always been a big part of my life. 
                    I started learning the piano when I was 6 years old, and later picked up the violin. 
                    It turns out the piano is not one of my natural gifts, but I have continued playing the violin!
                  </BodyText>
                  <BodyText>
                    Currently, I am working toward my Grade 8 violin exam, which is longterm goal of mine.
                    This is very exciting for me as I am now studying some very well known pieces of music, such as Vivaldi's 'Spring' which I have always wanted to learn to play!
                  </BodyText>
                  <BodyText>  
                    I find music to be a very rewarding hobby and I enjoy the process of learning new pieces and improving my skills. 
                    I also find that both listening to and playing music is a great way to relax and unwind after a long day.
                  </BodyText>
                </VStack>
              </TabPanel>
              <TabPanel textAlign="left">
                <VStack align="stretch" spacing={4} flex={1}>
                  <BodyText>
                    When I was younger my father used to travel to many different places for work which perhaps inspired my interest in travelling.
                    My father encouraged my interest in different places by taking me on trips when I was young, and I have continued to enjoy travelling as an adult.
                  </BodyText>
                  <BodyText>
                    Since I have been old enough to book my own trips, I have enjoyed planning out itineraries for both weekend city breaks in Europe and longer trips.
                    There are so many different places in the world, with so many different cultures, landscapes and animals and I hope to be lucky enough to travel widely.
                    I think that it is so important to experience different cultures and ways of life, and I find that travelling is a great way to broaden my horizons and learn about the world around me.
                  </BodyText>
                </VStack>
                <MediaSlider
                    slides={[
                      { src: '/src/images/travel1.JPG', description: 'Oslo, Norway' },
                      { src: '/src/images/travel2.JPG', description: 'Wellington, New Zealand' },
                      { src: '/src/images/travel3.JPG', description: 'Snowdonia, Wales' },
                      { src: '/src/images/travel4.JPG', description: 'Marrakech, Morocco' },
                      { src: '/src/images/travel5.jpg', description: 'Uluṟu-Kata Tjuṯa National Park, Australia' },
                      { src: '/src/images/travel14.jpg', description: 'Tromso, Norway' },
                      { src: '/src/images/travel7.jpg', description: 'Franz Josef Glacier, New Zealand' },
                      { src: '/src/images/travel9.jpg', description: 'Stockholm, Sweden' },
                      { src: '/src/images/travel10.jpg', description: 'Paris, France' },
                      { src: '/src/images/travel12.jpg', description: 'Prague, Czech Republic' },
                      { src: '/src/images/travel6.jpg', description: 'Blue Mountains, Australia' },
                      { src: '/src/images/travel13.jpg', description: 'Burano, Venice, Italy' },
                      { src: '/src/images/travel18.jpg', description: 'Lake District, England' },
                      { src: '/src/images/travel15.JPG', description: 'Olden, Norway' },
                      { src: '/src/images/travel16.jpg', description: 'Gljúfrabúi, Iceland' },
                      { src: '/src/images/travel20.jpg', description: 'Hobbiton, New Zealand' },
                      { src: '/src/images/travel19.jpg', description: 'Isle of Skye, Scotland' }
                    ]}
                  />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </SectionCard>
      </Container>
    </Box>
  );
};

export default Home;
