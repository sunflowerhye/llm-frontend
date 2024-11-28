import React, { useState } from 'react';
import axios from 'axios';
import '../css/Task1Page.css';

const Task3Page = () => {
  const [formData, setFormData] = useState({
    goal: '',
    strategy: '',
    targetAudience: '',
    budget: '',
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
      const response = await axios.post('http://127.0.0.1:5000/task3/generate-marketing-plan', formData);
      setGeneratedInfo(response.data.marketingPlan || '기획안 생성 중 오류가 발생했습니다.');
    } catch (error) {
      console.error('Error generating text:', error);
      setGeneratedInfo('문구 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/task3/download-marketing-plan',
        formData,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'event_plan.docx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const formFields = [
    { label: '목표', name: 'goal', placeholder: '목표를 입력하세요' },
    { label: '전략', name: 'strategy', placeholder: '전략을 입력하세요' },
    { label: '타겟 대상', name: 'targetAudience', placeholder: '타겟층을 입력하세요' },
    { label: '예산', name: 'budget', placeholder: '예산을 입력하세요' },
  ];

  return (
    <div className="container">
      <div className="form-container">
      <h2>기획안 제작</h2>
      {formFields.map(({ label, name, placeholder }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
            />
          </div>
        ))}
        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={loading}
          style={{ marginRight: '1rem' }} 
        >
          {loading ? '생성 중...' : '기획안 생성'}
        </button>   
      </div>
      <div className="info-container">
        <h2>생성된 기획안</h2>
        <div className="generated-info">
        <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              fontSize: '1em',
              textAlign: generatedInfo ? 'left' : 'center',
              fontFamily: 'Noto Sans KR',
            }}
          >
            {generatedInfo || '기획안 생성 버튼을 눌러주세요!'}
          </pre>
        </div>
        <button
          className="download-button"
          onClick={handleDownload}
          disabled={!generatedInfo}
        >
          파일 다운로드
        </button>
      </div>
    </div>
  );
};

export default Task3Page;
