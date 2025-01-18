// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';  // Ścieżka do pliku Home.js
import Reports from './Reports';  // Ścieżka do pliku About.js
import { Box } from '@chakra-ui/react';


function App() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(rgb(187, 201, 255),rgb(51, 75, 254))"
      color="white" // Opcjonalne, ustawia kolor tekstu na biały
      bgAttachment="fixed" // Ustawia gradient jako statyczny
    >
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reports" element={<Reports />} />
          </Routes>
      </Router>
    </Box>
  )
}

export default App;
