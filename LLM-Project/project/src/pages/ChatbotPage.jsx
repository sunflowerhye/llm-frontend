import React, { useState, useEffect } from "react";
import "../css/Chatbot.css";
import newchat from "../img/newchat.png";
import deleteicon from "../img/delete.png";

function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isInitialMessageVisible, setIsInitialMessageVisible] = useState(true);
  const [history, setHistory] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  // 채팅 기록을 가져오는 함수 (전체 메시지가 아닌 메타데이터만 가져옴)
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
        // 대화 목록에서 필요한 데이터만 추출 (ID, 제목 등)
        const conversationSummaries = Array.isArray(data) ? data.map(item => ({ id: item.id, title: item.title })) : [];
        setHistory(conversationSummaries);
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

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      // 사용자 메시지를 먼저 추가
      const userMessage = { sender: "user", text: inputValue };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setInputValue(""); // 메시지를 전송한 직후 입력 필드 초기화
      setIsInitialMessageVisible(false);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            system:
              "You are a Beauty AI Master. Your expertise lies in cosmetics, skincare, beauty marketing, and event planning. Always provide professional and concise responses to beauty-related questions.",
            history: [...messages, userMessage], // 사용자 메시지를 포함한 대화 맥락 전달
            tags: ["beauty", "skincare", "cosmetics", "makeup"],
            message: inputValue,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          const botMessage = { sender: "bot", text: data.response };

          let currentText = "";
          let i = 0;

          // 봇 메시지를 한 글자씩 추가하는 로직
          setMessages((prevMessages) => [...prevMessages, userMessage]); // 사용자 메시지 추가
          const interval = setInterval(() => {
            if (i < botMessage.text.length) {
              currentText += botMessage.text[i]; // 한 글자씩 추가
              setMessages((prevMessages) => {
                // 이전 메시지들을 유지하고, 새로운 봇 메시지를 추가
                const newMessages = [...prevMessages];
                // 봇 메시지를 마지막에 추가
                newMessages[newMessages.length - 1] = { sender: "bot", text: currentText };
                return newMessages;
              });
              i++;
            } else {
              clearInterval(interval); // 텍스트가 끝나면 interval 멈추기
            }
          }, 50); // 50ms 간격으로 글자 하나씩 추가
        } else {
          console.error("메시지 전송 중 오류 발생:", data.error);
        }
      } catch (error) {
        console.error("메시지 전송 중 오류 발생:", error);
      }
    }
  };

  // 대화 클릭 시 해당 대화 내용 로드
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
        setSelectedConversation(historyId); // 선택된 대화 ID를 저장
      } else {
        console.error("대화 조회 중 오류 발생:", data.error);
      }
    } catch (error) {
      console.error("대화 조회 중 오류 발생:", error);
    }
  };

  // 대화 삭제 함수
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
        fetchHistory(); // 삭제 후 채팅 기록 새로고침
        if (selectedConversation === historyId) {
          setMessages([]); // 선택된 대화 삭제 시 대화 내용 초기화
          setSelectedConversation(null);
        }
      } else {
        console.error("대화 삭제 중 오류 발생:", data.error);
      }
    } catch (error) {
      console.error("대화 삭제 중 오류 발생:", error);
    }
  };

  // 새로운 대화 시작
  const handleStartNewConversation = () => {
    setSelectedConversation(null);
    setMessages([]);
    setIsInitialMessageVisible(true);
  };

  return (
    <div className="chatbot-container">
      {isSidebarVisible && (
        <div className="sidebar">
          <nav>
            {/* 타이틀과 버튼 고정 */}
            <div className="header-with-button">
              <h2 className="title">채팅 목록</h2>
              <button className="new-chat-button" onClick={handleStartNewConversation}>
                <img src={newchat} alt="새 대화 시작" />
              </button>
            </div>
            {/* 스크롤 가능한 영역 */}
            <ul className="history-list">
              {Array.isArray(history) && history.length > 0 ? (
                history.map((item) => (
                  <li key={item.id} className={`history-item ${selectedConversation === item.id ? "active" : ""}`}>
                    {/* 채팅 제목 클릭 시 상세보기 */}
                    <div className="history-title" onClick={() => handleConversationClick(item.id)}>
                      {item.title}
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteConversation(item.id)}
                      title="대화 삭제"
                    >
                      <img src={deleteicon} alt="삭제" />
                    </button>
                  </li>
                ))
              ) : (
                <li className="empty-history">채팅 기록이 없습니다.</li>
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
              Welcome! Ask me about <span className="highlight-blue">beauty tips, skincare, or trends</span>.
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(); // Enter 키를 누르면 메시지 전송
              }
            }}
            placeholder="Ask me about beauty tips or skincare advice..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotPage;
