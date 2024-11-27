import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import '../css/Task1Page.css';

const Task1Page = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    productName: '',
    productInfo: '',
    keywords: '',
    targetAudience: '',
  });

  const [generatedInfo, setGeneratedInfo] = useState('');
  const [loadingButton, setLoadingButton] = useState(''); // 클릭된 버튼 상태 관리
  
  const [fileContent, setFileContent] = useState(''); // 파일 내용 저장
  const [dragging, setDragging] = useState(false); // 드래그 상태 관리
  const [fileName, setFileName] = useState(''); // 파일 이름 상태 

  // 파일 업로드 처리
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFileName(file.name); // 파일 이름 저장
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result); // 파일 내용 저장
    };
    reader.readAsText(file); // 파일 내용을 텍스트로 읽음
  }
};

// 드래그 앤 드롭 시 파일 읽기 처리
const handleFileRead = (file) => {
  setFileName(file.name); // 파일 이름 저장
  const reader = new FileReader();
  reader.onload = (event) => {
    setFileContent(event.target.result); // 파일 내용 저장
  };
  reader.readAsText(file);
};

// 파일 드래그 앤 드롭 핸들러
const handleDrop = (e) => {
  e.preventDefault();
  setDragging(false);
  const file = e.dataTransfer.files[0];
  if (file) handleFileRead(file); // 파일 읽기 처리
};

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDownload = async () => {
    if (!generatedInfo) return;

    const paragraphs = generatedInfo.split('\n').map((line) =>
      new Paragraph({
        children: [new TextRun(line.trim())],
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

  const handleFileRemove = () => {
    setFileContent(''); // 파일 내용 초기화
    setFileName('');    // 파일 이름 초기화
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerate = async (endpoint) => {
    setLoadingButton(endpoint);
    try {
      // 파일 내용이 있으면 파일을, 없으면 폼 데이터를 서버로 전송
      const dataToSend = fileContent ? { fileContent } : formData;
  
      const response = await axios.post(`http://127.0.0.1:5000/task1/${endpoint}`, dataToSend);
      setGeneratedInfo(response.data.promoText);
    } catch (error) {
      console.error('문구 생성 중 오류가 발생했습니다:', error);
      setGeneratedInfo('문구 생성 중 오류가 발생했습니다.');
    } finally {
      setLoadingButton(''); // 로딩 상태 초기화
    }
  };

  const formFields = [
    { label: '회사명', name: 'companyName', placeholder: '회사명을 입력하세요' },
    { label: '제품명', name: 'productName', placeholder: '제품명을 입력하세요' },
    { label: '제품 정보', name: 'productInfo', placeholder: '제품의 기능 및 성분을 입력하세요' },
    { label: '키워드', name: 'keywords', placeholder: '강조하고 싶은 키워드를 입력하세요' },
    { label: '타겟 대상', name: 'targetAudience', placeholder: '타겟 대상을 입력하세요' },
  ]; 

  return (
    <div className="container">
      <div className="form-container">
        <h2>홍보 문구 생성</h2>
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
        <div className="form-group">
                {/* 드래그 앤 드롭 영역 */}
                <label>파일 첨부</label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  style={{
                    border: dragging ? '2px dashed #4caf50' : '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    backgroundColor: dragging ? '#f9fff9' : '#fff',
                  }}
          >
          {fileContent ? (
            <div>
              <p>
                <strong>업로드된 파일:</strong> {fileName}
              </p>
              <button
                onClick={handleFileRemove}
                style={{
                  padding: '5px 10px',
                  color: '#fff',
                  backgroundColor: '#ff4d4f',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                파일 삭제
              </button>
            </div>
          ) : (
            '여기로 파일을 드래그하거나 업로드 버튼을 사용하세요.'
          )}
        </div>

        {/* 파일 첨부 버튼 */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <label htmlFor="fileUpload" style={{ cursor: 'pointer', color: '#007BFF' }}>
            파일 업로드 클릭
          </label>
          <input
            id="fileUpload"
            type="file"
            accept=".txt,.csv,.json"
            onChange={handleFileUpload}
            style={{ display: 'none' }} // 숨기기
          />
        </div>
      </div>


        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button
            className="generate-button"
            onClick={() => handleGenerate('generate-promo-emotional')}
            disabled={loadingButton === 'generate-promo-emotional'}
          >
            {loadingButton === 'generate-promo-emotional'
              ? '감성적 홍보 생성 중...'
              : '감성적 홍보 생성'}
          </button>
          <button
            className="generate-button"
            onClick={() => handleGenerate('generate-promo-effect')}
            disabled={loadingButton === 'generate-promo-effect'}
          >
            {loadingButton === 'generate-promo-effect'
              ? '효과 강조 홍보 생성 중...'
              : '효과 강조 홍보 생성'}
          </button>
          <button
            className="generate-button"
            onClick={() => handleGenerate('generate-promo-humor')}
            disabled={loadingButton === 'generate-promo-humor'}
          >
            {loadingButton === 'generate-promo-humor'
              ? '유머 홍보 생성 중...'
              : '유머 홍보 생성'}
          </button>
          <button
            className="generate-button"
            onClick={() => handleGenerate('generate-promo-personalized')}
            disabled={loadingButton === 'generate-promo-personalized'}
          >
            {loadingButton === 'generate-promo-personalized'
              ? '맞춤형 홍보 생성 중...'
              : '맞춤형 홍보 생성'}
          </button>
        </div>
      </div>
      <div className="info-container">
        <h2>홍보 문구</h2>
        <div className="generated-info">{generatedInfo || '버튼을 눌러 홍보 문구를 생성하세요!'}</div>
        <button className="download-button" onClick={handleDownload} disabled={!generatedInfo}>
          파일 다운로드
        </button>
      </div>
    </div>
  );
};

export default Task1Page;
