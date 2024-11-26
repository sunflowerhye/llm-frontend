// import React, { useState } from 'react';
// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import { Document, Packer, Paragraph, TextRun } from 'docx';
// import '../css/TaskPage.css';

// const Task2Page = () => {
//   const [formData, setFormData] = useState({
//     product1: '',
//     product2: '',
// });

//   const [generatedInfo, setGeneratedInfo] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [comparisonData, setComparisonData] = useState(null);
//   const [ingredientInfo, setIngredientInfo] = useState('');
  
//   const [error, setError] = useState('');
//   const [fileContent, setFileContent] = useState(''); // 파일 내용 저장
//   const [dragging, setDragging] = useState(false); // 드래그 상태 관리
//   const [fileName, setFileName] = useState(''); // 파일 이름 상태 
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleGenerate = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'https://api.openai.com/v1/chat/completions',
//         {
//           model: 'gpt-4',
//           messages: [
//             {
//               role: 'system',
//               content: '당신은 한국어로 성분 정보를 설명하는 어시스턴스입니다.'
            
//             },
//           ],
//           max_tokens: 1500,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setGeneratedInfo(response.data.choices[0].message.content);
//     } catch (error) {
//       console.error('Error generating text:', error);
//       setGeneratedInfo('문구 생성 중 오류가 발생했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompare = async () => {
//     setLoading(true);
//     setError('');
//     setComparisonData(null);
//     setIngredientInfo('');

//     try {
//         const compareResponse = await axios.post('http://127.0.0.1:5000/task4/compare', formData);
//         setComparisonData(compareResponse.data);

//         const commonIngredients = compareResponse.data.comparison.common_ingredients;

//         // 공통 성분에 대한 추가 설명 요청
//         if (!commonIngredients || commonIngredients.length === 0) {
//             setIngredientInfo('공통 성분이 없어 추가 설명이 없습니다.');
//         } else {
//             try {
//                 const explanation = await axios.post('http://127.0.0.1:5000/task4/explain', {
//                     ingredients: commonIngredients,
//                 });
//                 setIngredientInfo(explanation.data.explanation || '설명이 제공되지 않았습니다.');
//             } catch (explainError) {
//                 console.error("OpenAPI 호출 실패:", explainError);
//                 setIngredientInfo('OpenAPI 호출 중 문제가 발생했습니다. 서버 로그를 확인하세요.');
//             }
//         }
//     } catch (compareError) {
//         console.error("Compare API 호출 실패:", compareError);
//         setError('제품 비교 중 문제가 발생했습니다. 입력값을 확인하세요.');
//     } finally {
//         setLoading(false);
//     }
// };

//  // 파일 업로드 처리
// const handleFileUpload = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     setFileName(file.name); // 파일 이름 저장
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setFileContent(event.target.result); // 파일 내용 저장
//     };
//     reader.readAsText(file); // 파일 내용을 텍스트로 읽음
//   }
// };

// // 드래그 앤 드롭 시 파일 읽기 처리
// const handleFileRead = (file) => {
//   setFileName(file.name); // 파일 이름 저장
//   const reader = new FileReader();
//   reader.onload = (event) => {
//     setFileContent(event.target.result); // 파일 내용 저장
//   };
//   reader.readAsText(file);
// };

// // 파일 드래그 앤 드롭 핸들러
// const handleDrop = (e) => {
//   e.preventDefault();
//   setDragging(false);
//   const file = e.dataTransfer.files[0];
//   if (file) handleFileRead(file); // 파일 읽기 처리
// };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = () => {
//     setDragging(false);
//   };

//   const handleDownload = async () => {
//     if (!generatedInfo) return;

//     const paragraphs = generatedInfo.split('\n').map((line) =>
//       new Paragraph({
//         children: [new TextRun(line.trim())],
//         spacing: { after: 300 },
//       })
//     );

//     const doc = new Document({
//       sections: [
//         {
//           children: paragraphs,
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);

//     saveAs(blob, 'generated_info.docx');
//   };

//   const handleFileRemove = () => {
//     setFileContent(''); // 파일 내용 초기화
//     setFileName('');    // 파일 이름 초기화
//   };

  
//   return (
//     <div className="task-container">
//       <div className="form-container">
//       <h2>화장품 성분 비교</h2>
//                 {Object.keys(formData).map((key) => (
//                     <div className="form-group" key={key}>
//                         <label>{key === 'product1' ? '첫 번째 제품명' : '두 번째 제품명'}</label>
//                         <input
//                             type="text"
//                             name={key}
//                             value={formData[key]}
//                             onChange={handleChange}
//                             placeholder="제품명을 입력하세요"
//                         />
//                     </div>
//                 ))}
//                 <button
//                     className="generate-button"
//                     onClick={handleCompare}
//                     disabled={loading}
//                 >
//                     {loading ? '비교 중...' : '비교하기'}
//                 </button>
//       <div className="form-group">
//         {/* 드래그 앤 드롭 영역 */}
//         <label>파일 첨부</label>
//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           style={{
//             border: dragging ? '2px dashed #4caf50' : '2px dashed #ccc',
//             padding: '20px',
//             textAlign: 'center',
//             marginBottom: '20px',
//             backgroundColor: dragging ? '#f9fff9' : '#fff',
//           }}
//         >
//           {fileContent ? (
//             <div>
//               <p>
//                 <strong>업로드된 파일:</strong> {fileName}
//               </p>
//               <button
//                 onClick={handleFileRemove}
//                 style={{
//                   padding: '5px 10px',
//                   color: '#fff',
//                   backgroundColor: '#ff4d4f',
//                   border: 'none',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   marginTop: '10px',
//                 }}
//               >
//                 파일 삭제
//               </button>
//             </div>
//           ) : (
//             '여기로 파일을 드래그하거나 업로드 버튼을 사용하세요.'
//           )}
//         </div>



//         {/* 파일 첨부 버튼 */}
//         <div style={{ textAlign: 'center', marginTop: '10px' }}>
//           <label htmlFor="fileUpload" style={{ cursor: 'pointer', color: '#007BFF' }}>
//             파일 업로드 클릭
//           </label>
//           <input
//             id="fileUpload"
//             type="file"
//             accept=".txt,.csv,.json"
//             onChange={handleFileUpload}
//             style={{ display: 'none' }} // 숨기기
//           />
//         </div>
//       </div>

//       <button
//                     className="generate-button"
//                     onClick={handleCompare}
//                     disabled={loading}
//                 >
//                     {loading ? '비교 중...' : '비교하기'}
//                 </button>
//             </div>

//             <div className="info-container">
//                 <h2>비교 결과</h2>
//                 {error && <p className="error-message">{error}</p>}
//                 {comparisonData ? (
//                     <table className="comparison-table">
//                         <thead>
//                             <tr>
//                                 <th>항목</th>
//                                 <th>{comparisonData.product1.name}</th>
//                                 <th>{comparisonData.product2.name}</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>유사도 점수</td>
//                                 <td>{comparisonData.product1.score}</td>
//                                 <td>{comparisonData.product2.score}</td>
//                             </tr>
//                             <tr>
//                                 <td>공통 성분</td>
//                                 <td colSpan="2">
//                                     {comparisonData.comparison.common_ingredients.join(', ') || '없음'}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>고유 성분</td>
//                                 <td>{comparisonData.comparison.unique_to_product1.join(', ') || '없음'}</td>
//                                 <td>{comparisonData.comparison.unique_to_product2.join(', ') || '없음'}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="generated-info">비교 결과가 여기에 표시됩니다.</p>
//                 )}
//                 {ingredientInfo && (
//                     <div className="ingredient-info">
//                         <h3>주요 성분 설명</h3>
//                         <p>{ingredientInfo}</p>
//                     </div>
//                 )}
//             </div>
        
//         <button className="download-button" onClick={handleDownload} disabled={!generatedInfo}>
//           파일 다운로드
//         </button>
//       </div>

//   );
// };

// export default Task2Page;


import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import '../css/TaskPage.css';

const Task2Page = () => {
  const [formData, setFormData] = useState({
    product1: '',
    product2: '',
  });

  const [comparisonData, setComparisonData] = useState(null); // 비교 결과를 저장
  const [ingredientInfo, setIngredientInfo] = useState(''); // 성분 정보
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // 에러 메시지

  const [fileContent, setFileContent] = useState(''); // 파일 내용 저장
  const [dragging, setDragging] = useState(false); // 드래그 상태 관리
  const [fileName, setFileName] = useState(''); // 파일 이름 상태 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    if (!ingredientInfo) return;

    const paragraphs = ingredientInfo.split('\n').map((line) =>
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


  const callOpenAIAPI = async (messages, model = 'gpt-3.5-turbo', maxTokens = 1200) => {
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model,
          messages,
          max_tokens: maxTokens,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API 호출 오류:', error);
      return '오류로 인해 데이터를 처리할 수 없습니다.';
    }
  };

  const handleCompare = async () => {
    setLoading(true);
    setError('');
    const { product1, product2 } = formData;

    // 업로드된 파일 내용도 포함시킴
    const fileInput = fileContent ? `\n\n파일 내용: ${fileContent}` : '';

    if (!fileContent && (!product1 || !product2)) {
      setError('제품명을 모두 입력해 주세요.');
      setLoading(false);
      return;
    }

    const messages = [
      {
        role: 'system',
        content: '당신은 한국어로 성분 정보를 설명하는 어시스턴트입니다.',
      },
      {
        role: 'user',
        content: `다음 두 제품의 성분을 비교하고, 공통 성분과 각 제품의 독특한 성분을 알려주세요:
        - 제품 1: ${product1 || '파일에서 정보를 가져올 수 있습니다.'}
        - 제품 2: ${product2 || '파일에서 정보를 가져올 수 있습니다.'}
        
        파일이 있다면 ${fileInput}을 참조해주세요.`,
      },
    ];

    try {
      const comparisonText = await callOpenAIAPI(messages);
      console.log('API 응답:', comparisonText);  // 응답을 로그로 출력

      // 응답을 그대로 사용
      setComparisonData(comparisonText);  // 텍스트로 저장
      setIngredientInfo('');  // 성분 설명은 아직 필요없음
      
    } catch (error) {
      console.error('비교 생성 오류:', error);  // 오류 로그
      setComparisonData(null);
      setIngredientInfo('');
      setError('비교 결과 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>제품 성분 비교</h2>
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
                <th>{formData.product1}</th>
                <th>{formData.product2}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>유사도 점수</td>
                <td>내용 없음</td> {/* 유사도 점수는 API 응답에 따라 추가 */}
                <td>내용 없음</td> {/* 유사도 점수는 API 응답에 따라 추가 */}
              </tr>
              <tr>
                <td>공통 성분</td>
                <td colSpan="2">
                  {comparisonData.includes('공통 성분') ? comparisonData : '없음'}
                </td>
              </tr>
              <tr>
                <td>고유 성분</td>
                <td>{comparisonData.includes('고유 성분') ? comparisonData : '없음'}</td>
                <td>{comparisonData.includes('고유 성분') ? comparisonData : '없음'}</td>
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
        <button className="download-button" onClick={handleDownload} disabled={!ingredientInfo}>
          파일 다운로드
        </button>
      </div>
    </div>
  );
};

export default Task2Page;


