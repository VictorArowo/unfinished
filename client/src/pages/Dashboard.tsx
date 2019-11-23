import React from 'react';

import styled from 'styled-components';

import Countdown from '../components/Countdown';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import TaskList from '../components/TaskList';
import CreateFormModal from '../components/CreateFormModal';

const Div = styled.div`
  background: #f5f7fa;
  .body {
    display: flex;
  }
  .left {
    width: 80vw;
  }
`;

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <Div>
      <Navbar />
      <div className="body">
        <TaskList />
        <div className="left">
          <Countdown />
          <CreateFormModal />
        </div>
        <Sidebar />
      </div>
    </Div>
  );
};

export default Dashboard;
