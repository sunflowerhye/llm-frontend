import React, { useState } from "react";
import "./Chatbot.css";

function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // 사이드바 상태 관리
  const [isInitialMessageVisible, setIsInitialMessageVisible] = useState(true); // 초기 메시지 상태

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue("");
      setIsInitialMessageVisible(false); // 초기 메시지 숨김
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // 사이드바 토글
  };

  return (
    <div className="chatbot-container">
      {isSidebarVisible && (
        <div className="sidebar">
          <h2>Beauty Chatbot</h2>
          <nav>
            <ul>
              <li>과거 채팅 목록</li>
            </ul>
          </nav>
        </div>
      )}

      <div className="main-content">
        <div className="header">
          <button className="toggle-button" onClick={toggleSidebar}>
            {isSidebarVisible ? "🡸" : "🡺"}
          </button>
          <h1 className="header-title">Beauty Chatbot</h1>
        </div>

        {isInitialMessageVisible && (
          <p className="highlight">
            지금 <span className="highlight-blue">Beauty Chatbot</span>과 대화해 보세요.
          </p>
        )}

        <div className="chat-section">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${index % 2 === 0 ? "chat-left" : "chat-right"}`}
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="메시지를 입력하세요..."
          />
          <button onClick={handleSendMessage}>전송</button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotPage;
