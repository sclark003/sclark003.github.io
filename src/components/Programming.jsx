import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Circle,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { PageTitle, ProjectCard } from './Components';
import { m } from 'framer-motion';

const Programming = () => {
  const cardBorderColor = useColorModeValue('orange.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const projects = [
    {
      title: 'MSc Project: Sensing Home Activity with Microphones',
      description: [
        'The aim of this project was to be able to sense and classify sounds in a home environment for the purpose of sensing home activity.',
        'Sensing technology for home environments has been investigated using smart phones, cameras, and other sensors, however many of these are quite intrusive and often people are not comfortable being filmed at home. Therefore, an audio system for sound classification could be much more subtle for everyday use and more widely accepted in the home.',
        'Sensing home activity has many different applications:',
      ],
      applications: [
        'Assistive technology for hearing impaired/disabled people, i.e. alerting a deaf person to a doorbell or alarm',
        'Security applications',
        'Remote healthcare systems for elderly/disabled people, i.e. monitoring a person to make sure they are completing routine activities and looking after themselves',
      ],
      additionalInfo:
        'Several different classification methods were investigated for this task: a K-Nearest Neighbours (KNN) classifier, a Support Vector Machine (SVM) and several different Convolutional Neural Network (CNN) models. The KNN and SVM models achieved the best accuracy on the test data, but a Resnet CNN model proved to be the most effective for this task when applied to real life classification, likely because the CNN models had been trained using data augmentation techniques to make them more resilient to noise.',
      githubUrl: 'https://github.com/sclark003/Domestic-Sound-Classification',
      image1: '/src/images/msc.png',
      image2: '/src/images/msc2.png',
      image3: '/src/images/msc3.png',
      maxW: '33%'
    },
    {
      title: 'Image Classification with PyTorch',
      description: [
        'Deep convolutional neural networks are commonly used for image classification problems as they have been found to produce high accuracies. Many studies have compared models and found that network depth is an important factor for learning features, and therefore improving classification results. However, the question of whether adding more layers will lead to improved models, had led to further problems, such as overfitting, the problem of vanishing gradients, and the fact that deeper networks require more parameters, and therefore have more memory and computational requirements, in particular during training. As a result, it is important to consider the trade-off between accuracy and computation.',
        'The aim of this project was to perform and evaluate image classification tasks with deeper networks. The models were trained and tested on three different datasets: MNIST, CIFAR-10 and Tiny-ImageNet.',
      ],
      githubUrl: 'https://github.com/sclark003/Image-Classification-PyTorch',
      image1: '/src/images/image1.png',
      image2: '/src/images/image2.png',
      image3: '/src/images/image3.png',
      maxW: '33%'
    },
    {
      title: 'Audio Identification using Audio Fingerprinting',
      description: [
        'The aim of this project was to implement and evaluate an audio identification system for tracks in an audio database.',
        'To approach this task, an attempt was made to reimplement the Shazam algorithm which approaches the task by building audio fingerprints for each track in the database based on their frequency components. For each query track, an audio fingerprint is built in the same way, and this is compared against the fingerprints in the database in the hope of finding a match.',
        'In order to build an audio fingerprint, the audio data is first converted into a time-frequency spectrogram representation, and then the local peaks in this spectrogram are found. These peaks are then paired together to create a set of hash values that represent the track. The hash values are stored in a database along with the track ID and the time offset of the first peak in the pair. For a query track, the same process is applied to create a set of hash values, and these are compared against the database to find matches. The track with the most matches is returned as the identified track.'
      ],
      githubUrl: 'https://github.com/sclark003/Audio-Fingerprinting',
      image1: '/src/images/audio1.png',
      image2: '/src/images/audio2.png',
      maxW: '50%'
    },
    {
      title: 'Tone Generation in Python Using C and SWIG',
      description: [
        'The aim of this project was to write C/C++ code to generate a tone, and using SWIG create a wrapper for this code so it could be used in Python.',
        'Python and C++ are two very different programming languages. Python is very versatile- it’s good for testing and its very easy to use. However, relatively, it’s slow and therefore for time dependant applications its not a great choice. C++ on the other hand takes more time to develop and understand, but it’s much more efficient as C code compiles to the native machine code of the processor rather than being interpreted by the Python intepreter. Therefore it’s implementation is much faster. Ideally, we’d like to use the best parts of each language.',
        'Python is written in C, and therefore we can ’extend’ it by writing new code in C/C++. This is what the ’Simplified Wrapper and Interface Generator’ (SWIG) does. SWIG is a piece of open-source software which creates ’wrappers’ for C/C++ programmes in a number of different languages, such as python which we are using in this project. It allows us to use and implement C++ modules within a python program, so that faster code can be written.'
      ],
      githubUrl: 'https://github.com/sclark003/Tone-generation-in-Python-using-C-and-SWIG',
      image1: '/src/images/swig.png',
      maxW: '50%'
    },
    {
      title: 'Building a Graphics User Interface using PyQt',
      description: [
        'The aim of this project was to write a code to respond to MIDI signals produced by a MIDI keyboard, and to create a GUI using Qt that was able to interact with these signals. The MIDI signals would be produced by a virtual MIDI keyboard that was downloaded, and connected to a Python program in order to synthesise the correct keyboard note. A graphical user interface was then designed to allow users to make alterations to the sound.',
        'The first part of this project was to create an oscillator to synthesis the MIDI keyboard notes. A C++ class, ’Oscillate’, was written, containing two functions. The first was to generate a sine wave recursively, given a wave frequency and a sampling frequency. The second function was to generate a square wave, given a wave frequency, sampling frequency and duty cycle. Using SWIG, the C++ code was wrapped for use in Python.',
        'In order to know when a note on the keyboard was being played, and which note, MIDI signals needed to be received by the program. MIDI (Musical Instrument Digital Interface) is a protocol which allows electronic instruments and other digital musical tools to communicate with each other. Importantly, MIDI doesn’t transmit an audio signal, it only sends information. Therefore, a MIDI instrument needs an onboard sound source, i.e. a synthesier or a sampler, to make a sound. MIDI messages are digital data transmissions that tell the music equiptment what to do. MIDI signals were received by creating a mido port and connecting input and outputs to this port. The MIDI signals were then used to trigger the correct note on the synthesiser.',
        'Finally, a graphical user interface was designed using PyQt. This GUI allowed users to make alterations to the sound, such as changing the wave type, and altering the frequency and duty cycle of the wave. The GUI was designed to be simple and intuitive to use, with sliders and dropdown menus for making adjustments.'
        ],
      githubUrl: 'https://github.com/sclark003/MIDI-Synthesier-PyQt5-GUI',
      image1: '/src/images/midi.png',
      maxW: '50%'
    },
  ];

  const goToPrevious = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentProjectIndex((prevIndex) =>
      (prevIndex + 1) % projects.length
    );
  };

  return (
    <Box
      bgImage="src/images/pexels3.jpg"
      minHeight='100vh'
    >
      <Container maxW="90%">
        <Box
          borderRadius="lg"
          boxShadow="2xl"
          p={10}
        >
          <PageTitle gradient="linear(to-r, orange.500, red.500)">
            Programming
          </PageTitle>
        </Box>

        <Box mt={8}>
          <Flex
            align="center"
            justify="center"
            gap={4}
            flexWrap="wrap"
          >
            <IconButton
              aria-label="Previous project"
              icon={<ChevronLeftIcon />}
              onClick={goToPrevious}
              bg="blackAlpha.600"
              color="white"
              _hover={{ bg: 'blackAlpha.800' }}
              size={{ base: 'sm', md: 'md' }}
            />

            <Box flex="1" minW="280px" maxW="90%">
              <ProjectCard
                project={projects[currentProjectIndex]}
                cardBorderColor={cardBorderColor}
                textColor={textColor}
              />
            </Box>

            <IconButton
              aria-label="Next project"
              icon={<ChevronRightIcon />}
              onClick={goToNext}
              bg="blackAlpha.600"
              color="white"
              _hover={{ bg: 'blackAlpha.800' }}
              size={{ base: 'sm', md: 'md' }}
            />
          </Flex>

          <Flex justify="center" mt={4} gap={2}>
            {projects.map((_, index) => (
              <Circle
                key={index}
                size="12px"
                bg={index === currentProjectIndex ? 'orange.500' : 'gray.300'}
                cursor="pointer"
                onClick={() => setCurrentProjectIndex(index)}
                transition="background-color 0.2s"
                _hover={{ bg: index === currentProjectIndex ? 'orange.600' : 'gray.400' }}
              />
            ))}
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Programming;
