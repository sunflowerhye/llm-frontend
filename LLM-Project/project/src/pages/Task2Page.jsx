import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import '../css/Task1Page.css';

function Task2Page() {
    const [formData, setFormData] = useState({
        product1: '',
        product2: '',
    });
    const [comparisonData, setComparisonData] = useState(null);
    const [ingredientInfo, setIngredientInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
        if (!comparisonData) return;
    
        const paragraphs = [
            new Paragraph({ children: [new TextRun('성분 비교 결과')] }),
            new Paragraph({ children: [new TextRun(`첫 번째 제품: ${comparisonData.product1.name}`)] }),
            new Paragraph({ children: [new TextRun(`두 번째 제품: ${comparisonData.product2.name}`)] }),
            // 비교 결과 추가
        ];
    
        const doc = new Document({
            sections: [{
                children: paragraphs,
            }],
        });
    
        const blob = await Packer.toBlob(doc);
        saveAs(blob, '성분비교결과.docx');
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

    const handleCompare = async () => {
        setLoading(true);
        setError('');
        setComparisonData(null);
        setIngredientInfo('');
    
        try {
            const compareResponse = await axios.post('http://127.0.0.1:5000/task2/compare', {
                product1: formData.product1,
                product2: formData.product2,
                fileContent: fileContent, // 파일 내용을 함께 전송
            });
            setComparisonData(compareResponse.data);
    
            const commonIngredients = compareResponse.data.comparison.common_ingredients;
    
            // 공통 성분에 대한 추가 설명 요청
            if (!commonIngredients || commonIngredients.length === 0) {
                setIngredientInfo('공통 성분이 없어 추가 설명이 없습니다.');
            } else {
                try {
                    const explanation = await axios.post('http://127.0.0.1:5000/task2/explain', {
                        ingredients: commonIngredients,
                    });
                    setIngredientInfo(explanation.data.explanation || '설명이 제공되지 않았습니다.');
                } catch (explainError) {
                    console.error("OpenAPI 호출 실패:", explainError);
                    setIngredientInfo('OpenAPI 호출 중 문제가 발생했습니다. 서버 로그를 확인하세요.');
                }
            }
        } catch (compareError) {
            console.error("Compare API 호출 실패:", compareError);
            setError('제품 비교 중 문제가 발생했습니다. 입력값을 확인하세요.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="container">
            <div className="form-container">
                <h2>화장품 성분 비교</h2>
                {Object.keys(formData).map((key) => (
                    <div className="form-group" key={key}>
                        <label>{key === 'product1' ? '첫 번째 제품명' : '두 번째 제품명'}</label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            placeholder="제품명을 입력하세요"
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

                <button
                    className="generate-button"
                    onClick={handleCompare}
                    disabled={loading}
                >
                    {loading ? '비교 중...' : '비교하기'}
                </button>
            </div>

            <div className="info-container">
                <h2>비교 결과</h2>
                {error && <p className="error-message">{error}</p>}
                {comparisonData ? (
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>항목</th>
                                <th>{comparisonData.product1.name}</th>
                                <th>{comparisonData.product2.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>유사도 점수</td>
                                <td>{comparisonData.product1.score}</td>
                                <td>{comparisonData.product2.score}</td>
                            </tr>
                            <tr>
                                <td>공통 성분</td>
                                <td colSpan="2">
                                    {comparisonData.comparison.common_ingredients.join(', ') || '없음'}
                                </td>
                            </tr>
                            <tr>
                                <td>고유 성분</td>
                                <td>{comparisonData.comparison.unique_to_product1.join(', ') || '없음'}</td>
                                <td>{comparisonData.comparison.unique_to_product2.join(', ') || '없음'}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p className="generated-info">비교 결과가 여기에 표시됩니다.</p>
                )}
                {ingredientInfo && (
                    <div className="ingredient-info">
                        <h3>주요 성분 설명</h3>
                        <p>{ingredientInfo}</p>
                    </div>
                )}

<button className="download-button" onClick={handleDownload} disabled={!handleCompare}>
          파일 다운로드
        </button>

            </div>
        </div>
    );
}

export default Task2Page;
