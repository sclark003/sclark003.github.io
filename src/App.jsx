import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Experience from './components/Experience';
import Programming from './components/Programming';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

function BlogPostRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/notes/${encodeURIComponent(slug)}`} replace />;
}

function App() {  return (
    <Router>
      <Box minH="100vh" bg="gray.50" overflowX="hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/programming" element={<Programming />} />
          <Route path="/notes" element={<BlogList />} />
          <Route path="/notes/:slug" element={<BlogPost />} />
          <Route path="/blog" element={<Navigate to="/notes" replace />} />
          <Route path="/blog/:slug" element={<BlogPostRedirect />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
