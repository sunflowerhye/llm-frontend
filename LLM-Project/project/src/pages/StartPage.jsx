// StartPage.jsx

import React from 'react';
import Bar from './Bar';
import HeroSection from './HeroSection';
import Section from '../components/Section'; // 경로 확인

const containerStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const gradientSectionStyle1 = {
    width: '100%',
    height: '100vh', // 각 섹션의 높이를 100vh로 설정
    background: 'linear-gradient(135deg, #FFAF7B, #FFDA7B)', // 첫 번째 섹션 그라데이션
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
};

const gradientSectionStyle2 = {
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(135deg, #7BFFDA, #DA7BFF)', // 두 번째 섹션 그라데이션
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
};

const gradientSectionStyle3 = {
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(135deg, #DA7BFF, #B07BFF)', // 세 번째 섹션 그라데이션
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
};

function StartPage() {
    return (
        <div style={containerStyle}>
            <Bar />
            <HeroSection />

            <div style={gradientSectionStyle1}>
                <h2>Welcome to Task UI</h2>
            </div>
            <div style={gradientSectionStyle2}>
                <h2>Ask us a question!</h2>
                <p>Feel free to reach out to us for any inquiries related to physics.</p>
            </div>
            <div style={gradientSectionStyle3}>
                <h2>Contact Us</h2>
                <p>We're here to help you!</p>
            </div>
        </div>
    );
}

export default StartPage;
