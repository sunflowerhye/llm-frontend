import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../img/logo.png';



const toolbarStyle = (isAuthPage) => ({
    width: '100%',
    height: '90px',
    margin: '0',
    opacity: '1',
    background: isAuthPage ? '#f1f1f1' : '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    padding: '0 5%',
    boxSizing: 'border-box',
    zIndex: '1000',
});

const logoStyle = {
    height: '60px',
    width: 'auto',
};

const menuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2em',
    fontSize: '18px',
};

const loginStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5em',
    fontSize: '18px',
};

const buttonStyle = {
    padding: '0.5em 1em',
    backgroundColor: '#3A3A3A',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s',
};

function Bar({ isLoggedIn, setToken }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    useEffect(() => {
        console.log(`isLoggedIn changed: ${isLoggedIn}`);
    }, [isLoggedIn]);

    const handleLogout = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            console.log('로그아웃 성공');
            localStorage.removeItem('token');
            setToken(null); // 상태 업데이트
            navigate('/'); // StartPage로 이동
        } else {
            const error = await res.json();
            alert(`Logout failed: ${error.message || res.status}`);
        }
    } catch (err) {
        console.error('Logout error:', err);
        alert('An unexpected error occurred. Please try again.');
    }
};


    return (
        <div style={toolbarStyle(isAuthPage)}>
            {!isAuthPage && (
                <>
                    <Link to="/">
                        <img src={logo} alt="HansungUnv Logo" style={logoStyle} />
                    </Link>
                    <div style={menuStyle}>
                        <Link to="/" className="link">Home</Link>
                        <Link to="/chatbot" className="link">Chatbot</Link>
                        <Link to="/service-guide" className="link">Service Guide</Link>
                        <Link to="/taskUI" className="link">TaskUI</Link>
                    </div>
                    <div style={loginStyle}>
                        {isLoggedIn ? (
                            <button
                                style={buttonStyle}
                                onClick={handleLogout}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ababab'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3A3A3A'}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="link">Login</Link>
                                <button
                                    style={buttonStyle}
                                    onClick={() => navigate('/signup')}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ababab'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3A3A3A'}
                                >
                                    Become a member
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Bar;
