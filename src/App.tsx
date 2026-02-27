import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetailPage from './pages/UserDetailPage'; 
import { ThemeProvider } from './context/ThemeContext'; 
import HomePage from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:userId" element={<UserDetailPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;