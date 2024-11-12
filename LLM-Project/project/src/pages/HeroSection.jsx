import React, { useState, useEffect } from 'react';


const heroStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw', // 추가
    textAlign: 'center',
    backgroundImage: 'url(/StartPage2.jpg)', // 이미지 경로
    backgroundSize: 'cover', // 이미지가 화면을 가득 채우도록 설정
    backgroundPosition: 'center', // 이미지 중앙 정렬
    backgroundRepeat: 'no-repeat', // 이미지 반복 방지
    color: '#3A3A3A',
};

const titleStyle = {
    fontSize: '3rem', // 기본 폰트 크기 (더 크게 설정)
    marginTop: '80px', // 바와의 간격 추가
    marginBottom: '30px', // 아래쪽 여백 추가
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

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    };

    useEffect(() => {
        const interval = setInterval(nextCard, 3000); // 3초마다 카드 변경
        return () => clearInterval(interval); // 클린업 함수
    }, []);


    return (
        <div style={heroStyle}>
            <h1 style={titleStyle}>Task UI</h1>
            <p style={paragraphStyle}>We know how large objects will act, but things on a small scale just do not act that way.</p>
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
                            transform: `translateX(${(index - currentIndex) * 100}%)`,
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
