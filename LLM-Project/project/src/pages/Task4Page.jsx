import React, { useState } from 'react';
import axios from 'axios';
import '../css/Task1Page.css'; // 기존 스타일 유지

const Task4Page = () => {
  const [formData, setFormData] = useState({
    goal: '', // 목적
    targetAudience: '', // 타겟층
    spaceAndBudget: '', // 공간과 예산
    customerInterest: '', // 주요 고객 관심사
    theme: '', // 이벤트 주제
  });

  const [generatedPlan, setGeneratedPlan] = useState('');
  const [loadingIndoor, setLoadingIndoor] = useState(false); // 실내 기획 로딩 상태
  const [loadingOutdoor, setLoadingOutdoor] = useState(false); // 실외 기획 로딩 상태
  const [loadingTimetable, setLoadingTimetable] = useState(false); // 타임테이블 로딩 상태
  const [showTimetableButton, setShowTimetableButton] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerateIndoorPlan = async () => {
    setLoadingIndoor(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/task4/generate-indoor-event-plan', {
        ...formData,
        environment: '실내', // 환경 설정
      });
      setGeneratedPlan(response.data.eventPlan || '기획 생성 중 오류가 발생했습니다.');
      setShowTimetableButton(true);
    } catch (error) {
      console.error('Error generating indoor event plan:', error);
      setGeneratedPlan('기획 생성 중 오류가 발생했습니다.');
    } finally {
      setLoadingIndoor(false);
    }
  };

  const handleGenerateOutdoorPlan = async () => {
    setLoadingOutdoor(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/task4/generate-outdoor-event-plan', {
        ...formData,
        environment: '실외', // 환경 설정
      });
      setGeneratedPlan(response.data.eventPlan || '기획 생성 중 오류가 발생했습니다.');
      setShowTimetableButton(true);
    } catch (error) {
      console.error('Error generating outdoor event plan:', error);
      setGeneratedPlan('기획 생성 중 오류가 발생했습니다.');
    } finally {
      setLoadingOutdoor(false);
    }
  };

  const handleDownloadTimetable = async () => {
    setLoadingTimetable(true);
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/task4/download-timetable',
        formData,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'event_timetable.docx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading timetable:', error);
    } finally {
      setLoadingTimetable(false);
    }
  };

  const formFields = [
    { label: '목표', name: 'goal', placeholder: '이벤트의 목적을 입력하세요.' },
    { label: '타겟층', name: 'targetAudience', placeholder: '이벤트 대상을 입력하세요.' },
    { label: '공간과 예산', name: 'spaceAndBudget', placeholder: '예: 10평, 200만 원' },
    { label: '주요 고객 관심사', name: 'customerInterest', placeholder: '예: 친환경 제품, SNS 활동' },
    { label: '이벤트 주제', name: 'theme', placeholder: '예: 자연 친화적인 라이프스타일' },
  ];

  return (
    <div className="container">
      <div className="form-container">
        <h2>부스/이벤트 기획</h2>
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
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
          <button
            className="generate-button"
            onClick={handleGenerateIndoorPlan}
            disabled={loadingIndoor || loadingOutdoor}
          >
            {loadingIndoor ? '실내 기획 생성 중...' : '실내 기획 생성'}
          </button>
          <button
            className="generate-button"
            onClick={handleGenerateOutdoorPlan}
            disabled={loadingIndoor || loadingOutdoor}
          >
            {loadingOutdoor ? '실외 기획 생성 중...' : '실외 기획 생성'}
          </button>
        </div>
      </div>

      <div className="info-container">
      <h2>부스/이벤트 기획</h2>
        <div
          className="generated-info"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: generatedPlan ? 'auto' : '200px',
            border: '1px dashed #ccc', 
            borderRadius: '0', 
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            fontSize: '1.2em',
            fontFamily: 'Noto Sans KR',
          }}
        >
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              fontSize: '1em',
              textAlign: generatedPlan ? 'left' : 'center',
              fontFamily: 'Noto Sans KR',
            }}
          >
            {generatedPlan || '기획 생성 버튼을 눌러주세요!'}
          </pre>
        </div>
        {showTimetableButton && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
              className="generate-button"
              onClick={handleDownloadTimetable}
              disabled={loadingTimetable}
            >
              {loadingTimetable ? '타임 테이블 생성 중...' : '타임 테이블 다운로드'}
            </button>
          </div>
        )}
      </div>   
    </div>
  );
};

export default Task4Page;