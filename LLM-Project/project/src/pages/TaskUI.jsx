import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TaskUI.css';

const TaskUI = () => {
  const navigate = useNavigate();

  const tasks = [
    { id: 1, title: '홍보 문구 생성', description: '원하는 키워드를 입력하시면 최적의 홍보 문구를 제안해드립니다.', icon: '✍️' },
    { id: 2, title: '화장품 성분 비교', description: '제품명을 입력하시면 해당 제품의 성분 분석을 도와드립니다.', icon: '🧪' },
    { id: 3, title: '기획안 제작', description: '목표, 예산, 키워드를 입력하시면 제품 홍보를 위한 맞춤형 기획안을 제작해드립니다.', icon: '📝' },
    { id: 4, title: '부스/이벤트 기획', description: '행사 테마, 일정, 장소를 입력하시면 완벽한 부스 및 이벤트 기획안을 제안해드립니다.', icon: '🎪' },
  ];

  return (
    <div className="task-ui">
      <header className="task-ui-header">
        <h1>✨ LLM Task Management</h1>
        <p>AI를 활용한 뷰티 제품 홍보, 기획 및 관리 솔루션</p>
      </header>
      <div className="task-ui-container">
        {tasks.map((task) => (
          <div className="task-card" key={task.id} onClick={() => navigate(`/task/${task.id}`)}>
            <div className="task-icon">{task.icon}</div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskUI;
