import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    background: '#FFF5F5', // 배경색
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // 상단 정렬
    padding: '230px',
    boxSizing: 'border-box',
    minHeight: '100vh', // 최소 높이 설정
};

const subtitleStyle = {
    fontSize: '15px',
    color: '#3A3A3A',
    marginBottom: '15px',
};

const formStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
};

const inputStyle = {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #cccccc',
};

const buttonStyle = {
    width: '40%', // 버튼을 컨테이너 너비에 맞추기
    padding: '14px',
    marginTop: '30px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#B07F7F',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '18px',
};


function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const handleSignup = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
  
      const res = await fetch('http://localhost:5000/signup', {  // 백엔드 URL에 맞게 수정
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
        <h2 style={subtitleStyle}>회원 정보를 입력해 주세요</h2>
        <div style={formStyle}>
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
            type="password" 
            placeholder="비밀번호 확인" 
            style={inputStyle}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="이메일" 
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button style={buttonStyle} onClick={handleSignup}>회원가입하기</button>
        </div>
      </div>
    );
  }
  
  export default SignupPage;