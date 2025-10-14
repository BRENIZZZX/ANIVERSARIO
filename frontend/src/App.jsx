import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import BackgroundCanvas from './components/BackgroundCanvas';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-rosa-primary via-lilas to-rosa-secondary relative overflow-hidden" style={{background: 'linear-gradient(135deg, #D16D85 0%, #B8A4E8 50%, #E8A4B8 100%)'}}>
        <BackgroundCanvas />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;