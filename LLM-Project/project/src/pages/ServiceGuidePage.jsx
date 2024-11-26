import React from 'react';
import '../css/Guide.css'; // CSS 파일을 통해 스타일링 적용

const ServiceGuidePage = () => {
  return (
    <div className="service-guide-container">
      <header className="service-guide-header">
        <h1>서비스 이용 가이드</h1>
        <p>개인 및 기업의 맞춤형 이벤트 기획 및 홍보를 위한 가이드입니다.</p>
      </header>

      <div className="service-guide-section">
        <h2>홍보 문구 제작</h2>
        <h3>홍보 문구 제작이란?</h3>
        <p>원하는 키워드와 메시지를 입력하면 AI가 창의적이고 매력적인 홍보 문구를 자동으로 생성합니다.</p>

        <p>사용자 입력: 홍보 목표, 전략, 타겟층, 예산 등</p>
        <p>출력형식: 테이블 형식으로 자동 생성</p>
        
        <h3>서비스 이용 과정</h3>
        <ul>
          <li>홍보의 주제와 키워드를 입력합니다.</li>
          <li>AI가 제안한 문구 중 적합한 것을 선택하거나 수정합니다.</li>
          <li>생성된 문구를 다운로드하거나 공유하여 활용합니다.</li>
        </ul>
      </div>

      <div className="service-guide-section">
      <h2>화장품 성분 비교</h2>
        <h3>화장품 성분 비교란?</h3>
        <p>입력된 화장품의 성분 데이터를 분석하고 비교하여 더 나은 선택을 돕는 서비스입니다.</p>
        
        <h3>서비스 이용 과정</h3>
        <ul>
          <li>비교하려는 제품 이름 또는 성분을 입력합니다.</li>
          <li>AI가 성분의 특징, 장단점, 안전성을 분석합니다.</li>
          <li>비교 결과를 표 형태로 확인하거나 다운로드합니다.</li>
        </ul>
      </div>

      <div className="service-guide-section">
      <h2>기획안 제작</h2>
        <h3>기획안 제작이란?</h3>
        <p>사용자의 목표, 예산, 키워드를 바탕으로 맞춤형 홍보 및 행사 기획안을 생성합니다.</p>

        <p>사용자 입력: 홍보 목표, 전략, 타겟층, 예산 등</p>
        <p>출력형식: 테이블 형식으로 자동 생성</p>
        <p>문서 공유 및 다운로드 기능 지원</p>

        <h3>서비스 이용 과정</h3>
        <ul>
          <li>목표, 타겟층, 예산 등 기본 정보를 입력합니다.</li>
          <li>AI가 전략, 슬로건, 일정 등을 포함한 기획안을 생성합니다.</li>
          <li>기획안을 다운로드하거나 팀과 공유합니다.</li>
        </ul>
      </div>

      <div className="service-guide-section">
      <h2>부스/이벤트 기획</h2>
        <h3>부스/이벤트 기획이란?</h3>
        <p>행사에 필요한 컨셉, 장소, 일정을 AI가 맞춤으로 기획해 드립니다.</p>
        
        <p>사용자 입력: 키워드 및 내용을 입력하면, 부스 컨셉, 일정, 장소 등 정보를 자동으로 생성합니다.</p>
        <p>출력형식: </p>
        <p>문서 공유 및 다운로드 기능 지원</p>

        <h3>서비스 이용 과정</h3>
        <ul>
          <li>이벤트의 목적과 요구사항을 입력합니다.</li>
          <li>AI가 추천하는 테마와 일정을 확인합니다.</li>
          <li>최종 기획안을 검토 후 다운로드하거나 공유합니다.</li>
        </ul>
      </div>

      <div className="service-guide-section">
      <h2>뷰티 챗봇 서비스</h2>
        <h3>뷰티 챗봇이란?</h3>
        <p>뷰티 관련 질문에 실시간 답변을 제공하고 맞춤형 정보를 추천하는 챗봇 서비스입니다.</p>
      
        <h3>서비스 이용 과정</h3>
        <ul>
          <li>챗봇 대화창에서 원하는 질문을 입력합니다.</li>
          <li>AI가 질문에 대한 답변이나 제품 추천 정보를 제공합니다.</li>
          <li>대화 내용을 저장하거나 필요한 정보를 공유합니다.</li>
        </ul>
      </div>

      <footer className="service-guide-footer">
        <p>이 가이드는 BeautySync. 서비스를 보다 효율적으로 활용하도록 돕기 위해 작성되었습니다.</p>
        <p>추가 질문이 있으시면 언제든지 문의해 주세요! 😊</p>
      </footer>
    </div>
  );
};

export default ServiceGuidePage;
