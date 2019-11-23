import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  font-size: 25px;
  border-bottom: 1px solid #364456;
  cursor: pointer;
  transition: transform 0.5s;
  width: 65%;
  margin: auto;

  &:hover {
    transform: scale(1.1);
  }
`;

interface Props {
  task: {
    _id: Number;
    title: String;
    created_date: Date;
    priority: String;
  };
}

const Task: React.FC<Props> = ({
  task: { _id, title, priority, created_date }
}) => {
  return (
    <Div>
      <i
        className="fas fa-exclamation-circle"
        style={{ color: priority === 'high' ? 'red' : 'green' }}
      ></i>
      <div>{title}</div>
    </Div>
  );
};

export default Task;
