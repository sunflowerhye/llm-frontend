import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/Bot.css'; // CSS 파일 import

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하세요! Beauty Sync 챗봇입니다. 궁금한 것이 있으면 물어보세요!' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const chatWindowRef = useRef(null); // 채팅 윈도우 DOM 참조

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // token이 있으면 true, 없으면 false로 설정
  }, []);

  // 자동 스크롤을 위한 useEffect
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight; // 스크롤을 최하단으로 설정
    }
  }, [messages]); // 메시지가 변경될 때마다 호출

  const handleSend = async (userMessage) => {
    if (userMessage.trim() === '') return;

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages); 
    setUserInput(''); // 보내고 나면 입력창 비우기

    const prompt = ` 
    당신은 뷰티 산업에 특화된 챗봇 BeautyBot입니다. 
    아래 질문에 대한 답변을 작성할 때, 반드시 짧고 간결하고 창의적인 방식으로 작성해 주세요. 
    항상 뷰티 업계의 최신 트렌드, 전문 용어, 고객 관점 등을 반영해 간결하게 요약된 답변을 제공하세요.
    `;

    // 당신은 뷰티 산업에 특화된 챗봇 BeautyBot입니다. 
    // 아래 질문에 대한 답변을 작성할 때, 간결하고 창의적인 방식으로 작성해 주세요. 
    // 항상 뷰티 업계의 최신 트렌드, 전문 용어, 고객 관점 등을 반영해 간결하게 요약된 답변을 제공하세요.

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: prompt
            },
            ...newMessages
          ],
          temperature: 0.7,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessageContent = response.data.choices[0].message.content;
      const botMessage = { role: 'assistant', content: botMessageContent };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      let i = 0;
      let currentText = '';

      const interval = setInterval(() => {
        if (i < botMessage.content.length) {
          currentText += botMessage.content[i];
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            newMessages[newMessages.length - 1] = { role: 'assistant', content: currentText };
            return newMessages;
          });
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);

    } catch (error) {
      console.error('Error communicating with OpenAI', error);
    }
  };

  const handleButtonClick = (message) => {
    let question = '';

    // 클릭된 버튼에 따라 전송할 메시지 지정
    switch (message) {
      case '트렌드':
        question = '2024년 뷰티 업계의 주요 트렌드는 무엇인가요?';
        break;
      case '홍보 전략':
        question = '2024년 뷰티 제품을 위한 최신 홍보 전략은 무엇인가요?';
        break;
      case '박람회':
        question = '뷰티 관련 박람회에 대한 최신 정보는 무엇인가요?';
        break;
      case '캠페인':
        question = '2024년 뷰티 브랜드를 위한 효과적인 캠페인 전략은 무엇인가요?';
        break;
      case '슬로건':
        question = '2024년 가장 인기 있는 뷰티 슬로건은 무엇인가요?';
        break;
      case '광고 문구':
        question = '효과적인 뷰티 제품 광고 문구는 어떻게 만들어야 할까요?';
        break;
      default:
        question = '궁금한 것이 있으면 물어보세요!';
        break;
    }

    // 버튼 클릭 시 바로 메시지 전송
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: question }]);

    // 바로 전송 함수 호출
    handleSend(question);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend(userInput);
    }
  };

  return (
    <div>
      <div className="chatcontainer">
        <div className="chatHeader">Beauty Sync. Chatbot 💬</div> 

        <div className="chatlist">
          <button onClick={() => handleButtonClick('트렌드')} className="keywordsbutton">트렌드</button>
          <button onClick={() => handleButtonClick('홍보 전략')} className="keywordsbutton">홍보 전략</button>
          <button onClick={() => handleButtonClick('박람회')} className="keywordsbutton">박람회</button>
          <button onClick={() => handleButtonClick('캠페인')} className="keywordsbutton">캠페인</button>
          <button onClick={() => handleButtonClick('슬로건')} className="keywordsbutton">슬로건</button>
          <button onClick={() => handleButtonClick('광고 문구')} className="keywordsbutton">광고 문구</button>
        </div>
        
        <div className="chatWindow" ref={chatWindowRef}>
          <div className="messageContainer">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.role === 'user' && <div className="userName">🖌️me</div>}
                {msg.role === 'assistant' && <div className="assistantName">🤖bot</div>}
                {msg.content}
              </div>
            ))}
          </div>
        </div>

        <div className="inputContainer">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input"
            placeholder="질문을 입력하세요..."
          />
          <button onClick={() => handleSend(userInput)} className="askbutton">Ask</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
