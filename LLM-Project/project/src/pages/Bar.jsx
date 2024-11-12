import React from 'react';

import { Link, useNavigate } from 'react-router-dom'; // Link 임포트

const toolbarStyle = {
    width: '100%', // 전체 너비를 차지하도록 설정
    height: '90px',
    margin: '0', // 기본 마진으로 설정
    opacity: '1', // 보이게 하려면 1로 설정
    background: '#FFF5F5',
    display: 'flex',
    justifyContent: 'center', // 중앙 정렬
    alignItems: 'center', // 수직 중앙 정렬 추가
    position: 'fixed', // 화면 상단에 고정
    top: '0', // 상단에 위치하도록 설정
    left: '0', // 왼쪽에 맞추도록 설정
    padding: '0 80px', // 좌우 패딩 추가
    boxSizing: 'border-box', // 패딩이 전체 너비에 포함되도록 설정
};

const logoStyle = {
    fontSize: '40px', // 로고 글자 크기
    fontWeight: 'bold', // 글자 두께
    fontFamily: 'Poppins, sans-serif', // 폰트 적용
};

const menuStyle = {
    display: 'flex',
    alignItems: 'center', // 수직 중앙 정렬 추가
    gap: '45px', // 메뉴 간격 설정
    padding: '0 100px', // 좌우 패딩 추가
    
};


const loginStyle = {
    display: 'flex',
    alignItems: 'center', // 수직 중앙 정렬
    gap: '25px', // 메뉴 간격 설정
    padding: '0 70px', // 좌우 패딩 추가
};

const buttonStyle = {
    padding: '10px 10px', // 버튼 패딩
    backgroundColor: '#3A3A3A', // 버튼 배경색
    color: '#ffffff', // 버튼 글자색
    border: 'none', // 테두리 없음
    borderRadius: '6px', // 둥근 모서리
    cursor: 'pointer', // 포인터 커서
    fontSize: '16px', // 글자 크기

    
};


function Bar() {

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSignUp = () => {
        navigate('/signup'); // 회원가입 페이지로 이동하는 함수
    };

    return (
        <div style={toolbarStyle}>
            <div style={logoStyle}>HansungUnv</div> {/* 로고 */}
                <div style={menuStyle}>
                <Link to="/" className="link">Home</Link>
                <Link to="/chatbot" className="link">Chatbot</Link>
                <Link to="/pricing" className="link">Pricing</Link>
                <Link to="/#contact" className="link">Contact</Link>

                <div style={loginStyle}>
                    <Link to="/login" className="link">Login</Link>
                        <div style={buttonStyle}>
                        <button style={buttonStyle} onClick={handleSignUp}>Become a member ➡️</button>
                        </div>
                    </div>
                    
                </div>
        </div>
    );
}

export default Bar;