import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Bar from './pages/Bar';
import ChatbotPage from './pages/ChatbotPage';
import ServiceGuidePage from './pages/ServiceGuidePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Task1Page from './pages/Task1Page';
import Task2Page from './pages/Task2Page';
import Task3Page from './pages/Task3Page';
import Task4Page from './pages/Task4Page';
import TaskUI from './pages/TaskUI';
import ScrollToTop from './ScrollToTop';

import ChatBot from './pages/Chatbot';

function App() {
  const [token, setToken] = useState(null);

  // 토큰 복원: 애플리케이션 초기화 시 localStorage 확인
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // 토큰 상태 복원
    }
  }, []); // 빈 배열을 두어서 최초 한 번만 실행되도록 함.

  // 토큰 상태 변경 시 localStorage 동기화
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // 로그인 시 저장
    } else {
      localStorage.removeItem('token'); // 로그아웃 시 제거
    }
  }, [token]);

  const isLoggedIn = !!token; // 로그인 상태 확인

  return (
    <Router>
      <ScrollToTop>
        <div className="App">
          {/* Bar 컴포넌트를 항상 렌더링 */}
          <Bar isLoggedIn={isLoggedIn} setToken={setToken} />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/service-guide" element={<ServiceGuidePage />} />
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/taskUI" element={<TaskUI />} />
            <Route path="/task/1" element={<Task1Page />} />
            <Route path="/task/2" element={<Task2Page />} />
            <Route path="/task/3" element={<Task3Page />} />
            <Route path="/task/4" element={<Task4Page />} />

            <Route path="/bot" element={<ChatbotPage />} />
           
          </Routes>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
