import React, { useState } from 'react';
import axios from 'axios';
import './Task1Page.css';

const Task1Page = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    productName: '',
    productInfo: '',
    keywords: '',
    targetAudience: '',
  });

  const [generatedInfo, setGeneratedInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `회사의 이름은 "${formData.companyName}"이고, 
              제품 이름은 "${formData.productName}"이며, 
              성분 정보는 "${formData.productInfo}"입니다. 
              홍보 키워드는 "${formData.keywords}"이고, 
              타겟 대상은 "${formData.targetAudience}"입니다. 
            이 정보를 바탕으로 제품을 홍보하는 문구를 만들어 주세요.`,
          },
        ],
        max_tokens: 500,
      }, {
        headers: {
          'Authorization': `Bearer `, // 여기에 OpenAI API 키 입력
          'Content-Type': 'application/json',
        },
      });

      setGeneratedInfo(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating text:', error);
      setGeneratedInfo('문구 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedInfo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_info.txt'; // 다운로드할 파일 이름
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // return (
  //   <div style="container">
  //     <div style="form-container">
  //       <h2>빠른 생성</h2>
  //       <div>
  //         <label>회사명 *</label>
  //         <input
  //           type="text"
  //           name="companyName"
  //           value={formData.companyName}
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <div>
  //         <label>제품 명 *</label>
  //         <input
  //           type="text"
  //           name="productName"
  //           value={formData.productName}
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <div>
  //         <label>성분 정보</label>
  //         <input
  //           type="text"
  //           name="productInfo"
  //           value={formData.productInfo}
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <div>
  //         <label>홍보 키워드 *</label>
  //         <input
  //           type="text"
  //           name="keywords"
  //           value={formData.keywords}
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <div>
  //         <label>타겟 대상 *</label>
  //         <input
  //           type="text"
  //           name="targetAudience"
  //           value={formData.targetAudience}
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <button onClick={handleGenerate}>자동 생성</button>
  //     </div>
  //     <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px' }}>
  //       <h2>홍보 문구</h2>
  //       <div>{generatedInfo || '자동 생성 버튼을 눌러주세요!'}</div>
  //       <button>파일 다운로드</button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="container">
      <div className="form-container">
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="입력하세요"
            />
          </div>
        ))}
        <button className="generate-button" onClick={handleGenerate} disabled={loading}>
          {loading ? '생성 중...' : '자동 생성'}
        </button>
      </div>
      <div className="info-container">
        <h2>홍보 문구</h2>
        <div className="generated-info">{generatedInfo || '자동 생성 버튼을 눌러주세요!'}</div>
        <button className="download-button" onClick={handleDownload} disabled={!generatedInfo}>
          파일 다운로드
        </button>
      </div>
    </div>
  );
};

export default Task1Page;
