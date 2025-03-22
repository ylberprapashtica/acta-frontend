import { ChakraProvider, Box, Container } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Container maxW="container.xl" py={8}>
            <Routes>
              <Route path="/" element={<div>Welcome to Acta</div>} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App
