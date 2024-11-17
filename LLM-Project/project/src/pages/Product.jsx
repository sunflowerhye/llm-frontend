import React, { useState } from 'react';

const ProductRecommendation = () => {
    const [selectedOptions, setSelectedOptions] = useState({
        whitening: false,
        waterproof: false,
        spf: false,
        pa: false,
        dry: false,
        oily: false,
    });

    const handleButtonClick = (option) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    const buttonStyle = {
        margin: '0 10px',
        padding: '10px 15px',
        minWidth: '120px', // 최소 너비 설정
        minHeight: '40px', // 최소 높이 설정
        backgroundColor: '#FFF', // 기본 배경색
        color: '#000', // 기본 텍스트 색
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div>
            <h2 style={{ color: '#000', textAlign: 'left' }}>원하는 제품 추천받기</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: selectedOptions.whitening ? '#FF6F61' : '#FFF',
                        color: selectedOptions.whitening ? '#FFF' : '#000',
                    }}
                    onClick={() => handleButtonClick('whitening')}
                >
                    미백케어
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: selectedOptions.waterproof ? '#FF6F61' : '#FFF',
                        color: selectedOptions.waterproof ? '#FFF' : '#000',
                    }}
                    onClick={() => handleButtonClick('waterproof')}
                >
                    방수기능
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: selectedOptions.spf ? '#FF6F61' : '#FFF',
                        color: selectedOptions.spf ? '#FFF' : '#000',
                    }}
                    onClick={() => handleButtonClick('spf')}
                >
                    SPF
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: selectedOptions.pa ? '#FF6F61' : '#FFF',
                        color: selectedOptions.pa ? '#FFF' : '#000',
                    }}
                    onClick={() => handleButtonClick('pa')}
                >
                    PA
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: selectedOptions.dry ? '#FF6F61' : '#FFF',
                        color: selectedOptions.dry ? '#FFF' : '#000',
                    }}
                    onClick={() => handleButtonClick('dry')}
                >
                    건성
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: selectedOptions.oily ? '#FF6F61' : '#FFF',
                        color: selectedOptions.oily ? '#FFF' : '#000',
                    }}
                    onClick={() => handleButtonClick('oily')}
                >
                    지성
                </button>
            </div>

            <div style={{ 
                marginTop: '20px', 
                background: '#FFF', 
                padding: '30px', 
                borderRadius: '10px', 
                width: '200%',  // 너비를 90%로 변경
                maxWidth: '800px', // 최대 너비를 800px로 변경
                minHeight: '400px', // 최소 높이를 400px로 설정
            }}>
                {selectedOptions.whitening && (
                    <div>
                        <h3>d'Alba UV Essence</h3>
                        <p>SPF 50+ PA+++ | 미백 효과</p>
                        <img src="path/to/image.jpg" alt="d'Alba UV Essence" />
                    </div>
                )}
                {selectedOptions.waterproof && (
                    <div>
                        <h3>방수 제품</h3>
                        <p>방수 기능이 있는 썬크림 소개</p>
                        <img src="path/to/another-image.jpg" alt="Waterproof Product" />
                    </div>
                )}
                {/* 추가적으로 SPF, PA, 건성, 지성 선택에 따른 제품 정보를 여기에 추가할 수 있습니다. */}
            </div>
        </div>
    );
};

export default ProductRecommendation;
