import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetailPage from './pages/UserDetailPage'; 
import { ThemeContextProvider } from './context/ThemeContext';
import HomePage from './pages/Home';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<HomePage />} />
          <Route path="/user/:userId" element={<UserDetailPage />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;