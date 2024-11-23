import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';

const containerStyle = {
    width: '100%',
    background: '#f1f1f1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '100px', // 여유 공간 조정
    boxSizing: 'border-box',
    minHeight: '100vh',
};

const inputStyle = {
    width: '350px',
    padding: '15px', // 패딩 조정
    margin: '10px 0', // 간격 조정
    borderRadius: '10px',
    border: '1px solid #B0BEC5',
    fontSize: '16px',
};

const buttonStyle = {
    width: '390px',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
};

const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3A3A3A', // 로그인 버튼 색상
    color: '#ffffff',
};

const signUpButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#00ff0000', // 회원가입 버튼 색상
    color: '#000000',
    border: '2px solid #000000'
};

const logoStyle = {
    height: '60px',
    width: 'auto',
    marginBottom: '20px', // 로고와 폼 간격 조정
};

function LoginPage({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/login', {  // 백엔드 URL에 맞게 수정
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.status === 200) {
            console.log('로그인 성공:', data.access_token); // 추가된 로그
            setToken(data.access_token);
            navigate('/');  // 로그인 후 홈 페이지로 이동
        } else {
            alert(data.error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);  // Enter 키가 눌리면 로그인 처리
        }
    };

    return (
        <div style={containerStyle}>
            <Link to="/">
                <img src={logo} alt="HansungUnv Logo" style={logoStyle} />
            </Link>
            <input 
                type="text" 
                placeholder="아이디" 
                style={inputStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress} // 엔터 키 눌렀을 때 로그인
            />
            <input 
                type="password" 
                placeholder="비밀번호" 
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress} // 엔터 키 눌렀을 때 로그인
            />
            <button 
                style={loginButtonStyle} 
                onClick={handleLogin}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ababab'} // 호버 효과
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3A3A3A'}
            >
                로그인
            </button>
            <button 
                style={signUpButtonStyle} 
                onClick={() => navigate('/signup')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dcdcdc'} // 호버 효과
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00ff0000'}
            >
                회원가입
            </button>
        </div>
    );
}

export default LoginPage;
