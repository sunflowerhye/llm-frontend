import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Bar from './pages/Bar'; // 기존 코드
import ChatbotPage from './pages/ChatbotPage';
import PricingPage from './pages/PricingPage';
import Section from './components/Section'; // 필요에 따라 사용
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


function App() {
  return (
    <Router> {/* Router로 감싸기 */}
      <div className="App">
        <Bar />
        <Routes>
        <Route path="/" element={<><Bar /><StartPage /></>} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>} />
          

        </Routes>
        <Section /> {/* 필요 시 추가 */}
      </div>
    </Router>
  ); 
}

export default App;
