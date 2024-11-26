import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ChatbotPage2.css';

const ChatbotPage2 = () => {
  const [chatList, setChatList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    fetchChatList();
  }, []);

//   // 채팅 목록 가져오기 (제목이 없을 경우 첫 메시지로 설정)
//   const fetchChatList = async () => {
//     try {
//       const response = await axios.get('/api/get_history', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const updatedChatList = response.data.map((chat) => ({
//         ...chat,
//         title: chat.title || '새 대화',
//       }));
//       setChatList(updatedChatList);
//     } catch (error) {
//       console.error('채팅 목록 불러오기 실패:', error);
//     }
//   };

//   // 대화 불러오기 (메시지 순서 정리)
//   const fetchConversation = async (chatId) => {
//     try {
//       const response = await axios.get(`/api/get_conversation/${chatId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       // 사용자와 챗봇 메시지를 나누고 번갈아가며 표시
//       const userMessages = response.data.query.split('\n\n').map((msg) => ({
//         role: 'user',
//         content: msg,
//       }));
//       const botMessages = response.data.response.split('\n\n').map((msg) => ({
//         role: 'bot',
//         content: msg,
//       }));

//       const interleavedMessages = [];
//       for (let i = 0; i < Math.max(userMessages.length, botMessages.length); i++) {
//         if (userMessages[i]) interleavedMessages.push(userMessages[i]);
//         if (botMessages[i]) interleavedMessages.push(botMessages[i]);
//       }

//       setMessages(interleavedMessages);
//       setCurrentChat(chatId);
//       setConversationId(chatId);
//     } catch (error) {
//       console.error('대화 불러오기 실패:', error);
//     }
//   };

const fetchChatList = async () => {
    try {
      const response = await axios.get('/api/get_history', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      const uniqueChats = response.data.filter(
        (chat, index, self) =>
          index === self.findIndex((c) => c.id === chat.id) // 중복 제거
      );
  
      setChatList(uniqueChats);
    } catch (error) {
      console.error('채팅 목록 불러오기 실패:', error);
    }
  };
  
  
  const fetchConversation = async (chatId) => {
    try {
      const response = await axios.get(`/api/get_conversation/${chatId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      // 메시지 분리 후 배열로 변환 (첫 메시지 제외)
      const userMessages = response.data.query
        .split('\n\n')
        .slice(1) // 첫 메시지 제거
        .map((msg) => ({
          role: 'user',
          content: msg,
        }));
  
      const botMessages = response.data.response
        ? response.data.response
            .split('\n\n')
            .slice(1) // 첫 메시지 제거
            .map((msg) => ({
              role: 'bot',
              content: msg,
            }))
        : [];
  
      // 메시지 번갈아 배열화
      const interleavedMessages = [];
      for (let i = 0; i < Math.max(userMessages.length, botMessages.length); i++) {
        if (userMessages[i]) interleavedMessages.push(userMessages[i]);
        if (botMessages[i]) interleavedMessages.push(botMessages[i]);
      }
  
      setMessages(interleavedMessages);
      setCurrentChat(chatId);
      setConversationId(chatId);
    } catch (error) {
      console.error('대화 불러오기 실패:', error);
    }
  };
  
  

  const sendMessage = async () => {
    if (!message.trim()) return;
  
    const newMessage = { role: 'user', content: message };
    setMessages((prev) => [...prev, newMessage]);
  
    try {
      const response = await axios.post(
        '/api/chat',
        { message, conversation_id: conversationId || null }, // 대화 ID가 없으면 null로 전달
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (!conversationId) {
        setConversationId(response.data.conversation_id); // 새 대화 ID 저장
        fetchChatList(); // 새 대화 목록 업데이트
      }
  
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: response.data.response },
      ]);
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  
    setMessage('');
  };
  

  const createNewChat = async () => {
    try {
      const response = await axios.post(
        '/api/new_chat',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      const newConversationId = response.data.id;
      setConversationId(newConversationId);
      setMessages([]); // 메시지 초기화
  
      // 새 대화 생성 후 첫 메시지가 제목으로 사용될 수 있도록 기다림
      const firstMessage = messages.length > 0 && messages[0].content.trim() ? messages[0].content.trim() : (messages.length > 1 && messages[1].content.trim()) || '새 대화';
  
      // 새로운 대화 제목을 설정
      const newChat = {
        id: newConversationId,
        title: firstMessage,
      };
  
      // 채팅 목록에 새 대화 추가
      setChatList((prevChatList) => [...prevChatList, newChat]);
  
      // 새로 생성된 대화 자동 선택
      setCurrentChat(newConversationId);
    } catch (error) {
      console.error('새 대화 생성 실패:', error);
    }
  };
  
  // 대화 삭제
  const deleteChat = async (chatId) => {
    try {
      await axios.delete(`/api/delete_conversation/${chatId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchChatList(); // 채팅 목록 새로고침
      if (currentChat === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('대화 삭제 실패:', error);
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chat-list">
        <button onClick={createNewChat} className="new-chat-btn">
          + 새 대화
        </button>
        {chatList.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${currentChat === chat.id ? 'active' : ''}`}
            onClick={() => fetchConversation(chat.id)}
          >
            {chat.title}
            <button
              className="delete-chat-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-bubble">{msg.content}</div>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage2;
