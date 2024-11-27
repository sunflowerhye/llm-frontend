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
        <h2>Beauty Sync의 Task UI</h2>
        <p>Beauty Sync가 제공하는 Task는 홍보 문구 생성, 화장품 성분 비교, 기획안 제작, 
        부스 및 이벤트 기획까지 다양한 서비스를 쉽고 빠르게 제공합니다. </p>
        <div className="task-cards">
            <div className="task-card">
                <h3>홍보 문구 생성</h3>
                <p>브랜드를 돋보이게 하는 매력적인 광고 문구를 제작하세요.</p>
            </div>
            <div className="task-card">
                <h3>화장품 성분 비교</h3>
                <p>제품 성분을 쉽고 빠르게 비교하여 최적의 선택을 돕습니다.</p>
            </div>
            <div className="task-card">
                <h3>기획안 제작</h3>
                <p>체계적이고 창의적인 기획안을 손쉽게 완성하세요.</p>
            </div>
            <div className="task-card">
                <h3>부스/이벤트 기획</h3>
                <p>성공적인 행사를 위한 맞춤형 솔루션을 제공합니다.</p>
            </div>
        </div>
      </div>

      <div className="service-guide-section">
      <h2>홍보 문구 제작</h2>
      <h3>홍보 문구 제작이란?</h3>
      <p>
        AI를 활용한 홍보 문구 제작 서비스는 감성적, 효과 강조, 유머러스, 맞춤형 등 다양한 스타일의 
        광고 문구를 자동으로 생성해주는 혁신적인 도구입니다. 
        입력한 제품 정보와 키워드를 바탕으로 창의적이고 매력적인 문구를 손쉽게 완성할 수 있습니다.
      </p>

      <h3>사용자 입력 및 출력 형식</h3>
      <p>
        <strong>사용자 입력:</strong> 회사명, 제품명, 제품 설명, 홍보 키워드, 타겟층, 추가 파일 내용<br />
        <strong>출력 형식:</strong> 명료하고 간결한 문구를 리스트 또는 테이블 형식으로 제공
      </p>

      <h3>서비스 이용 과정</h3>
      <ol>
        <li><strong>정보 입력:</strong> 회사명, 제품명, 키워드, 타겟층 등 홍보에 필요한 정보를 입력합니다.</li>
        <li><strong>스타일 선택:</strong> 감성적, 효과 강조, 유머러스, 맞춤형 중 원하는 스타일을 선택합니다.</li>
        <li><strong>AI 문구 생성:</strong> AI가 입력된 정보를 분석하여 최적의 홍보 문구를 생성합니다.</li>
        <li><strong>결과 확인 및 수정:</strong> 생성된 문구를 검토하고 필요에 따라 수정하거나 보완합니다.</li>
        <li><strong>활용:</strong> 문구를 다운로드하거나 프로젝트에 바로 적용합니다.</li>
      </ol>

      <h3>주요 기능 및 특징</h3>
      <ul>
        <li><strong>다양성:</strong> 감성적, 실용적, 유머러스한 등 다양한 스타일의 문구 지원</li>
        <li><strong>효율성:</strong> 빠른 문구 생성으로 시간 절약</li>
        <li><strong>맞춤화:</strong> 타겟층과 키워드에 최적화된 문구 제작</li>
        <li><strong>활용성:</strong> 소셜 미디어, 광고, 마케팅 캠페인 등 다양한 채널에서 활용 가능</li>
      </ul>
      </div>

      <div className="service-guide-section">
        <h2>화장품 성분 비교</h2>
        <h3>화장품 성분 비교란?</h3>
        <p>
          제품에 포함된 성분을 체계적으로 분석하고, 두 제품 간의 성분 차이와 공통점을 비교하여 
          소비자가 더 나은 선택을 할 수 있도록 돕는 서비스입니다.
        </p>

        <h3>사용자 입력</h3>
        <p>
          <strong>입력 항목:</strong> 비교할 제품 이름 또는 성분 리스트 파일<br />
          <strong>출력 형식:</strong> 두 제품의 성분 분석 결과를 표 형식으로 제공, 공통 성분과 고유 성분을 한눈에 확인할 수 있습니다.
        </p>

        <h3>주요 기능 및 특징</h3>
        <ul>
          <li><strong>성분 분석:</strong> 제품에 포함된 모든 성분의 특징과 효능, 안전성을 파악.</li>
          <li><strong>비교 결과 제공:</strong> 공통 성분과 고유 성분을 한눈에 확인 가능한 표 형식 출력.</li>
          <li><strong>안전성 평가:</strong> 성분별 피부 적합성 및 잠재적 부작용 평가.</li>
          <li><strong>결과 저장 및 공유:</strong> 분석 결과를 다운로드하거나 공유 가능.</li>
        </ul>

        <h3>서비스 이용 과정</h3>
        <ol>
          <li>비교를 원하는 제품 이름 또는 성분 리스트 입력.</li>
          <li>AI가 입력된 데이터를 기반으로 성분 효능, 장단점, 안전성을 분석.</li>
          <li>비교 결과를 표 형태로 확인 및 다운로드.</li>
        </ol>
      </div>

      <div className="service-guide-section">
      <h2>기획안 제작</h2>
      <h3>기획안 제작이란?</h3>
      <p>
        홍보 목표, 예산, 타겟층을 기반으로 체계적이고 전문적인 마케팅 및 행사 기획안을 
        자동 생성하는 서비스입니다.
      </p>

      <h3>사용자 입력</h3>
      <p>
        <strong>입력 항목:</strong> 목표, 타겟층, 예산, 홍보 전략, 행사 일정 등 기획에 필요한 정보 입력<br />
        <strong>출력 형식:</strong> 최적화된 기획안이 표와 텍스트 형식으로 제공됩니다.
      </p>

      <h3>주요 기능 및 특징</h3>
      <ul>
        <li><strong>맞춤형 기획안 생성:</strong> 사용자가 입력한 목표와 예산을 바탕으로 최적화된 전략 제안.</li>
        <li><strong>상세 계획 작성:</strong> 홍보 전략, 일정, 예산 배분 등 기획 전반 포함.</li>
        <li><strong>문서화 지원:</strong> 결과물을 표와 텍스트로 정리하여 다운로드 가능한 문서로 제공.</li>
      </ul>

      <h3>서비스 이용 과정</h3>
      <ol>
        <li>목표, 타겟층, 예산 등 기본 정보 입력.</li>
        <li>AI가 입력 데이터를 기반으로 전략, 홍보 계획 포함된 기획안 생성.</li>
        <li>생성된 기획안을 검토 후 다운로드하거나 팀과 공유.</li>
      </ol>
      </div>

      <div className="service-guide-section">
        <h2>부스/이벤트 기획</h2>
        <h3>부스/이벤트 기획이란?</h3>
        <p>
          행사 목적과 키워드에 따라 부스 디자인, 행사 컨셉, 일정, 장소 등을 AI가 맞춤 설계하여 
          제안하는 서비스입니다.
        </p>

        <h3>사용자 입력</h3>
        <p>
          <strong>입력 항목:</strong> 행사 목적, 주요 요구사항, 키워드 등 입력<br />
          <strong>출력 형식:</strong> 최적화된 테마, 일정, 운영 전략을 표 형식으로 제공.
        </p>

        <h3>주요 기능 및 특징</h3>
        <ul>
          <li><strong>맞춤 컨셉 기획:</strong> 행사 목표와 타겟층에 맞춘 독창적이고 실현 가능한 컨셉 제안.</li>
          <li><strong>일정 및 운영 계획:</strong> 행사 진행 일정, 예산, 장소 추천 및 운영 전략 포함.</li>
          <li><strong>문서화 및 공유:</strong> 최종 기획안을 표 형식으로 구성, 저장 및 다운로드 지원.</li>
        </ul>

        <h3>서비스 이용 과정</h3>
        <ol>
          <li>행사 목적, 주요 요구사항, 키워드 입력.</li>
          <li>AI가 최적화된 테마, 일정, 운영 전략 제안.</li>
          <li>최종 기획안을 다운로드하거나 팀과 공유.</li>
        </ol>
      </div>

      <div className="service-guide-section">
      <h2>뷰티 챗봇 서비스</h2>
      <h3>뷰티 챗봇이란?</h3>
      <p>
        뷰티 관련 모든 질문에 실시간으로 전문적이고 신뢰성 있는 답변을 제공하며, 
        제품 추천 및 정보를 안내하는 AI 챗봇 서비스입니다.
      </p>

      <h3>주요 기능 및 특징</h3>
      <ul>
        <li><strong>실시간 답변:</strong> 뷰티 트렌드, 성분 정보, 피부 고민 해결 등 다양한 질문에 신속한 응답.</li>
        <li><strong>제품 추천:</strong> 사용자의 피부 타입, 선호도에 맞는 제품을 맞춤 추천.</li>
        <li><strong>데이터 저장 및 공유:</strong> 대화 기록을 저장하거나 필요한 정보를 쉽게 공유 가능.</li>
      </ul>

      <h3>서비스 이용 과정</h3>
      <ol>
        <li>챗봇 창에서 궁금한 내용을 질문.</li>
        <li>AI가 질문에 대해 답변하거나 적합한 제품 정보를 추천.</li>
        <li>유용한 정보를 저장하거나 다른 사용자와 공유.</li>
      </ol>
    </div>


      <footer className="service-guide-footer">
        <p>이 가이드는 BeautySync. 서비스를 보다 효율적으로 활용하도록 돕기 위해 작성되었습니다.</p>
        <p>추가 질문이 있으시면 언제든지 문의해 주세요! 😊</p>
      </footer>
    </div>
  );
};

export default ServiceGuidePage;
