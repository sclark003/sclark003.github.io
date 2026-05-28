import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ListItem,
  VStack,
  HStack,
  Stack,
  useColorModeValue,
  Badge,
  UnorderedList
} from '@chakra-ui/react';
import { BodyText, PageTitle, SectionCard } from './Components';

const Experience = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.800, gray.900)'
  );

  return (
    <Box
      bgImage="/images/pexels2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 4, md: 0 }}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: 4, lg: '35px' }}>
          <SectionCard width={{ base: '100%', lg: '50%' }}>
            <PageTitle gradient="linear(to-r, blue.600, purple.600)">
              Education
            </PageTitle>

            <Accordion allowMultiple defaultIndex={[0]} spacing={4}>

              {/* Queen Mary University of London */}
              <AccordionItem border="1px" borderColor="gray.200" borderRadius="md">
                <AccordionButton>
                  <VStack align="stretch" spacing={3} flex="1">
                    <HStack flex="1" spacing={3}>
                      <Image
                        src="/images/QMU.jpg"
                        alt="QMU"
                        boxSize="40px"
                        objectFit="contain"
                      />
                      <Box textAlign="left" minW={0}>
                        <Heading as="h3" size="md" fontSize={{ base: 'sm', md: 'md' }}>
                          Queen Mary University of London (2020-21)
                        </Heading>
                      </Box>
                    </HStack>
                    <Box textAlign="left" display={{ base: 'none', md: 'block' }}>
                      <UnorderedList>
                        <ListItem>Built NLP models using NLTK and neural network architectures for text classification and language modelling tasks.</ListItem>
                        <ListItem>Implemented tokenisation, feature extraction, and embedding-based approaches.</ListItem>
                        <ListItem>Trained and evaluated deep learning models using TensorFlow and PyTorch.</ListItem>
                        <ListItem>Applied supervised and unsupervised learning methods to structured and unstructured datasets.</ListItem>
                        <ListItem>Worked with text preprocessing pipelines and model evaluation metrics.</ListItem>
                      </UnorderedList>
                    </Box>
                  </VStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Text fontWeight="semibold">
                      Artificial Intelligence MSc - Grade: <Badge colorScheme="green">Distinction</Badge>
                    </Text>

                    <Accordion allowMultiple>
                      <AccordionItem border="none">
                        <AccordionButton bg="pink.100" _hover={{ bg: 'pink.200' }} borderRadius="md">
                          <Box flex="1" textAlign="left" fontWeight="semibold">
                            Modules
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                          <UnorderedList>
                            <ListItem>Machine Learning</ListItem>
                            <ListItem>Data Mining</ListItem>
                            <ListItem>Artificial Intelligence in Games</ListItem>
                            <ListItem>Natural Language Processing</ListItem>
                            <ListItem>Neural Networks and NLP</ListItem>
                            <ListItem>Deep Learning and Computer Vision</ListItem>
                            <ListItem>Deep Learning for Audio and Music</ListItem>
                            <ListItem>Music Informatics</ListItem>
                          </UnorderedList>
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem border="none">
                        <AccordionButton bg="pink.100" _hover={{ bg: 'pink.200' }} borderRadius="md" mt={2}>
                          <Box flex="1" textAlign="left" fontWeight="semibold">
                            Projects
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                          <UnorderedList>
                            <ListItem>
                              <Text fontWeight="semibold">MSc Project: Sensing Home Activity with Microphones (2021)</Text>
                              <UnorderedList styleType="circle" pl={6} mt={2}>
                                <ListItem>
                                  Creating an Audio Event Recognition device to classify domestic activities using a Raspberry Pi. Developed convolutional neural network models using Python (PyTorch) and with a live audio input.
                                </ListItem>
                              </UnorderedList>
                            </ListItem>
                          </UnorderedList>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              {/* University of Glasgow */}
              <AccordionItem border="1px" borderColor="gray.200" borderRadius="md">
                <AccordionButton>
                  <VStack align="stretch" spacing={3} flex="1">
                    <HStack flex="1" spacing={3}>
                      <Image
                        src="/images/UofG.png"
                        alt="UofG"
                        boxSize="40px"
                        objectFit="contain"
                      />
                      <Box textAlign="left" minW={0}>
                        <Heading as="h3" size="md" fontSize={{ base: 'sm', md: 'md' }}>
                          University of Glasgow (2016-20)
                        </Heading>
                      </Box>
                    </HStack>
                    <Box textAlign="left" display={{ base: 'none', md: 'block' }}>
                      <UnorderedList>
                        <ListItem>Developed a strong foundation in signal processing, communications systems, and real-time computing. Coursework included Digital Signal Processing (Python), Communication Systems, Electronic System Design, Control Systems, and Simulation of Engineering Systems.</ListItem>
                        <ListItem>Final year project focused on real-time EEG signal processing, investigating signal-to-noise ratio (SNR) limits in brain-computer interface tasks. Developed software in Python and C++ for filtering, feature extraction, and real-time analysis of noisy biological signals.</ListItem>
                        <ListItem>Gained strong mathematical and programming foundations which later supported advanced study in Machine Learning and Artificial Intelligence.</ListItem>
                      </UnorderedList>
                    </Box>
                  </VStack>

                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Text fontWeight="semibold">
                      Electronics with Music BEng - Grade: <Badge colorScheme="blue">2.1</Badge>
                    </Text>

                    <Accordion allowMultiple>
                      <AccordionItem border="none">
                        <AccordionButton bg="pink.100" _hover={{ bg: 'pink.200' }} borderRadius="md">
                          <Box flex="1" textAlign="left" fontWeight="semibold">
                            Modules
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                          <UnorderedList>
                            <ListItem>
                              <Text fontWeight="semibold">Year 1</Text>
                              <UnorderedList styleType="circle" pl={6} mt={1}>
                                <ListItem>Electronic Engineering 1X</ListItem>
                                <ListItem>Electronic Engineering 1Y</ListItem>
                                <ListItem>Engineering Mathematics 1</ListItem>
                                <ListItem>Listening and Repertory</ListItem>
                                <ListItem>Musicianship</ListItem>
                              </UnorderedList>
                            </ListItem>
                            <ListItem>
                              <Text fontWeight="semibold">Year 2</Text>
                              <UnorderedList styleType="circle" pl={6} mt={1}>
                                <ListItem>Analogue Electronics 2</ListItem>
                                <ListItem>Digital Electronics 2</ListItem>
                                <ListItem>Electrical Circuits 2</ListItem>
                                <ListItem>Electronic Design Project 2</ListItem>
                                <ListItem>Embedded Processors 2</ListItem>
                                <ListItem>Engineering Electromagnetics 2</ListItem>
                                <ListItem>Introductory Programming 2</ListItem>
                                <ListItem>Engineering Mathematics 2</ListItem>
                              </UnorderedList>
                            </ListItem>
                            <ListItem>
                              <Text fontWeight="semibold">Year 3</Text>
                              <UnorderedList styleType="circle" pl={6} mt={1}>
                                <ListItem>Communication Systems 3</ListItem>
                                <ListItem>Control 3</ListItem>
                                <ListItem>Electromagnetic Compatability</ListItem>
                                <ListItem>Electronic System Design 3</ListItem>
                                <ListItem>Simulation of Engineering Systems 3</ListItem>
                                <ListItem>Real Time Computer Systems 3</ListItem>
                                <ListItem>Team Design Project EE3</ListItem>
                                <ListItem>Data Acquisition For Music Processing</ListItem>
                                <ListItem>Sonic Arts</ListItem>
                              </UnorderedList>
                            </ListItem>
                            <ListItem>
                              <Text fontWeight="semibold">Year 4</Text>
                              <UnorderedList styleType="circle" pl={6} mt={1}>
                                <ListItem>Acoustics and Audio Technology</ListItem>
                                <ListItem>Audio Programming and Signal Processing</ListItem>
                                <ListItem>Digital Communications</ListItem>
                                <ListItem>Digital Signal Processing</ListItem>
                                <ListItem>Individual Project</ListItem>
                                <ListItem>Opera</ListItem>
                              </UnorderedList>
                            </ListItem>
                          </UnorderedList>
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem border="none">
                        <AccordionButton bg="pink.100" _hover={{ bg: 'pink.200' }} borderRadius="md" mt={2}>
                          <Box flex="1" textAlign="left" fontWeight="semibold">
                            Projects
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                          <VStack align="stretch" spacing={3}>
                            <Box>
                              <Text fontWeight="bold" mb={2}>Individual Projects:</Text>
                              <UnorderedList spacing={2} styleType="disc" pl={6}>
                                <ListItem>
                                  <Text fontWeight="semibold">BEng Final Year Project (2020): Investigation of the SNR Noise Wall on Consciously Generated EEG Signals</Text>
                                  <UnorderedList styleType="circle" pl={6} mt={1}>
                                    <ListItem>
                                      Researching the SNR for different Brain-Computer Interface tasks, by referring to SNR 'walls', the hard limit where it is no longer possible to detect an event in the presence of noise. Developed software in python and C++ to perform real-time signal processing on EEG brain signals.
                                    </ListItem>
                                  </UnorderedList>
                                </ListItem>
                              </UnorderedList>
                            </Box>
                            <Box>
                              <Text fontWeight="bold" mb={2}>Team Projects:</Text>
                              <UnorderedList spacing={2} styleType="disc" pl={6}>
                                <ListItem>
                                  <Text fontWeight="semibold">Line follower robot which will sort coloured disks (2019)</Text>
                                  <UnorderedList styleType="circle" pl={6} mt={1}>
                                    <ListItem>
                                      Chosen as Team Leader. Planned task deadlines and distributed roles. Led software team and wrote code for motor control with pulse width modulation, colour sensing ultrasonic distance sensing and assisted with code for a black line follower. Encouraged less confident members to take more leading roles with support.
                                    </ListItem>
                                  </UnorderedList>
                                </ListItem>
                                <ListItem>
                                  <Text fontWeight="semibold">Pulse meter with LED pulse trace display (2018)</Text>
                                  <UnorderedList styleType="circle" pl={6} mt={1}>
                                    <ListItem>
                                      Heavily involved in analogue circuit and PCB design. Researched and contributed to interrupt software.
                                    </ListItem>
                                  </UnorderedList>
                                </ListItem>
                              </UnorderedList>
                            </Box>
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem border="none">
                        <AccordionButton bg="pink.100" _hover={{ bg: 'pink.200' }} borderRadius="md" mt={2}>
                          <Box flex="1" textAlign="left" fontWeight="semibold">
                            University Life
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                          <UnorderedList spacing={2} styleType="disc" pl={6}>
                            <ListItem>
                              Helped found 'Sustainable Technologies' society to promote sustainability in engineering and was later selected as Secretary. Responsible for managing communications, arranging rooms and transport. Helped organise events including team research projects based on the university's new smart campus development, with support from local firms.
                            </ListItem>
                            <ListItem>
                              Treasurer of the 'Audio Electronics Society' and helped plan and run sessions and labs for this.
                            </ListItem>
                            <ListItem>
                              Member of the 'FemEng' (Female Engineering) society to promote women in STEM, and acted as a mentor for a younger female engineering student.
                            </ListItem>
                            <ListItem>
                              Enjoyed participating and performing in musical extra-curricular activities.
                            </ListItem>
                          </UnorderedList>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              {/* Beaconsfield High School */}
              <AccordionItem border="1px" borderColor="gray.200" borderRadius="md">
                <AccordionButton>
                  <HStack flex="1" spacing={3}>
                    <Image
                      src="/images/bhs.png"
                      alt="BHS"
                      boxSize="40px"
                      objectFit="contain"
                    />
                    <Box textAlign="left" minW={0}>
                      <Heading as="h3" size="md" fontSize={{ base: 'sm', md: 'md' }}>
                        Beaconsfield High School (2011-16)
                      </Heading>
                    </Box>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Accordion allowMultiple>
                    <AccordionItem border="none">
                      <AccordionButton bg="pink.100" _hover={{ bg: 'pink.200' }} borderRadius="md">
                        <Box flex="1" textAlign="left" fontWeight="semibold">
                          A-Levels
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <UnorderedList spacing={2} styleType="disc" pl={6}>
                          <ListItem>Latin</ListItem>
                          <ListItem>Physics</ListItem>
                          <ListItem>Mathematics</ListItem>
                          <ListItem>Further Mathematics (AS-Level)</ListItem>
                        </UnorderedList>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem border="none">
                      <AccordionButton bg="pink.100" _hover={{ bg: 'pink.200' }} borderRadius="md" mt={2}>
                        <Box flex="1" textAlign="left" fontWeight="semibold">
                          GCSEs
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <UnorderedList spacing={2} styleType="disc" pl={6}>
                          <ListItem>Mathematics</ListItem>
                          <ListItem>English Literature</ListItem>
                          <ListItem>English Language</ListItem>
                          <ListItem>Physics</ListItem>
                          <ListItem>Chemistry</ListItem>
                          <ListItem>Biology</ListItem>
                          <ListItem>Geography</ListItem>
                          <ListItem>French</ListItem>
                          <ListItem>Latin</ListItem>
                          <ListItem>Italian</ListItem>
                          <ListItem>Graphics</ListItem>
                          <ListItem>Music</ListItem>
                        </UnorderedList>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem border="none">
                      <AccordionButton bg="pink.100" _hover={{ bg: 'pink.200' }} borderRadius="md" mt={2}>
                        <Box flex="1" textAlign="left" fontWeight="semibold">
                          School Life
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <UnorderedList spacing={2} styleType="disc" pl={6}>
                          <ListItem>
                            Held multiple leadership roles throughout school career, such as Head Girl and Physics Prefect, responsible for giving speeches, leading tours, helping with open day events, and running the school's 'science club'.
                          </ListItem>
                          <ListItem>
                            Lead maths workshops for younger students and local primary school children as a maths ambassador.
                          </ListItem>
                        </UnorderedList>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </AccordionPanel>
              </AccordionItem>

            </Accordion>
          </SectionCard>

          <SectionCard width={{ base: '100%', lg: '50%' }}>
            <PageTitle gradient="linear(to-r, blue.600, purple.600)">
              Experience
            </PageTitle>

            <Accordion allowMultiple defaultIndex={[0]} spacing={4}>

              {/* JP Morgan Chase */}
              <AccordionItem border="1px" borderColor="gray.200" borderRadius="md">
                <AccordionButton>
                  <HStack flex="1" spacing={3}>
                    <Image
                      src="/images/jpmc.jpg"
                      alt="JPMC"
                      boxSize="40px"
                      objectFit="contain"
                    />
                    <Box textAlign="left" minW={0}>
                      <Heading as="h3" size="md" fontSize={{ base: 'sm', md: 'md' }}>
                        JP Morgan Chase (2022 - Present)
                      </Heading>
                    </Box>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <UnorderedList spacing={3} styleType="disc" pl={6}>
                    <ListItem>
                      Led the development of several key features enabling seamless client migration from an old system to a new platform, enhancing functionality and user experience.
                    </ListItem>
                    <ListItem>
                      Designed the system architecture, ensuring scalability, security, and efficiency in alignment with business requirements.
                    </ListItem>
                    <ListItem>
                      Developed, debugged, and maintained high-quality backend systems, optimizing performance and reliability.
                    </ListItem>
                    <ListItem>
                      Helped maintain and improve code for an internal UI system, ensuring seamless user interactions and system stability.
                    </ListItem>
                    <ListItem>
                      Collaborated with business analysts and external teams to identify solutions and drive system improvements.
                    </ListItem>
                    <ListItem>
                      Applied expertise in software development lifecycle (SDLC), Agile methodologies, and CI/CD pipelines to ensure efficient project execution.
                    </ListItem>
                    <ListItem>
                      Conducted rigorous debugging and testing to optimize system performance and maintain production stability.
                    </ListItem>
                    <ListItem>
                      Gained AWS Cloud Practitioner certification on the first attempt after self study.
                    </ListItem>
                    <ListItem>
                      Participated in the DeepRacer League, developing AI and machine learning models for autonomous racing.
                    </ListItem>
                    <ListItem>
                      Volunteered at a code club for a local SEN school, mentoring students in programming and fostering digital literacy.
                    </ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              {/* mThree */}
              <AccordionItem border="1px" borderColor="gray.200" borderRadius="md">
                <AccordionButton>
                  <HStack flex="1" spacing={3}>
                    <Image
                      src="/images/mthree.png"
                      alt="mThree"
                      boxSize="40px"
                      objectFit="contain"
                    />
                    <Box textAlign="left" minW={0}>
                      <Heading as="h3" size="md" fontSize={{ base: 'sm', md: 'md' }}>
                        mThree (2021 - 2022)
                      </Heading>
                    </Box>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <UnorderedList spacing={3} styleType="disc" pl={6}>
                    <ListItem>
                      Undertook training in relational database design using SQL and Java with a focus on financial markets.
                    </ListItem>
                    <ListItem>
                      Worked as Backend Software Engineer to develop, test, and fix bugs for new code features using Kotlin and SQL queries.
                    </ListItem>
                    <ListItem>
                      Collaborated with internal teams and QA testers.
                    </ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

            </Accordion>
          </SectionCard>
        </Stack>

      </Container>
    </Box>
  );
};

export default Experience;
