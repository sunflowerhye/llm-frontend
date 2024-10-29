
// pages/ChatbotPage.js
import React from 'react';

const containerStyle = {
    width: '100%',
    background: '#252B42', // StartPage와 동일한 배경색
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // 수직 중앙 정렬
    height: '100vh', // 전체 화면 높이
};

const ChatbotPage = () => {
    return (
        <div style={containerStyle}>
            <h1>챗봇 페이지입니다.</h1>
            {/* 추가적인 UI 요소를 여기에 추가 */}
        </div>
    );
};

export default ChatbotPage;
