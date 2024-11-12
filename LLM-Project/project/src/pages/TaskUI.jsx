import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskUI.css';

const TaskUI = () => {
  const navigate = useNavigate();

  const tasks = [
    { id: 1, title: '홍보 문구 생성', description: '원하시는 홍보 문구 생성을 입력하시면 완성된 홍보 문구를 생성해드립니다.' },
    { id: 2, title: '홍보용 배너 제작', description: '원하시는 정보를 입력해주시면 배너를 생성해드립니다.' },
    { id: 3, title: '기획안 제작', description: '제품 홍보를 위한 기획안을 제작해드립니다.' },
    { id: 4, title: '부스/이벤트 기획', description: '~ ' },
  ];

  return (
    <div className="task-ui">
      <header className="task-ui-header">
        <h1>LLM Task UI</h1>
        <p>회사 업무에 다양한 생산성을 높일 수 있는 AI를 활용하세요.</p>
      </header>
      <div className="task-ui-container">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}
          onClick={() => navigate(`/task/${task.id}`)}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskUI;
