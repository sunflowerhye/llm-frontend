import React, { useState, useEffect } from 'react';
import './chat.css';

const ChatbotPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('access_token');

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        setChatHistory((prev) => [
          ...prev,
          { type: 'user', text: message },
          { type: 'gpt', text: data.response },
        ]);
        setMessage('');
      } else {
        setError(data.error || '오류가 발생했습니다.');
      }
    } catch (error) {
      setError('서버 연결에 실패했습니다.');
    }
  };

  useEffect(() => {
    // 기존 대화 기록을 로드
  }, []);

  return (
    <div className="chat-page">
      <div className="chat-container">
        <h2>Beauty Chatbot</h2>
        <div className="chat-history">
          {chatHistory.map((entry, index) => (
            <div
              key={index}
              className={entry.type === 'user' ? 'user-message' : 'gpt-message'}
            >
              {entry.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button onClick={sendMessage}>전송</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default ChatbotPage;
