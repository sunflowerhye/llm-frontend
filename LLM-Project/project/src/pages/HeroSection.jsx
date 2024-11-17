import React, { useState, useEffect } from 'react';

// 배경 이미지 배열
// 일단 이 부분에는 홍보글처럼 들어갈 예정인데 우선 사진으로 첨부해둠 
const images = [
    '/StartPage1.jpg',
    '/StartPage2.jpg',
    '/StartPage3.jpg',
    // 추가 이미지 경로를 여기에 넣어주세요s
];

const titleStyle = {
    fontSize: '4rem', // 기본 폰트 크기 (더 크게 설정)
    marginTop: '80px', // 바와의 간격 추가
    color: '#000000', // 검정색으로 설정
    marginBottom: '30px', // 아래쪽 여백 추가
    fontFamily: 'Great Vibes, cursive',
};

const paragraphStyle = {
    marginBottom: '30px', // 버튼과의 간격을 위해 아래 여백 추가
};

const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // 카드 중앙 정렬
    alignItems: 'center',
    overflow: 'hidden', // 카드가 컨테이너를 넘어가면 보이지 않도록 설정
    width: '100%',
    position: 'relative',
};


const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    width: '300px',
    color: '#000',
    margin: '0 10px', // 카드 간격을 넓히기 위해 양쪽에 여백 추가
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.5s ease',
    position: 'relative', // 카드의 position을 relative로 변경
};

const iconStyle = {
    fontSize: '40px',
    marginBottom: '10px',
};

const cardData = [
    {
        title: 'Task Ui 1',
        description: 'The gradual accumulation of information about atomic and small-scale behaviour...',
        backgroundColor: '#FFF5F5',
        icon: '🔧',
    },
    {
        title: 'Task Ui 2',
        description: 'Exploring the fundamentals of modern physics and chemistry...',
        backgroundColor: '#FFF5F5',
        icon: '🔍',
    },
    {
        title: 'Task Ui 3',
        description: 'A deep dive into the world of quantum mechanics and relativity...',
        backgroundColor: '#FFF5F5',
        icon: '📚',
    },
    {
        title: 'Task Ui 4',
        description: 'Understanding the basics of programming and software development...',
        backgroundColor: '#FFF5F5',
        icon: '💻',
    },
];

function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // 5초마다 배경 변경
        return () => clearInterval(interval); // 클린업 함수
    }, []);

    const heroStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        textAlign: 'center',
        backgroundImage: `url(${images[currentImageIndex]})`, // 현재 배경 이미지 설정
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#3A3A3A',
        transition: 'background-image 1s ease-in-out', // 부드러운 전환 효과
    };

    return (
        <div style={heroStyle}>
            <h3 style={titleStyle}>Beauty Sync</h3>
            <p style={paragraphStyle}>당신의 피부를 지킬 수 있는 유일한 방법</p>
            <button style={{ padding: '15px 30px', backgroundColor: '#007BFF', color: '#ffffff', border: 'none', borderRadius: '5px', marginBottom: '150px' }}>
                Join Us
            </button>
            <div style={cardContainerStyle}>
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            ...cardStyle,
                            backgroundColor: card.backgroundColor,
                        }}
                    >
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
