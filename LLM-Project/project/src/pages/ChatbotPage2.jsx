import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatbotPage2.css';

const ChatbotPage2 = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [newChat, setNewChat] = useState('');
  const [loading, setLoading] = useState(false);

  // 채팅 기록을 가져오는 함수
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/get_history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chat history', error);
      }
    };
    fetchChats();
  }, []);

  // 채팅 클릭 시 상세 대화 로드
  const handleChatClick = async (chatId) => {
    try {
      const response = await axios.get(`/api/get_conversation/${chatId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // query가 배열이 아니면 빈 배열로 초기화
      setSelectedChat({
        ...response.data,
        query: Array.isArray(response.data.query) ? response.data.query : []
      });
    } catch (error) {
      console.error('Error fetching conversation', error);
    }
  };

  // 새 메시지 보내기
  const handleSendMessage = async () => {
    if (!newMessage) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/chat', {
        title: selectedChat.title,
        message: newMessage
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setSelectedChat((prevState) => ({
        ...prevState,
        query: [...prevState.query, newMessage], // 새로운 메시지를 추가
        response: [...prevState.response, response.data.response] // AI 응답 추가
      }));

      setNewMessage('');
      setLoading(false);
    } catch (error) {
      console.error('Error sending message', error);
      setLoading(false);
    }
  };

  // 새 채팅 만들기
  const handleNewChat = async () => {
    if (!newChat) return;
    try {
      const response = await axios.post('/api/new_chat', {
        message: newChat
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setChats((prevChats) => [
        ...prevChats,
        { id: response.data.id, title: `대화${prevChats.length + 1}` }
      ]);
      setNewChat('');
    } catch (error) {
      console.error('Error creating new chat', error);
    }
  };

  // 채팅 목록 삭제
  const handleDeleteChat = async (chatId) => {
    try {
      await axios.delete(`/api/delete_conversation/${chatId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setChats((prevChats) => prevChats.filter(chat => chat.id !== chatId));
    } catch (error) {
      console.error('Error deleting chat', error);
    }
  };

  return (
    <div className="chatbot-page">
      {/* 채팅 목록 */}
      <div className="chat-list">
        <button className="new-chat-button" onClick={handleNewChat}>새 채팅</button>
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} className="chat-item">
              <span onClick={() => handleChatClick(chat.id)}>{chat.title}</span>
              <button onClick={() => handleDeleteChat(chat.id)} className="delete-button">삭제</button>
            </li>
          ))}
        </ul>
      </div>

      {/* 채팅 내용 */}
      <div className="chat-container">
        {selectedChat ? (
          <div className="chat-box">
            <div className="chat-header">
              <h3>{selectedChat.title}</h3>
            </div>
            <div className="messages">
              {/* query가 배열일 때만 map으로 렌더링 */}
              {Array.isArray(selectedChat.query) && selectedChat.query.map((msg, idx) => (
                <div key={idx} className={`message ${msg.fromUser ? 'user-message' : 'bot-message'}`}>{msg}</div>
              ))}
            </div>

            {/* 메시지 입력창 */}
            <div className="input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                disabled={loading}
              />
              <button onClick={handleSendMessage} disabled={loading}>전송</button>
            </div>
          </div>
        ) : (
          <div className="no-chat-selected">채팅을 선택해주세요.</div>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage2;
