import { useState, useEffect } from 'react'
import { Box, IconButton, Image, Flex, Circle, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

function MediaSlider({ 
  slides = [], // Now expects array of { src: string, description: string }
  autoPlay = true, 
  interval = 5000,
  ...props 
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, slides.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % slides.length
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <Box position="relative" width="100%" {...props}>
      <Box
        position="relative"
        width={{ base: '100%', md: '300px' }}
        height={{ base: '280px', sm: '320px', md: '450px' }}
        maxWidth="100%"
        mx="auto"
        overflow="hidden"
        borderRadius="lg"
        bg="gray.100"
      >
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide.src}
            alt={slide.description || `Slide ${index + 1}`}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            objectFit="cover"
            opacity={index === currentIndex ? 1 : 0}
            transition="opacity 0.5s ease-in-out"
            zIndex={index === currentIndex ? 1 : 0}
            />
        ))}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <IconButton
              aria-label="Previous slide"
              icon={<ChevronLeftIcon />}
              position="absolute"
              left={{ base: 2, md: 4 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              bg="blackAlpha.600"
              color="white"
              _hover={{ bg: 'blackAlpha.800' }}
              onClick={goToPrevious}
              borderRadius="full"
              size={{ base: 'sm', md: 'md' }}
              minW={{ base: '36px', md: '40px' }}
              minH={{ base: '36px', md: '40px' }}
            />
            <IconButton
              aria-label="Next slide"
              icon={<ChevronRightIcon />}
              position="absolute"
              right={{ base: 2, md: 4 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              bg="blackAlpha.600"
              color="white"
              _hover={{ bg: 'blackAlpha.800' }}
              onClick={goToNext}
              borderRadius="full"
              size={{ base: 'sm', md: 'md' }}
              minW={{ base: '36px', md: '40px' }}
              minH={{ base: '36px', md: '40px' }}
            />
          </>
        )}

        <Text
          position="absolute"
          bottom="0"
          bg="rgba(0,0,0,0.8)"
          color="white"
          width="100%"
          p="3"
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight="medium"
          textAlign="center"
        >
          {slides[currentIndex].description || ''}
        </Text>
      </Box>

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <Flex justify="center" mt={4} gap={2}>
          {slides.map((_, index) => (
            <Circle
              key={index}
              size="12px"
              bg={index === currentIndex ? 'brand.500' : 'gray.300'}
              cursor="pointer"
              onClick={() => goToSlide(index)}
              transition="background-color 0.3s"
              _hover={{ bg: index === currentIndex ? 'brand.600' : 'gray.400' }}
            />
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default MediaSlider;