import React from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    background: '#FFF5F5', // StartPage와 동일한 배경색
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // 수직 중앙 정렬
    height: '100vh', // 전체 화면 높이
};


const titleStyle = {
    fontSize: '32px',
    color: '#3A3A3A',
    marginBottom: '20px',
};

const inputStyle = {
    width: '350px',
    padding: '20px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #cccccc',
    fontSize: '16px',
};

const buttonStyle = {
    width: '390px',
    padding: '18px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
};

const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#B07F7F', // 로그인 버튼 색상
    color: '#ffffff',
};

const signUpButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#B07F7F', // 회원가입 버튼 색상
    color: '#000000',
};

const LoginPage = () => {

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSignUp = () => {
        navigate('/signup'); // 회원가입 페이지로 이동
    };
    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>HansungUnv</h1>
            <div style={{ height: '40px' }} /> {/* 간격을 위한 빈 div */}
            <input type="text" placeholder="아이디" style={inputStyle} />
            <input type="password" placeholder="비밀번호" style={inputStyle} />
            <div style={{ height: '30px' }} /> 
            <button style={loginButtonStyle}>로그인</button>
            <button style={signUpButtonStyle} onClick={handleSignUp}>회원가입</button>
        </div>
    );
};

export default LoginPage;

