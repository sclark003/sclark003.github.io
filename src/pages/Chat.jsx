import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const bg = useColorModeValue('white', 'gray.800');

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', text: message.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const API_BASE = import.meta.env.VITE_PYTHON_URL || '';
      const endpoint = API_BASE
        ? `${API_BASE.replace(/\/$/, '')}/chat`
        : '/chat';
      const history = [...messages, userMessage].slice(-6);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { role: 'bot', text: data.reply || 'No reply from backend.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, something went wrong.' }]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <Box
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
        bg={bg}
      >
        <Heading mb={6} textAlign="center">
          Chatbot
        </Heading>

        <VStack spacing={4} align="stretch">
          <Box maxH="60vh" overflowY="auto" px={2} py={1}>
            {messages.length === 0 ? (
              <Text color="gray.500">Ask about skills, projects, experience...</Text>
            ) : (
              messages.map((msg, index) => (
                <Flex
                  key={index}
                  justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                  mb={3}
                >
                  <Box
                    bg={msg.role === 'user' ? 'purple.500' : 'gray.200'}
                    color={msg.role === 'user' ? 'white' : 'black'}
                    px={4}
                    py={3}
                    borderRadius="2xl"
                    maxW="80%"
                    boxShadow="md"
                  >
                    <Text whiteSpace="pre-wrap">{msg.text}</Text>
                  </Box>
                </Flex>
              ))
            )}
          </Box>

          <Flex gap={3} align="center">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              size="lg"
              bg={useColorModeValue('gray.50', 'gray.700')}
            />
            <Button
              colorScheme="purple"
              onClick={sendMessage}
              isLoading={isLoading}
              loadingText="Sending"
            >
              Send
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
};

export default Chat;
