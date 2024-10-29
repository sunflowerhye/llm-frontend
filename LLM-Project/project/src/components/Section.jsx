
import React from 'react';

const Section = ({ backgroundColor, children }) => {
    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            color: '#fff',
        }}>
            {children}
        </div>
    );
};

export default Section;
