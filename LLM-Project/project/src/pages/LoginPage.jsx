import React, { useState } from 'react';
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

function LoginPage({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const res = await fetch('http://3.37.44.224:5000/login', {  // 백엔드 URL에 맞게 수정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
      if (res.status === 200) {
        setToken(data.access_token);
        alert('로그인 성공!');
        navigate('/dashboard');  // 로그인 후 대시보드 페이지로 이동
      } else {
        alert(data.error);
      }
    };
  
    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>HansungUnv</h1>
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
        <button style={loginButtonStyle} onClick={handleLogin}>로그인</button>
        <button style={signUpButtonStyle} onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    );
  }
  
  export default LoginPage;