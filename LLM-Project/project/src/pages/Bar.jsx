import React from 'react';

import { Link, useNavigate } from 'react-router-dom'; // Link 임포트
import logo from '../img/logo.png';

const toolbarStyle = {
    width: '100%',
    height: '90px',
    margin: '0',
    opacity: '1',
    background: '#FFF5F5',
    display: 'flex',
    justifyContent: 'space-between', // 양쪽 정렬
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    padding: '0 5%', // 패딩을 %로 설정
    boxSizing: 'border-box',
    zIndex: '1000',
};

const logoStyle = {
    height: '60px',
    width: 'auto',
};

const menuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2em', // 간격을 em으로 설정
};

const loginStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5em', // 간격을 em으로 설정
};

const buttonStyle = {
    padding: '0.5em 1em', // em 단위로 설정
    backgroundColor: '#3A3A3A',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1em',
};

function Bar() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div style={toolbarStyle}>
            <Link to="/">
                <img src={logo} alt="HansungUnv Logo" style={logoStyle} />
            </Link>
            <div style={menuStyle}>
                <Link to="/" className="link">Home</Link>
                <Link to="/chatbot" className="link">Chatbot</Link>
                <Link to="/pricing" className="link">Pricing</Link>
                <Link to="/taskUI" className="link">TaskUI</Link>
            </div>
            <div style={loginStyle}>
                <Link to="/login" className="link">Login</Link>
                <button style={buttonStyle} onClick={handleSignUp}>Become a member</button>
            </div>
        </div>
    );
}

export default Bar;
