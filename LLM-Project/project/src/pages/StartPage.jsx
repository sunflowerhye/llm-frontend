// StartPage.jsx

import React from 'react';
import Bar from './Bar';
import HeroSection from './HeroSection';
import Section from '../components/Section'; // 경로 확인

const containerStyle = {
    width: '100%',
    background: '#252B42',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};


function StartPage() {
    return (
        <div style={containerStyle}>
            <Bar />
            <HeroSection />
            <Section>
                <h2>Ask us a question!</h2>
                <p>Feel free to reach out to us for any inquiries related to physics.</p>
                {/* 추가적인 UI 요소를 여기에 추가 */}
            </Section>
        </div>
    );
}

export default StartPage;
