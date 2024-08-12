"use client"
import { Box, Stack, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant', 
      content: 'Hi! How can I help you today?'
    },
  ])

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [...messages, {role: 'user', content: message}])
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}]),
    })
    const data = await response.json()
    setMessages((messages) => [
      ...messages,
      {role: 'assistant', content: data.message},
    ])
  }
  const [message, setMessage] = useState('')

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: '#ADD8E6',  // Light blue background
      }}
    >
      <Box 
        sx={{
          bgcolor: 'white',
          borderRadius: 4,
          boxShadow: 3,
          p: 2,
          mb: 4,
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold',
            letterSpacing: 1,
            color: '#333333',
            fontFamily: 'Montserrat, sans-serif',  // Different font
          }}
        >
          Travel Destination Chatbot
        </Typography>
        <Typography 
          variant="subtitle1"
          sx={{ 
            color: '#555555', 
            fontFamily: 'Montserrat, sans-serif', 
            mt: 1 
          }}
        >
          A Chatbot that will help you with traveling recommendations, advice, and planning!
        </Typography>
      </Box>
      
      <Stack
        direction="column"
        width="100%"
        maxWidth="500px"
        height="70%"
        bgcolor="background.paper"
        boxShadow={5}
        borderRadius={4}
        p={3}
        spacing={3}
        sx={{ 
          backdropFilter: 'blur(10px)', 
          bgcolor: 'rgba(255, 255, 255, 0.85)' 
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          sx={{ maxHeight: '100%', pr: 1 }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                sx={{
                  bgcolor: message.role === 'assistant' ? 'primary.main' : 'secondary.main',
                  color: 'white',
                  borderRadius: 2,
                  p: 2,
                  maxWidth: '75%',
                  wordBreak: 'break-word',
                  fontFamily: 'inherit',
                }}
              >
                <Typography variant="body1">
                  {message.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Type your message..."
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            sx={{ fontFamily: 'inherit' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{ textTransform: 'none', fontFamily: 'inherit' }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
