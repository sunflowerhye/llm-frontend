import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import './Task1Page.css';

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
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `
            홍보 기획안 작성:
                - 목표: ${formData.goal}
                - 전략: ${formData.strategy}
                - 타겟층: ${formData.targetAudience}
                - 예산: ${formData.budget}

                이 정보를 바탕으로 제품 홍보를 위한 기획안을 작성해줘.
            `,
          },
        ],
        max_tokens: 1500,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
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

  const handleDownload = async () => {
    if (!generatedInfo) return;

    const paragraphs = generatedInfo.split('\n').map((line) => 
      new Paragraph({
        children: [
          new TextRun(line.trim()),
        ],
        spacing: { after: 300 }, 
      })
    );

    const doc = new Document({
      sections: [
        {
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    saveAs(blob, 'generated_info.docx');
  };

  return (
    <div className="task-container">
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
        <h2>생성된 기획안</h2>
        <div className="generated-info">{generatedInfo || '자동 생성 버튼을 눌러주세요!'}</div>
        <button className="download-button" onClick={handleDownload} disabled={!generatedInfo}>
          파일 다운로드
        </button>
      </div>
    </div>
  );
};

export default Task3Page;
