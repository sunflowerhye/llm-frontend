import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Bot.css'; // CSS 파일 import

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하세요! Beauty Sync 챗봇입니다. 궁금한 것이 있으면 물어보세요!' }
  ]);
  const [userInput, setUserInput] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // token이 있으면 true, 없으면 false로 설정
  }, []);

  const handleSend = async () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages); 
    setUserInput(''); 

    const prompt = ` 
    당신은 뷰티 산업에 특화된 챗봇 BeautyBot입니다. 
    아래 질문에 대한 답변을 작성할 때, 구체적이고 창의적인 방식으로 작성해 주세요. 
    항상 뷰티 업계의 최신 트렌드, 전문 용어, 고객 관점 등을 반영해 답변을 제공하세요.
    `;

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
          max_tokens: 200,
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

      setMessages((prevMessages) => [...prevMessages, { role: 'user', content: userInput }]);

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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <div className="chatcontainer">
        <div className="chatHeader">Beauty Sync. Chatbot 💬</div> 

        <div className="chatlist">
          <button onClick={() => handleSend()} className="keywordsbutton">트렌드</button>
          <button onClick={() => handleSend()} className="keywordsbutton">홍보 전략</button>
          <button onClick={() => handleSend()} className="keywordsbutton">박람회</button>
          <button onClick={() => handleSend()} className="keywordsbutton">캠페인</button>
          <button onClick={() => handleSend()} className="keywordsbutton">슬로건</button>
          <button onClick={() => handleSend()} className="keywordsbutton">광고 문구</button>
        </div>
        
        <div className="chatWindow">
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
          />
          <button onClick={handleSend} className="button">전송</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
