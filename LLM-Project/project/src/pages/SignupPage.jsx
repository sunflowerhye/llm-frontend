import React from 'react';

const containerStyle = {
    width: '100%',
    background: '#252B42', // 배경색
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
    color: '#ffffff',
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


const SignupPage = () => {
    return (
        <div style={containerStyle}>
            
            <h2 style={subtitleStyle}>회원 정보를 입력해 주세요</h2>
            <div style={formStyle}>
                <input type="text" placeholder="아이디(이메일)" style={inputStyle} />
                <div style={{ height: '5px' }} /> 
                <input type="password" placeholder="비밀번호" style={inputStyle} />
                <div style={{ height: '5px' }} /> 
                <input type="password" placeholder="비밀번호 확인" style={inputStyle} />
                <div style={{ height: '5px' }} /> 
                <input type="text" placeholder="이름" style={inputStyle} />
                <div style={{ height: '5px' }} /> 
                <input type="text" placeholder="전화번호" style={inputStyle} />
                <div style={{ height: '10px' }} /> 
                
            </div>
                <button style={buttonStyle}>회원가입하기</button>
        </div>
    );
};

export default SignupPage;
