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

const subtitleStyle = {
    fontSize: '20px',
    color: '#333',
    marginBottom: '30px',
    fontWeight: 'bold',
};

const formStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const inputStyle = {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '10px',
    border: '1px solid #B0BEC5',
    width: '100%', // 입력 필드 가로 100%
};

const buttonStyle = {
    width: '100%', // 버튼을 컨테이너 너비에 맞추기
    padding: '15px',
    marginTop: '20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#3A3A3A', // 버튼 색상
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
    backgroundColor: '#ababab', // 버튼 호버 색상
};

const logoStyle = {
  height: '60px',
  width: 'auto',
};

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const handleSignup = async (e) => {
        e.preventDefault();
  
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        });
  
        const data = await res.json();
        if (res.status === 201) {
            alert("회원가입이 완료되었습니다.");
            navigate('/');
        } else {
            alert(data.error);
        }
    };

    return (
        <div style={containerStyle}>
            
            <div style={formStyle}>
            <Link to="/">
                    <img src={logo} alt="HansungUnv Logo" style={logoStyle} />
            </Link>
            <h2 style={subtitleStyle}>회원 정보를 입력해 주세요</h2>
                <input 
                    type="text" 
                    placeholder="아이디" 
                    style={inputStyle}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="비밀번호" 
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder="이메일" 
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                    style={buttonStyle} 
                    onClick={handleSignup}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    회원가입하기
                </button>
            </div>
        </div>
    );
}

export default SignupPage;
