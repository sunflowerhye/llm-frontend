import React from 'react';

const heroStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundImage: 'url(your-image-url)', // 배경 이미지 URL
    backgroundSize: 'cover',
    color: '#ffffff',
};

const titleStyle = {
    fontSize: '3rem', // 기본 폰트 크기 (더 크게 설정)
    marginTop: '120px', // 바와의 간격 추가
    marginBottom: '40px', // 아래쪽 여백 추가
};

const paragraphStyle = {
    marginBottom: '60px', // 버튼과의 간격을 위해 아래 여백 추가
};

const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '20px 0',
};


const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    width: '200px',
    color: '#000',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
};

const iconStyle = {
    fontSize: '40px',
    marginBottom: '10px',
};



const cardData = [
    {
        title: 'Books Library 1',
        description: 'The gradual accumulation of information about atomic and small-scale behaviour...',
        backgroundColor: '#3498db',
        icon: '🔧',
    },
    {
        title: 'Books Library 2',
        description: 'Exploring the fundamentals of modern physics and chemistry...',
        backgroundColor: '#bdc3c7',
        icon: '🔍',
    },
    {
        title: 'Books Library 3',
        description: 'A deep dive into the world of quantum mechanics and relativity...',
        backgroundColor: '#f1c40f',
        icon: '📚',
    },
    {
        title: 'Books Library 4',
        description: 'Understanding the basics of programming and software development...',
        backgroundColor: '#e74c3c',
        icon: '💻',
    },
];


function HeroSection() {
    return (
        <div style={heroStyle}>
            <h1 style={titleStyle}>Task UI</h1>
            <p style={paragraphStyle}>We know how large objects will act, but things on a small scale just do not act that way.</p>
            <button style={{ padding: '15px 30px', backgroundColor: '#007BFF', color: '#ffffff', border: 'none', borderRadius: '5px', marginBottom: '150px' }}>
                Join Us
            </button>
            <div style={cardContainerStyle}>
                {cardData.map((card, index) => (
                    <div key={index} style={{ ...cardStyle, backgroundColor: card.backgroundColor }}>
                        <div style={iconStyle}>{card.icon}</div>
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
        
    );
}

export default HeroSection;
