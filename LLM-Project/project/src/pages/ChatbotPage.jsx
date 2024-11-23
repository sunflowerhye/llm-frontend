import React, { useState, useEffect } from "react";
import "../css/Chatbot.css";
import newchat from '../img/newchat.png';
import deleteicon from '../img/delete.png';

function ChatbotPage() {
  const [messages, setMessages] = useState([]); // 현재 대화 메시지
  const [inputValue, setInputValue] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isInitialMessageVisible, setIsInitialMessageVisible] = useState(true);
  const [history, setHistory] = useState([]); // 과거 대화 기록
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [tempTitle, setTempTitle] = useState(""); // 임시 제목 저장

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch("/api/get_history", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setHistory(Array.isArray(data) ? data : []);
      } else {
        console.error("과거 채팅 목록을 가져오는 중 오류 발생:", data.error);
        setHistory([]);
      }
    } catch (error) {
      console.error("과거 채팅 목록을 가져오는 중 오류 발생:", error);
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessages = [{ sender: "user", text: inputValue }];
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setIsInitialMessageVisible(false); // 문구 사라지도록 설정
  
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ message: inputValue }),
        });
  
        const data = await response.json();
        if (response.ok) {
          const botMessage = { sender: "bot", text: data.response };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          console.error("메시지 전송 중 오류 발생:", data.error);
        }
      } catch (error) {
        console.error("메시지 전송 중 오류 발생:", error);
      } finally {
        setInputValue(""); // 입력창 비우기
      }
    }
  };
  

  const handleConversationClick = async (historyId) => {
    try {
      const response = await fetch(`/api/get_conversation/${historyId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const conversationMessages = [
          { sender: "user", text: data.query },
          { sender: "bot", text: data.response },
        ];
        setMessages(conversationMessages);
        setSelectedConversation(historyId);
      } else {
        console.error("대화 조회 중 오류 발생:", data.error);
      }
    } catch (error) {
      console.error("대화 조회 중 오류 발생:", error);
    }
  };

  const handleDeleteConversation = async (historyId) => {
    try {
      const response = await fetch(`/api/delete_conversation/${historyId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("대화 삭제 성공");
        fetchHistory();
        if (selectedConversation === historyId) {
          setMessages([]);
          setSelectedConversation(null);
        }
      } else {
        console.error("대화 삭제 중 오류 발생:", data.error);
      }
    } catch (error) {
      console.error("대화 삭제 중 오류 발생:", error);
    }
  };

  const handleStartNewConversation = () => {
    // 상태 초기화
    setSelectedConversation(null);
    setMessages([]);
    setIsInitialMessageVisible(true);
    setTempTitle(""); // 임시 제목 초기화
  };

  return (
    <div className="chatbot-container">
      {isSidebarVisible && (
        <div className="sidebar">
          <nav>
            <ul>
              <li className="header-with-button">
                <h2 className="title">채팅 목록</h2>
                <button className="new-chat-button" onClick={handleStartNewConversation}>
                  <img src={newchat} alt="새 대화 시작" />
                </button>
              </li>
              {/* 채팅 목록 렌더링 */}
              {Array.isArray(history) && history.length > 0 ? (
                history.map((item) => (
                  <li key={item.id}>
                    <span onClick={() => handleConversationClick(item.id)}>
                      {item.title}
                    </span>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteConversation(item.id)}
                    >
                      <img src={deleteicon} alt="삭제" />
                    </button>
                  </li>
                ))
              ) : (
                <li>채팅 기록이 없습니다.</li>
              )}
            </ul>
          </nav>
        </div>
      )}

      <div className="main-content">
        <div className="header">
          <button
            className="toggle-button"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            {isSidebarVisible ? "🡸" : "🡺"}
          </button>
          <h1 className="header-title">Beauty Chatbot</h1>
        </div>

        <div className="chat-section">
          {isInitialMessageVisible && (
            <p className="highlight">
              지금 <span className="highlight-blue">Beauty Chatbot</span>과 대화해 보세요.
            </p>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === "user" ? "chat-right" : "chat-left"}`}
            >
              {msg.text}
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
