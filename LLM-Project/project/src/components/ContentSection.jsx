/*import React from 'react';

const contentStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '50px 0',
};

const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    width: '200px',
    color: '#000', // 텍스트 색상
    margin: '0 20px', // 카드 간격
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과
    transition: 'transform 0.2s', // 호버 효과를 위한 트랜지션
};

const iconStyle = {
    fontSize: '40px', // 아이콘 크기
    marginBottom: '10px', // 아이콘과 제목 간격
};

// 각 카드에 표시할 내용 및 색상 배열
const cardData = [
    {
        title: 'Books Library 1',
        description: 'The gradual accumulation of information about atomic and small-scale behaviour...',
        backgroundColor: '#3498db', // 파란색
        icon: '🔧', // 아이콘 (이모지 사용)
    },
    {
        title: 'Books Library 2',
        description: 'Exploring the fundamentals of modern physics and chemistry...',
        backgroundColor: '#bdc3c7', // 회색
        icon: '🔍', // 아이콘
    },
    {
        title: 'Books Library 3',
        description: 'A deep dive into the world of quantum mechanics and relativity...',
        backgroundColor: '#f1c40f', // 노란색
        icon: '📚', // 아이콘
    },
    {
        title: 'Books Library 4',
        description: 'Understanding the basics of programming and software development...',
        backgroundColor: '#e74c3c', // 빨간색
        icon: '💻', // 아이콘
    },
];

const ContentSection = () => {
    return (
        <div style={contentStyle}>
            {cardData.map((item, index) => (
                <div 
                    key={index} 
                    style={{ 
                        ...cardStyle, 
                        backgroundColor: item.backgroundColor 
                    }}>
                    <div style={iconStyle}>{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ContentSection;
*/