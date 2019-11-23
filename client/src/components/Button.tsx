import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  width: 200px;
  height: 60px;
  border-radius: 50px;
  background-color: #364456;
  color: white;
  font-size: 30px;
  margin-top: 50px;
`;

interface Props {
  handleClick: () => void;
}

const Button: React.FC<Props> = ({ handleClick }) => {
  return <StyledButton onClick={() => handleClick()}>Add Task</StyledButton>;
};

export default Button;
