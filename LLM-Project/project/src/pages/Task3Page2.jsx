// import React, { useState } from 'react';
// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import { Document, Packer, Paragraph, TextRun } from 'docx';
// import '../css/TaskPage.css';

// const Task3Page = () => {
//   const [formData, setFormData] = useState({
//     goal: '', // 목표
//     strategy: '', // 전략
//     targetAudience: '', // 타겟층
//     budget: '', // 예산
//   });

//   const [generatedInfo, setGeneratedInfo] = useState('');
//   const [loading, setLoading] = useState(false);

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
//               role: 'user',
//               content: `
//               홍보 기획안 작성:
//                   - 목표: ${formData.goal}
//                   - 전략: ${formData.strategy}
//                   - 타겟층: ${formData.targetAudience}
//                   - 예산: ${formData.budget}

//                   이 정보를 바탕으로 제품 홍보를 위한 기획안을 작성해줘.
//               `,
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

//   return (
//     <div className="task-container">
//       <div className="form-container">
//         <div className="form-group">
//           <label>목표</label>
//           <input
//             type="text"
//             name="goal"
//             value={formData.goal}
//             onChange={handleChange}
//             placeholder="목표를 입력하세요"
//           />
//         </div>
//         <div className="form-group">
//           <label>전략</label>
//           <input
//             type="text"
//             name="strategy"
//             value={formData.strategy}
//             onChange={handleChange}
//             placeholder="전략을 입력하세요"
//           />
//         </div>
//         <div className="form-group">
//           <label>타겟 대상</label>
//           <input
//             type="text"
//             name="targetAudience"
//             value={formData.targetAudience}
//             onChange={handleChange}
//             placeholder="타겟층을 입력하세요"
//           />
//         </div>
//         <div className="form-group">
//           <label>예산</label>
//           <input
//             type="text"
//             name="budget"
//             value={formData.budget}
//             onChange={handleChange}
//             placeholder="예산을 입력하세요"
//           />
//         </div>
//         <button className="generate-button" onClick={handleGenerate} disabled={loading}>
//           {loading ? '생성 중...' : '자동 생성'}
//         </button>
//       </div>
//       <div className="info-container">
//         <h2>생성된 기획안</h2>
//         <div className="generated-info">{generatedInfo || '자동 생성 버튼을 눌러주세요!'}</div>
//         <button className="download-button" onClick={handleDownload} disabled={!generatedInfo}>
//           파일 다운로드
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Task3Page;


import React, { useState } from 'react';
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun } from 'docx';  // docx 라이브러리 추가

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

  // OpenAI API 호출 함수
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'gpt-3.5-turbo',
        prompt: `당신은 기초 화장품 브랜드 홍보 기획안 작성 전문가입니다. 아래 정보를 바탕으로 체계적이고 구체적인 기초 화장품 브랜드 홍보 기획안을 작성해주세요.
        \nGoal: ${formData.goal}\nTarget Audience: ${formData.targetAudience}\nStrategy: ${formData.strategy}\nBudget: ${formData.budget}`,
        max_tokens: 1200,
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // OpenAI API 키
        },
      });
      setGeneratedInfo(response.data.choices[0].text);
    } catch (error) {
      console.error('Error generating text:', error);
      setGeneratedInfo('문구 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Word 파일 다운로드 함수
  const handleDownload = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('기초 화장품 홍보 기획안'),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun('목표: ' + formData.goal),
                new TextRun('\n타겟층: ' + formData.targetAudience),
                new TextRun('\n전략: ' + formData.strategy),
                new TextRun('\n예산: ' + formData.budget),
                new TextRun('\n\n' + generatedInfo),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'event_plan.docx';
      link.click();
    });
  };

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
        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={loading}
          style={{ marginRight: '1rem' }} 
        >
          {loading ? '생성 중...' : '자동 생성'}
        </button>
        
      </div>
      <div className="info-container">
        <h2>생성된 기획안</h2>
        <div className="generated-info">
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: '#000', fontSize: '1.2em', textAlign: 'left' }}>
            {generatedInfo || '자동 생성 버튼을 눌러주세요!'}
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
