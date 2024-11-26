// import React, { useState } from 'react';
// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import { Document, Packer, Paragraph, TextRun } from 'docx';
// import '../css/TaskPage.css';

// const Task1Page = () => {

//   const [formData, setFormData] = useState({
//     companyName: '',
//     productName: '',
//     productInfo: '',
//     keywords: '',
//     targetAudience: '',
//   });

//   const [generatedInfo, setGeneratedInfo] = useState('');
//   const [loading, setLoading] = useState(false);
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
//       const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//         model: 'gpt-4',
//         messages: [
//           {
//             role: 'user',
//             content: `회사의 이름은 "${formData.companyName}"이고, 
//               제품 이름은 "${formData.productName}"이며, 
//               성분 정보는 "${formData.productInfo}"입니다. 
//               홍보 키워드는 "${formData.keywords}"이고, 
//               타겟 대상은 "${formData.targetAudience}"입니다. 
//             이 정보를 바탕으로 제품을 홍보하는 문구를 만들어 주세요.
//             추가 파일 내용: ${fileContent}`,
//           },
//         ],
//         max_tokens: 500,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       setGeneratedInfo(response.data.choices[0].message.content);
//     } catch (error) {
//       console.error('Error generating text:', error);
//       setGeneratedInfo('문구 생성 중 오류가 발생했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleDownload = () => {
//   //   const blob = new Blob([generatedInfo], { type: 'text/plain' });
//   //   const url = URL.createObjectURL(blob);
//   //   const a = document.createElement('a');
//   //   a.href = url;
//   //   a.download = 'generated_info.txt'; // 다운로드할 파일 이름
//   //   document.body.appendChild(a);
//   //   a.click();
//   //   document.body.removeChild(a);
//   //   URL.revokeObjectURL(url);
//   // };

//   // 파일 업로드 처리
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
//       <div className="form-group">
//           <label>회사명</label>
//           <input
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             placeholder="회사명을 입력하세요"
//           />
//         </div>
//         <div className="form-group">
//           <label>제품명</label>
//           <input
//             type="text"
//             name="productName"
//             value={formData.productName}
//             onChange={handleChange}
//             placeholder="제품명을 입력하세요"
//           />
//         </div>
//         <div className="form-group">
//           <label>제품 정보</label>
//           <input
//             type="text"
//             name="productInfo"
//             value={formData.productInfo}
//             onChange={handleChange}
//             placeholder="제품의 기능 및 성분을 입력하세요"
//           />
//         </div>
//         <div className="form-group">
//           <label>키워드</label>
//           <input
//             type="text"
//             name="keywords"
//             value={formData.keywords}
//             onChange={handleChange}
//             placeholder="강조하고 싶은 키워드를 입력하세요"
//           />
//         </div>
//         <div className="form-group">
//           <label>타겟 대상</label>
//           <input
//             type="text"
//             name="targetAudience"
//             value={formData.color}
//             onChange={handleChange}
//             placeholder="타겟 대상을 입력하세요"
//           />
//         </div>
//         <div className="form-group">
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
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
//       <button
//             className="generate-button"
//             onClick={() => handleGenerate('generate-promo-emotional')}
//             disabled={loading}
//           >
//             {loading ? '감성적 홍보 생성 중...' : '감성적 홍보 생성'}
//           </button>
//           <button
//             className="generate-button"
//             onClick={() => handleGenerate('generate-promo-effect')}
//             disabled={loading}
//           >
//             {loading ? '효과 강조 홍보 생성 중...' : '효과 강조 홍보 생성'}
//           </button>
//           <button
//             className="generate-button"
//             onClick={() => handleGenerate('generate-promo-storytelling')}
//             disabled={loading}
//           >
//             {loading ? '스토리텔링 홍보 생성 중...' : '스토리텔링 홍보 생성'}
//           </button>
//           </div>
//       </div>
      
//       <div className="info-container">     
//         <h2>홍보 문구</h2>
//         <div className="generated-info">{generatedInfo || '자동 생성 버튼을 눌러주세요!'}</div>
//         <button className="download-button" onClick={handleDownload} disabled={!generatedInfo}>
//           파일 다운로드
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Task1Page;



import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import '../css/TaskPage.css';

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


  const callOpenAIAPI = async (messages, model = 'gpt-3.5-turbo', maxTokens = 1200) => {
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY
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

  const handleGenerate = async (type) => {
    setLoading(true);
    const { companyName, productName, productInfo, keywords, targetAudience } = formData;
  
    // 업로드된 파일 내용도 포함시킴
    const fileInput = fileContent ? `\n\n파일 내용: ${fileContent}` : '';
  
    const promptTemplates = {
      'generate-promo-emotional': `다음은 제품 정보입니다:
  - 회사명: ${companyName}
  - 제품명: ${productName}
  - 제품 설명: ${productInfo}
  - 홍보 키워드: ${keywords}
  - 타겟 대상: ${targetAudience}
  
  제품의 느낌과 감동을 전하는 감성적인 홍보 문구를 한국어로 자연스럽게 작성해주세요. ${fileInput}`,
      'generate-promo-effect': `다음은 제품 정보입니다:
  - 회사명: ${companyName}
  - 제품명: ${productName}
  - 제품 설명: ${productInfo}
  - 홍보 키워드: ${keywords}
  - 타겟 대상: ${targetAudience}
  
  제품의 주요 효과와 뛰어난 특징을 강조하는 홍보 문구를 한국어로 자연스럽게 작성해주세요. ${fileInput}`,
      'generate-promo-storytelling': `다음은 제품 정보입니다:
  - 회사명: ${companyName}
  - 제품명: ${productName}
  - 제품 설명: ${productInfo}
  - 홍보 키워드: ${keywords}
  - 타겟 대상: ${targetAudience}
  
  제품의 스토리를 전달할 수 있는 홍보 문구를 한국어로 자연스럽게 작성해주세요. ${fileInput}`,
    };
  
    const messages = [
      { role: 'system', content: '당신은 마케팅 전문가입니다.' },
      { role: 'user', content: promptTemplates[type] },
    ];
  
    try {
      const promoText = await callOpenAIAPI(messages);
      setGeneratedInfo(promoText);
    } catch (error) {
      setGeneratedInfo('문구 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container">
      <div className="form-container">
        <h2>홍보 문구 생성기</h2>
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
          <label>제품 정보</label>
          <input
            type="text"
            name="productInfo"
            value={formData.productInfo}
            onChange={handleChange}
            placeholder="제품의 기능 및 성분을 입력하세요"
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
          <label>타겟 대상</label>
          <input
            type="text"
            name="targetAudience"
            value={formData.color}
            onChange={handleChange}
            placeholder="타겟 대상을 입력하세요"
          />
        </div>

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
            disabled={loading}
          >
            {loading ? '감성적 홍보 생성 중...' : '감성적 홍보 생성'}
          </button>
          <button
            className="generate-button"
            onClick={() => handleGenerate('generate-promo-effect')}
            disabled={loading}
          >
            {loading ? '효과 강조 홍보 생성 중...' : '효과 강조 홍보 생성'}
          </button>
          <button
            className="generate-button"
            onClick={() => handleGenerate('generate-promo-storytelling')}
            disabled={loading}
          >
            {loading ? '스토리텔링 홍보 생성 중...' : '스토리텔링 홍보 생성'}
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
