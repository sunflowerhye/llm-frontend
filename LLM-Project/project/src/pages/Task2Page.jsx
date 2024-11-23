import React, { useState } from 'react';
import axios from 'axios';
import { translate } from '@vitalets/google-translate-api';
import '../css/TaskPage.css';

const Task2Page = () => {
  // const [formData, setFormData] = useState({
  //   companyName: '',
  //   productName: '',
  //   keywords: '',
  //   mood: '', 
  //   targetAudience: '',
  // });
  const [formData, setFormData] = useState({
    companyName: '', // 브랜드 이름
    productName: '', // 제품 이름
    productInfo: '', // 제품의 주요 기능 및 효과
    symbol: '', // 제품의 효과를 상징하는 시각적 요소(ex: 수분을 위한 물방울 ..)
    keywords: '', // 행동 유도 문구
    color: '', // 사용자 지정 색상
    //size: '512x512'
  });

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const translateText = async (text) => {
    try {
      const res = await translate(text, { to: 'en' });
      return res.text; // 번역된 텍스트 반환
    } catch (error) {
      console.error('Translation error:', error);
      return text; // 오류 발생 시 원본 텍스트 반환
    }
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    setErrorMessage('');

    try {

      // 입력값을 영어로 번역
      const translatedCompanyName = await translateText(formData.companyName);
      const translatedProductName = await translateText(formData.productName);
      const translatedProductInfo = await translateText(formData.productInfo);
      const translatedSymbol = await translateText(formData.symbol);
      const translatedKeywords = await translateText(formData.keywords);
      const translatedColor = await translateText(formData.color); 
     
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        prompt: `Create a luxury advertisement banner for the brand "${translatedCompanyName}". 
        The product being promoted is called "${translatedProductName}"
         and is known for its "${translatedProductInfo}".
          The design should incorporate a visual element symbolizing its effect, such as "${translatedSymbol}".
           Use the color "${translatedColor}" as the main theme to create a cohesive, fresh, and appealing look. 
           The banner should highlight the following key message: "${translatedKeywords}". Ensure that the design is elegant, minimalistic, 
           and premium, and make the advertisement size ${formData.size}.`,
        n: 1,
        size: '512x512',
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error('Error generating image:', error);
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  };


  const handleDownload = () => {
    if (!imageUrl) return;

    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'generated_image.png'; // 다운로드할 파일 이름
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="task-container">
      <div className="form-container">
        <div className="form-group">
          <label>회사명</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="회사명을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>제품명</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="제품명을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>제품 기능 및 효과</label>
          <input
            type="text"
            name="productInfo"
            value={formData.productInfo}
            onChange={handleChange}
            placeholder="제품의 기능 및 효과를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>시각적 요소</label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            placeholder="시각적 요소(예: 물방울)를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>키워드</label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="강조하고 싶은 키워드를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>색상</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="원하는 분위기의 색상을 입력하세요"
          />
        </div>

        {/* 배너 사이즈 선택 */}
        {/* <div className="form-group">
          <label>배너 사이즈</label>
          <select name="size" value={formData.size} onChange={handleChange}>
            <option value="1024x1024">Square (1024x1024)</option>
            <option value="1792x1024">Wide (1792x1024)</option>
            <option value="1024x1792">Tall (1024x1792)</option>
          </select>
        </div> */}

        <button className="generate-button" onClick={handleGenerateImage} disabled={loading}>
          {loading ? '생성 중...' : '이미지 생성'}
        </button>
      </div>

      <div className="info-container">
        <h2>생성된 광고 이미지</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="Generated Advertisement" style={{ maxWidth: '100%', height: 'auto' }} />
            <button className="download-button" onClick={handleDownload}>
              이미지 다운로드
            </button>
          </div>
        ) : (
          <div>이미지 생성 버튼을 눌러주세요!</div>
        )}
      </div>
    </div>
  );
};

export default Task2Page;
