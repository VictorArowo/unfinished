import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getTasks } from '../state/actions/taskActions';
import Task from './Task';

export const Div = styled.div`
  height: 90vh;
  width: 40vw;
  margin: 10px;
  border-radius: 10px;
  background-color: white;
`;
interface Task {
  _id: Number;
  title: String;
  created_date: Date;
  priority: String;
}

interface Props {
  getTasks?: () => void;
  tasks: {
    tasks: Array<Task>;
  };
}

const TaskList: React.FC<Props> = ({ getTasks, tasks: { tasks } }) => {
  useEffect(() => {
    getTasks && getTasks();
  }, []);
  return (
    <Div>
      <h1>List of Tasks</h1>
      {tasks.map(task => (
        <Task task={task} />
      ))}
    </Div>
  );
};

const mapStateToProps = (state: { user: any; task: any }) => ({
  user: state.user,
  tasks: state.task
});

const mapActionsToProps = {
  getTasks
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TaskList);
